import {
  createContext,
  useCallback,
  useContext,
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

const STORAGE_KEY = "cad-catalog-v1";
const AUTH_KEY = "cad-admin-auth";

/** Simple frontend gate — not real security */
export const ADMIN_PASSWORD = "candleadmin";

export type CatalogState = {
  collections: CandleCollection[];
  paintings: GalleryItem[];
  cards: GalleryItem[];
};

function seedState(): CatalogState {
  return {
    collections: structuredClone(seedCollections),
    paintings: structuredClone(seedPaintings),
    cards: structuredClone(seedCards),
  };
}

function loadState(): CatalogState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as CatalogState;
    if (!parsed?.collections || !parsed?.paintings || !parsed?.cards) {
      return seedState();
    }
    return parsed;
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
  getCollection: (slug: string) => CandleCollection | undefined;
  updateCandleProduct: (
    collectionId: string,
    productId: string,
    patch: Partial<CandleProduct>,
  ) => void;
  addCandleProduct: (collectionId: string, product: Omit<CandleProduct, "id" | "slug"> & { name: string }) => void;
  removeCandleProduct: (collectionId: string, productId: string) => void;
  updatePainting: (id: string, patch: Partial<GalleryItem>) => void;
  addPainting: (item: Omit<GalleryItem, "id"> & { name: string }) => void;
  removePainting: (id: string) => void;
  updateCard: (id: string, patch: Partial<GalleryItem>) => void;
  addCard: (item: Omit<GalleryItem, "id"> & { name: string }) => void;
  removeCard: (id: string) => void;
  resetCatalog: () => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

let catalogSnapshot = loadState();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function setCatalogSnapshot(next: CatalogState) {
  catalogSnapshot = next;
  saveState(next);
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

  const update = useCallback((updater: (prev: CatalogState) => CatalogState) => {
    setCatalogSnapshot(updater(getSnapshot()));
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      collections: state.collections,
      paintings: state.paintings,
      cards: state.cards,
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
      },
      updatePainting: (id, patch) => {
        update((prev) => ({
          ...prev,
          paintings: prev.paintings.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        }));
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
      },
      removePainting: (id) => {
        update((prev) => ({
          ...prev,
          paintings: prev.paintings.filter((p) => p.id !== id),
        }));
      },
      updateCard: (id, patch) => {
        update((prev) => ({
          ...prev,
          cards: prev.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }));
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
      },
      removeCard: (id) => {
        update((prev) => ({
          ...prev,
          cards: prev.cards.filter((c) => c.id !== id),
        }));
      },
      resetCatalog: () => setCatalogSnapshot(seedState()),
    }),
    [state, update],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1",
  );

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}
