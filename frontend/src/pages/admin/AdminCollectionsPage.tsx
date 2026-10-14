import { useState } from "react";
import { Link } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";
import { images, resolveImageUrl } from "../../constants/images";
import { Field, IMAGE_OPTIONS, ImagePicker, inputClass } from "./adminUi";

export default function AdminCollectionsPage() {
  const { collections, updateCollection, addCollection, removeCollection } = useCatalog();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newCollection, setNewCollection] = useState({
    title: "",
    eyebrow: "Collection",
    line: "",
    heroImage: IMAGE_OPTIONS[0].value,
    heroAlt: "",
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-[1.35rem] font-serif font-semibold text-ink tracking-[0.04em]">
            Collections Management
          </h2>
          <p className="mt-1 text-[0.82rem] text-taupe">
            Manage your candle collections, customize taglines, and update master mockups & photography.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="admin-btn glass-btn glass-btn-primary self-start sm:self-auto cursor-pointer"
        >
          + Add New Collection
        </button>
      </header>

      {/* Add New Collection Form Modal/Card */}
      {adding && (
        <section className="rounded-3xl border border-gold/45 bg-cream/80 p-5 md:p-6 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gold/25 pb-3 mb-4">
            <h3 className="font-serif text-lg font-medium text-ink">New Collection</h3>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="text-taupe hover:text-burgundy text-sm"
            >
              ✕ Cancel
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Collection Title">
              <input
                className={inputClass}
                placeholder="e.g. The Essence of Africa"
                value={newCollection.title}
                onChange={(e) => setNewCollection((c) => ({ ...c, title: e.target.value }))}
              />
            </Field>
            <Field label="Eyebrow / Subhead">
              <input
                className={inputClass}
                placeholder="e.g. Collection or Chapter I"
                value={newCollection.eyebrow}
                onChange={(e) => setNewCollection((c) => ({ ...c, eyebrow: e.target.value }))}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description / Tagline">
                <input
                  className={inputClass}
                  placeholder="e.g. Distant Lands. Timeless Beauty. Captured in Light."
                  value={newCollection.line}
                  onChange={(e) => setNewCollection((c) => ({ ...c, line: e.target.value }))}
                />
              </Field>
            </div>
            <ImagePicker
              value={newCollection.heroImage}
              onChange={(heroImage) => setNewCollection((c) => ({ ...c, heroImage }))}
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              className="rounded-full bg-burgundy px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ivory hover:bg-[#7a1c25] transition-colors"
              onClick={() => {
                if (!newCollection.title.trim()) return;
                addCollection({
                  title: newCollection.title.trim(),
                  eyebrow: newCollection.eyebrow.trim() || "Collection",
                  line: newCollection.line.trim(),
                  heroImage: newCollection.heroImage,
                  heroAlt: `${newCollection.title.trim()} master collection artwork`,
                });
                setNewCollection({
                  title: "",
                  eyebrow: "Collection",
                  line: "",
                  heroImage: IMAGE_OPTIONS[0].value,
                  heroAlt: "",
                });
                setAdding(false);
              }}
            >
              Create Collection
            </button>
            <button
              type="button"
              className="px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-taupe hover:text-ink"
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {/* Collections Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {collections.map((col, idx) => {
          const isEditing = editingId === col.id;
          return (
            <article
              key={col.id}
              className="overflow-hidden rounded-3xl border border-gold/35 bg-ivory shadow-sm transition-all hover:border-gold/60"
            >
              {/* Collection Card Header / Media */}
              <div className="relative aspect-[16/9] w-full bg-champagne overflow-hidden border-b border-gold/25">
                <img
                  src={resolveImageUrl(col.heroImage, images.candles)}
                  alt={col.heroAlt || col.title}
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.candles;
                  }}
                />
                <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-wider text-burgundy shadow-xs">
                  #{idx + 1} • {col.eyebrow || "Collection"}
                </div>
                <div className="absolute top-3 right-3 bg-ivory/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[0.65rem] font-medium text-ink shadow-xs">
                  {col.products?.length || 0} Fragrances
                </div>
              </div>

              {/* Collection Card Details */}
              <div className="p-5 space-y-4">
                {isEditing ? (
                  <div className="space-y-3.5">
                    <Field label="Collection Title">
                      <input
                        className={inputClass}
                        value={col.title}
                        onChange={(e) => updateCollection(col.id, { title: e.target.value })}
                      />
                    </Field>
                    <Field label="Eyebrow">
                      <input
                        className={inputClass}
                        value={col.eyebrow}
                        onChange={(e) => updateCollection(col.id, { eyebrow: e.target.value })}
                      />
                    </Field>
                    <Field label="Tagline / Description">
                      <input
                        className={inputClass}
                        value={col.line}
                        onChange={(e) => updateCollection(col.id, { line: e.target.value })}
                      />
                    </Field>
                    <ImagePicker
                      value={col.heroImage}
                      onChange={(heroImage) => updateCollection(col.id, { heroImage })}
                    />
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-full bg-forest px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ivory hover:opacity-90"
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-serif text-[1.2rem] font-semibold uppercase tracking-[0.06em] text-ink">
                        {col.title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] italic text-taupe leading-relaxed">
                        {col.line || "No description specified."}
                      </p>
                    </div>

                    <div className="rounded-xl bg-champagne/40 p-3 text-[0.74rem] text-taupe flex flex-wrap gap-1.5 items-center">
                      <span className="font-medium text-ink">Fragrances:</span>
                      {col.products && col.products.length > 0 ? (
                        col.products.map((p) => (
                          <span
                            key={p.id}
                            className="inline-block rounded-md bg-ivory px-2 py-0.5 border border-gold/25 text-ink text-[0.7rem]"
                          >
                            {p.name}
                          </span>
                        ))
                      ) : (
                        <span className="italic">No products added yet</span>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-gold/20">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingId(col.id)}
                          className="text-[0.72rem] font-semibold uppercase tracking-wider text-burgundy hover:underline cursor-pointer"
                        >
                          Edit Details & Image
                        </button>
                        <Link
                          to="/admin/candles"
                          className="text-[0.72rem] font-semibold uppercase tracking-wider text-taupe hover:text-ink cursor-pointer"
                        >
                          Manage Fragrances →
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${col.title}"?`)) {
                            removeCollection(col.id);
                          }
                        }}
                        className="text-[0.72rem] text-stone-400 hover:text-red-700 uppercase tracking-wider cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
