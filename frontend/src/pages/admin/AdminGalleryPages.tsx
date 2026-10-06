import { useState } from "react";
import { useCatalog } from "../../catalog/CatalogContext";
import type { GalleryItem, ProductStatus } from "../../constants/catalog";
import { images, resolveImageUrl } from "../../constants/images";
import { Field, IMAGE_OPTIONS, ImagePicker, inputClass, selectClass } from "./adminUi";

type Kind = "paintings" | "cards";

function GalleryAdmin({
  kind,
  title,
  blurb,
}: {
  kind: Kind;
  title: string;
  blurb: string;
}) {
  const catalog = useCatalog();
  const items = kind === "paintings" ? catalog.paintings : catalog.cards;
  const update = kind === "paintings" ? catalog.updatePainting : catalog.updateCard;
  const add = kind === "paintings" ? catalog.addPainting : catalog.addCard;
  const remove = kind === "paintings" ? catalog.removePainting : catalog.removeCard;

  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    status: "coming_soon" as ProductStatus,
    note: "",
    image: IMAGE_OPTIONS[0].value,
  });

  return (
    <div>
      <header className="max-w-2xl">
        <h2 className="text-[1.15rem] font-semibold text-ink">{title}</h2>
        <p className="mt-1.5 text-[0.82rem] text-taupe">{blurb}</p>
      </header>

      <div className="mt-8 space-y-5">
        {items.map((item) => (
          <GalleryRow
            key={item.id}
            item={item}
            onChange={(patch) => update(item.id, patch)}
            onRemove={() => {
              if (confirm(`Remove ${item.name}?`)) remove(item.id);
            }}
          />
        ))}
      </div>

      {adding ? (
        <div className="mt-6 rounded-2xl border border-dashed border-gold/50 bg-champagne/40 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
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
                  setDraft((d) => ({ ...d, status: e.target.value as ProductStatus }))
                }
              >
                <option value="available">Available</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </Field>
            <Field label="Note (optional)">
              <input
                className={inputClass}
                value={draft.note}
                onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
                placeholder="Inquire for availability"
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
              className="rounded-full bg-gold px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-ivory hover:bg-burgundy"
              onClick={() => {
                if (!draft.name.trim()) return;
                add({
                  name: draft.name.trim(),
                  status: draft.status,
                  note: draft.note.trim() || undefined,
                  image: draft.image,
                  alt: draft.name.trim(),
                });
                setDraft({
                  name: "",
                  status: "coming_soon",
                  note: "",
                  image: IMAGE_OPTIONS[0].value,
                });
                setAdding(false);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-taupe"
              onClick={() => setAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-burgundy hover:underline"
          onClick={() => setAdding(true)}
        >
          + Add item
        </button>
      )}
    </div>
  );
}

function GalleryRow({
  item,
  onChange,
  onRemove,
}: {
  item: GalleryItem;
  onChange: (patch: Partial<GalleryItem>) => void;
  onRemove: () => void;
}) {
  return (
    <article className="grid gap-4 rounded-3xl border border-gold/35 bg-ivory p-4 md:grid-cols-[120px_1fr]">
      <img
        src={resolveImageUrl(item.image, images.paintings)}
        alt=""
        className="aspect-[3/4] w-full rounded-2xl object-cover bg-champagne"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = images.paintings;
        }}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name">
          <input
            className={inputClass}
            value={item.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </Field>
        <Field label="Status">
          <select
            className={selectClass}
            value={item.status}
            onChange={(e) => onChange({ status: e.target.value as ProductStatus })}
          >
            <option value="available">Available</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
        </Field>
        <Field label="Note">
          <input
            className={inputClass}
            value={item.note ?? ""}
            onChange={(e) => onChange({ note: e.target.value })}
          />
        </Field>
        <ImagePicker
          value={item.image}
          onChange={(image) => onChange({ image })}
        />
        <div className="flex items-end sm:col-span-2">
          <button
            type="button"
            className="text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-royal hover:underline"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export function AdminPaintingsPage() {
  return (
    <GalleryAdmin
      kind="paintings"
      title="Oil Paintings"
      blurb="Update painting availability and notes shown on the shop page."
    />
  );
}

export function AdminCardsPage() {
  return (
    <GalleryAdmin
      kind="cards"
      title="Greeting Cards"
      blurb="Update card availability and notes shown on the shop page."
    />
  );
}
