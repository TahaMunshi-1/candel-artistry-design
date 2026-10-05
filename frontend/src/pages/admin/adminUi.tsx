import { useId, useRef, useState, type ReactNode } from "react";
import { images } from "../../constants/images";

/** Preset image URLs admins can assign */
export const IMAGE_OPTIONS = [
  { label: "Craft Romance", value: images.craftRomance },
  { label: "Craft Vampire", value: images.craftVampire },
  { label: "Craft Rodeo", value: images.craftRodeo },
  { label: "Craft Atelier", value: images.craftAtelier },
  { label: "Candles group", value: images.candles },
  { label: "Products group", value: images.productsGroup },
  { label: "Vampire detail", value: images.vampire },
  { label: "Rodeo detail", value: images.rodeoDetail },
  { label: "Featured main", value: images.featuredMain },
  { label: "Strip 1", value: images.featuredStrip1 },
  { label: "Strip 2", value: images.featuredStrip2 },
  { label: "Wilderness", value: images.wilderness },
  { label: "Experience Romance", value: images.experienceRomance },
  { label: "Experience Mystery", value: images.experienceMystery },
  { label: "Experience Cabin", value: images.experienceCabin },
  { label: "Experience Wilderness", value: images.experienceWilderness },
  { label: "Classic 1", value: images.experienceClassic1 },
  { label: "Classic 2", value: images.experienceClassic2 },
  { label: "Classic 3", value: images.experienceClassic3 },
  { label: "Classic 4", value: images.experienceClassic4 },
  { label: "Paintings", value: images.paintings },
  { label: "Cards", value: images.cards },
] as const;

type FieldProps = {
  label: string;
  children: ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="font-serif text-[0.78rem] tracking-[0.06em] text-taupe">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-gold/45 bg-ivory px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold";

export const selectClass = inputClass;

const MAX_EDGE = 900;
const JPEG_QUALITY = 0.78;

/** Compress uploads so localStorage stays under quota */
async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

type ImagePickerProps = {
  value: string;
  onChange: (url: string) => void;
  /** Stretch across form columns */
  className?: string;
};

export function ImagePicker({ value, onChange, className = "" }: ImagePickerProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);

  const isUpload = value.startsWith("data:");
  const selectedPreset = IMAGE_OPTIONS.find((o) => o.value === value);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image is too large (max 8MB before compress).");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
      setShowLibrary(false);
    } catch {
      setError("Could not read that image. Try another file.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className={`sm:col-span-2 ${className}`}>
      <span className="font-serif text-[0.78rem] tracking-[0.06em] text-taupe">
        Product image
      </span>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="shrink-0 overflow-hidden rounded-2xl border border-gold/40 bg-champagne shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
          <img
            src={value}
            alt="Selected product"
            className="aspect-[3/4] w-[120px] object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <p className="font-serif text-sm text-ink">
            {isUpload
              ? "Custom upload"
              : selectedPreset
                ? selectedPreset.label
                : "Custom / current image"}
          </p>

          <div className="flex flex-wrap gap-2">
            <label
              htmlFor={inputId}
              className={`inline-flex cursor-pointer items-center rounded-full bg-gold px-4 py-2 font-serif text-[0.68rem] tracking-[0.18em] uppercase text-ivory transition-colors hover:bg-burgundy ${
                busy ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {busy ? "Uploading…" : "Upload image"}
            </label>
            <input
              id={inputId}
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              disabled={busy}
              onChange={(e) => void onFile(e.target.files?.[0])}
            />
            <button
              type="button"
              className="rounded-full border border-gold/50 px-4 py-2 font-serif text-[0.68rem] tracking-[0.18em] uppercase text-ink hover:border-burgundy hover:text-burgundy"
              onClick={() => setShowLibrary((v) => !v)}
            >
              {showLibrary ? "Hide library" : "Choose from library"}
            </button>
          </div>

          {error ? <p className="font-serif text-sm text-royal">{error}</p> : null}
          <p className="font-serif text-[0.75rem] text-taupe">
            Uploads are stored in this browser (compressed). Prefer JPG under ~2MB.
          </p>
        </div>
      </div>

      {showLibrary ? (
        <div className="mt-4 max-h-64 overflow-y-auto rounded-2xl border border-gold/30 bg-ivory p-3">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {IMAGE_OPTIONS.map((opt) => {
              const active = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  title={opt.label}
                  onClick={() => {
                    onChange(opt.value);
                    setShowLibrary(false);
                  }}
                  className={`group overflow-hidden rounded-xl border text-left transition-colors ${
                    active
                      ? "border-burgundy ring-1 ring-burgundy"
                      : "border-gold/30 hover:border-gold"
                  }`}
                >
                  <img
                    src={opt.value}
                    alt={opt.label}
                    className="aspect-square w-full object-cover bg-champagne"
                    loading="lazy"
                  />
                  <span className="block truncate px-1.5 py-1 font-serif text-[0.62rem] text-taupe group-hover:text-ink">
                    {opt.label}
                  </span>
                </button>
              );
            })}
            {isUpload || (!selectedPreset && value) ? (
              <button
                type="button"
                title="Current custom image"
                onClick={() => setShowLibrary(false)}
                className="overflow-hidden border border-burgundy ring-1 ring-burgundy text-left"
              >
                <img
                  src={value}
                  alt="Current"
                  className="aspect-square w-full object-cover bg-champagne"
                />
                <span className="block truncate px-1.5 py-1 font-serif text-[0.62rem] text-ink">
                  Current
                </span>
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
