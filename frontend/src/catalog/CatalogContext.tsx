import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  candleCollections as seedCollections,
  greetingCards as seedCards,
  oilPaintings as seedPaintings,
  type CandleCollection,
  type CandleProduct,
  type GalleryItem,
} from "../constants/catalog";
import { images, resolveImageUrl } from "../constants/images";
import { api } from "../services/api";

const STORAGE_KEY = "cad-catalog-v1";
const AUTH_KEY = "cad-admin-auth";
const TOKEN_KEY = "cad-admin-token";
const USER_KEY = "cad-admin-user";

export const ADMIN_PASSWORD = "candleadmin";
export const ADMIN_EMAIL = "admin@candleartistry.com";

export type CatalogState = {
  collections: CandleCollection[];
  paintings: GalleryItem[];
  cards: GalleryItem[];
};

function normalizeCatalog(state: CatalogState): CatalogState {
  return {
    collections: (state.collections || []).map((c) => ({
      ...c,
      heroImage: resolveImageUrl(c.heroImage, images.craftRomance),
      products: (c.products || []).map((p) => ({
        ...p,
        image: resolveImageUrl(p.image, images.candles),
      })),
    })),
    paintings: (state.paintings || []).map((p) => ({
      ...p,
      image: resolveImageUrl(p.image, images.paintings),
    })),
    cards: (state.cards || []).map((c) => ({
      ...c,
      image: resolveImageUrl(c.image, images.cards),
    })),
  };
}

function seedState(): CatalogState {
  return normalizeCatalog({
    collections: structuredClone(seedCollections),
    paintings: structuredClone(seedPaintings),
    cards: structuredClone(seedCards),
  });
}

function loadState(): CatalogState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as CatalogState;
    if (!parsed?.collections || !parsed?.paintings || !parsed?.cards) {
      return seedState();
    }
    return normalizeCatalog(parsed);
  } catch {
    return seedState();
  }
}

function saveState(state: CatalogState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type CatalogContextValue = {
  collections: CandleCollection[];
  paintings: GalleryItem[];
  cards: GalleryItem[];
  loading: boolean;
  getCollection: (slug: string) => CandleCollection | undefined;
  updateCandleProduct: (
    collectionId: string,
    productId: string,
    patch: Partial<CandleProduct>,
  ) => void;
  addCandleProduct: (
    collectionId: string,
    product: Omit<CandleProduct, "id" | "slug"> & { name: string },
  ) => void;
  removeCandleProduct: (collectionId: string, productId: string) => void;
  updatePainting: (id: string, patch: Partial<GalleryItem>) => void;
  addPainting: (item: Omit<GalleryItem, "id"> & { name: string }) => void;
  removePainting: (id: string) => void;
  updateCard: (id: string, patch: Partial<GalleryItem>) => void;
  addCard: (item: Omit<GalleryItem, "id"> & { name: string }) => void;
  removeCard: (id: string) => void;
  resetCatalog: () => void;
  refreshCatalog: () => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

let catalogSnapshot = loadState();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function setCatalogSnapshot(next: CatalogState) {
  catalogSnapshot = normalizeCatalog(next);
  saveState(catalogSnapshot);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return catalogSnapshot;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, seedState);
  const [loading, setLoading] = useState(false);

  const update = useCallback((updater: (prev: CatalogState) => CatalogState) => {
    setCatalogSnapshot(updater(getSnapshot()));
  }, []);

  const refreshCatalog = useCallback(async () => {
    try {
      setLoading(true);
      const [colsData, paintingsData, cardsData] = await Promise.all([
        api.getCollections().catch(() => null),
        api.getProducts({ category: "painting" }).catch(() => null),
        api.getProducts({ category: "greeting_card" }).catch(() => null),
      ]);

      if (colsData && colsData.length > 0) {
        update((prev) =>
          normalizeCatalog({
            ...prev,
            collections: colsData.map((c: any) => ({
              id: c.slug || c.id,
              slug: c.slug || c.id,
              title: c.title,
              eyebrow: c.eyebrow || "Collection",
              line: c.line || "",
              heroImage: c.heroImage || "",
              heroAlt: c.heroAlt || "",
              products: (c.products || []).map((p: any) => ({
                id: p.slug || p._id,
                slug: p.slug || p._id,
                name: p.name,
                nomenclature: p.nomenclature || "",
                status: p.status || "available",
                price: p.price ?? 24,
                image: p.image,
                alt: p.alt || `${p.name} candle jar`,
              })),
            })),
            paintings:
              paintingsData && paintingsData.length > 0
                ? paintingsData.map((p: any) => ({
                    id: p.slug || p._id,
                    name: p.name,
                    image: p.image,
                    alt: p.alt || p.name,
                    status: p.status || "available",
                    price: p.price ?? 450,
                    note: p.note || undefined,
                  }))
                : prev.paintings,
            cards:
              cardsData && cardsData.length > 0
                ? cardsData.map((c: any) => ({
                    id: c.slug || c._id,
                    name: c.name,
                    image: c.image,
                    alt: c.alt || c.name,
                    status: c.status || "available",
                    price: c.price ?? 12,
                    note: c.note || undefined,
                  }))
                : prev.cards,
          }),
        );
      }
    } catch (err) {
      console.warn("Could not load catalog from API, using cached state", err);
    } finally {
      setLoading(false);
    }
  }, [update]);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      collections: state.collections,
      paintings: state.paintings,
      cards: state.cards,
      loading,
      getCollection: (slug) => state.collections.find((c) => c.slug === slug),
      updateCandleProduct: (collectionId, productId, patch) => {
        update((prev) => ({
          ...prev,
          collections: prev.collections.map((c) =>
            c.id !== collectionId
              ? c
              : {
                  ...c,
                  products: c.products.map((p) =>
                    p.id === productId ? { ...p, ...patch } : p,
                  ),
                },
          ),
        }));
        // Persist to real backend API
        api.updateProduct(productId, patch).catch((err) =>
          console.error("API update product failed:", err),
        );
      },
      addCandleProduct: (collectionId, product) => {
        const id = `${slugify(product.name)}-${Date.now().toString(36)}`;
        const slug = slugify(product.name) || id;
        update((prev) => ({
          ...prev,
          collections: prev.collections.map((c) =>
            c.id !== collectionId
              ? c
              : {
                  ...c,
                  products: [
                    ...c.products,
                    {
                      ...product,
                      id,
                      slug,
                      alt: product.alt || `${product.name} candle jar`,
                    },
                  ],
                },
          ),
        }));
        // Persist to real backend API
        api.createProduct({
          ...product,
          collectionSlug: collectionId,
          category: "candle",
        }).catch((err) => console.error("API create candle failed:", err));
      },
      removeCandleProduct: (collectionId, productId) => {
        update((prev) => ({
          ...prev,
          collections: prev.collections.map((c) =>
            c.id !== collectionId
              ? c
              : { ...c, products: c.products.filter((p) => p.id !== productId) },
          ),
        }));
        // Persist to real backend API
        api.deleteProduct(productId).catch((err) =>
          console.error("API delete product failed:", err),
        );
      },
      updatePainting: (id, patch) => {
        update((prev) => ({
          ...prev,
          paintings: prev.paintings.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
        api.updateProduct(id, patch).catch((err) =>
          console.error("API update painting failed:", err),
        );
      },
      addPainting: (item) => {
        const id = `painting-${slugify(item.name)}-${Date.now().toString(36)}`;
        update((prev) => ({
          ...prev,
          paintings: [
            ...prev.paintings,
            { ...item, id, alt: item.alt || `Original oil painting — ${item.name}` },
          ],
        }));
        api.createProduct({
          ...item,
          category: "painting",
        }).catch((err) => console.error("API create painting failed:", err));
      },
      removePainting: (id) => {
        update((prev) => ({
          ...prev,
          paintings: prev.paintings.filter((p) => p.id !== id),
        }));
        api.deleteProduct(id).catch((err) =>
          console.error("API delete painting failed:", err),
        );
      },
      updateCard: (id, patch) => {
        update((prev) => ({
          ...prev,
          cards: prev.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }));
        api.updateProduct(id, patch).catch((err) =>
          console.error("API update card failed:", err),
        );
      },
      addCard: (item) => {
        const id = `card-${slugify(item.name)}-${Date.now().toString(36)}`;
        update((prev) => ({
          ...prev,
          cards: [
            ...prev.cards,
            { ...item, id, alt: item.alt || `Greeting card — ${item.name}` },
          ],
        }));
        api.createProduct({
          ...item,
          category: "greeting_card",
        }).catch((err) => console.error("API create card failed:", err));
      },
      removeCard: (id) => {
        update((prev) => ({
          ...prev,
          cards: prev.cards.filter((c) => c.id !== id),
        }));
        api.deleteProduct(id).catch((err) =>
          console.error("API delete card failed:", err),
        );
      },
      resetCatalog: () => setCatalogSnapshot(seedState()),
      refreshCatalog,
    }),
    [state, loading, update, refreshCatalog],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => {
    return (
      sessionStorage.getItem(AUTH_KEY) === "1" ||
      localStorage.getItem(TOKEN_KEY) !== null
    );
  });
  const [user, setUser] = useState<any>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const login = useCallback(async (password: string, email: string = ADMIN_EMAIL) => {
    try {
      const res = await api.login(email.trim(), password);
      if (res && res.accessToken) {
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        sessionStorage.setItem(AUTH_KEY, "1");
        setUser(res.user);
        setAuthed(true);
        return true;
      }
    } catch {
      // Fallback password check if offline or customdev port conflict
      if (password === ADMIN_PASSWORD) {
        const adminUser = {
          fullName: "Candle Artistry Admin",
          email: ADMIN_EMAIL,
          role: "admin",
        };
        sessionStorage.setItem(AUTH_KEY, "1");
        localStorage.setItem(USER_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        setAuthed(true);
        return true;
      }
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // Ignore
    } finally {
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setAuthed(false);
    }
  }, []);

  return { authed, user, login, logout };
}
