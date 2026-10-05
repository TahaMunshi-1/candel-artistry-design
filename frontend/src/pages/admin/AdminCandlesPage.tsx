import { useState } from "react";
import { useCatalog } from "../../catalog/CatalogContext";
import { DEFAULT_CANDLE_PRICE, type ProductStatus } from "../../constants/catalog";
import { Field, IMAGE_OPTIONS, ImagePicker, inputClass, selectClass } from "./adminUi";

export default function AdminCandlesPage() {
  const {
    collections,
    updateCandleProduct,
    addCandleProduct,
    removeCandleProduct,
  } = useCatalog();
  const [openId, setOpenId] = useState<string | null>(collections[0]?.id ?? null);
  const [addingFor, setAddingFor] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    name: "",
    nomenclature: "",
    status: "coming_soon" as ProductStatus,
    price: DEFAULT_CANDLE_PRICE,
    image: IMAGE_OPTIONS[0].value,
  });

  return (
    <div>
      <header className="max-w-2xl">
        <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink">Candles</h2>
        <p className="mt-3 font-serif text-taupe">
          Edit fragrances by collection. Toggle Coming Soon vs available, price, and scent
          nomenclature.
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {collections.map((collection) => {
          const open = openId === collection.id;
          return (
            <section
              key={collection.id}
              className="overflow-hidden rounded-3xl border border-gold/35 bg-ivory"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-champagne/50 md:px-5"
                onClick={() => setOpenId(open ? null : collection.id)}
              >
                <div>
                  <h3 className="font-serif text-lg tracking-[0.08em] uppercase text-ink">
                    {collection.title}
                  </h3>
                  <p className="font-serif text-sm text-taupe">
                    {collection.products.length} products
                  </p>
                </div>
                <span className="font-serif text-taupe" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>

              {open ? (
                <div className="border-t border-gold/25 px-4 py-5 md:px-5">
                  <div className="space-y-6">
                    {collection.products.map((product) => (
                      <article
                        key={product.id}
                        className="grid gap-4 rounded-2xl border border-gold/25 bg-cream/60 p-4 md:grid-cols-[120px_1fr]"
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="aspect-[3/4] w-full rounded-2xl object-cover bg-champagne"
                        />
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field label="Name">
                            <input
                              className={inputClass}
                              value={product.name}
                              onChange={(e) =>
                                updateCandleProduct(collection.id, product.id, {
                                  name: e.target.value,
                                })
                              }
                            />
                          </Field>
                          <Field label="Status">
                            <select
                              className={selectClass}
                              value={product.status}
                              onChange={(e) =>
                                updateCandleProduct(collection.id, product.id, {
                                  status: e.target.value as ProductStatus,
                                })
                              }
                            >
                              <option value="available">Available (price + cart)</option>
                              <option value="coming_soon">Coming Soon</option>
                            </select>
                          </Field>
                          <Field label="Scent nomenclature">
                            <input
                              className={inputClass}
                              value={product.nomenclature}
                              onChange={(e) =>
                                updateCandleProduct(collection.id, product.id, {
                                  nomenclature: e.target.value,
                                })
                              }
                              placeholder="Note • Note • Note"
                            />
                          </Field>
                          <Field label="Price (USD)">
                            <input
                              type="number"
                              min={0}
                              step={0.01}
                              className={inputClass}
                              value={product.price ?? ""}
                              disabled={product.status !== "available"}
                              onChange={(e) =>
                                updateCandleProduct(collection.id, product.id, {
                                  price: Number(e.target.value) || 0,
                                })
                              }
                            />
                          </Field>
                          <ImagePicker
                            value={product.image}
                            onChange={(image) =>
                              updateCandleProduct(collection.id, product.id, { image })
                            }
                          />
                          <div className="flex items-end sm:col-span-2">
                            <button
                              type="button"
                              className="font-serif text-[0.72rem] tracking-[0.16em] uppercase text-royal hover:underline"
                              onClick={() => {
                                if (confirm(`Remove ${product.name}?`)) {
                                  removeCandleProduct(collection.id, product.id);
                                }
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {addingFor === collection.id ? (
                    <div className="mt-6 rounded-2xl border border-dashed border-gold/50 bg-champagne/40 p-4">
                      <p className="font-serif text-sm tracking-[0.08em] uppercase text-ink">
                        New fragrance
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Field label="Name">
                          <input
                            className={inputClass}
                            value={draft.name}
                            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                          />
                        </Field>
                        <Field label="Status">
                          <select
                            className={selectClass}
                            value={draft.status}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                status: e.target.value as ProductStatus,
                              }))
                            }
                          >
                            <option value="available">Available</option>
                            <option value="coming_soon">Coming Soon</option>
                          </select>
                        </Field>
                        <Field label="Nomenclature">
                          <input
                            className={inputClass}
                            value={draft.nomenclature}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, nomenclature: e.target.value }))
                            }
                          />
                        </Field>
                        <Field label="Price">
                          <input
                            type="number"
                            className={inputClass}
                            value={draft.price}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                price: Number(e.target.value) || 0,
                              }))
                            }
                          />
                        </Field>
                        <ImagePicker
                          value={draft.image}
                          onChange={(image) => setDraft((d) => ({ ...d, image }))}
                        />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          className="rounded-full bg-gold px-4 py-2 font-serif text-[0.68rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy"
                          onClick={() => {
                            if (!draft.name.trim()) return;
                            addCandleProduct(collection.id, {
                              name: draft.name.trim(),
                              nomenclature: draft.nomenclature.trim() || "—",
                              status: draft.status,
                              price: draft.price,
                              image: draft.image,
                              alt: `${draft.name.trim()} candle jar`,
                            });
                            setDraft({
                              name: "",
                              nomenclature: "",
                              status: "coming_soon",
                              price: DEFAULT_CANDLE_PRICE,
                              image: IMAGE_OPTIONS[0].value,
                            });
                            setAddingFor(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="font-serif text-[0.72rem] tracking-[0.16em] uppercase text-taupe"
                          onClick={() => setAddingFor(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="mt-5 font-serif text-[0.72rem] tracking-[0.2em] uppercase text-burgundy hover:underline"
                      onClick={() => setAddingFor(collection.id)}
                    >
                      + Add fragrance
                    </button>
                  )}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
