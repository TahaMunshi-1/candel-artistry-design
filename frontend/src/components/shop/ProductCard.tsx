import type { CandleProduct, GalleryItem, ProductStatus } from "../../constants/catalog";

type ProductCardProps = {
  name: string;
  image: string;
  alt: string;
  status: ProductStatus;
  nomenclature?: string;
  price?: number;
  note?: string;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function ProductCard({
  name,
  image,
  alt,
  status,
  nomenclature,
  price,
  note,
}: ProductCardProps) {
  const available = status === "available";

  return (
    <article className="flex flex-col items-center text-center">
      <figure className="m-0 w-full max-w-[280px]">
        <div className="overflow-hidden bg-champagne ring-1 ring-gold/35">
          <img
            src={image}
            alt={alt}
            className="aspect-[3/4] w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
      </figure>

      <h3 className="mt-5 font-serif text-[1.15rem] font-medium tracking-[0.04em] text-ink md:text-[1.25rem]">
        {name}
      </h3>

      {nomenclature ? (
        <p className="mt-2 max-w-[16rem] font-serif text-[0.88rem] leading-snug tracking-[0.02em] text-taupe">
          {nomenclature}
        </p>
      ) : null}

      {available ? (
        <>
          {typeof price === "number" ? (
            <p className="mt-3 font-serif text-[1.2rem] tracking-[0.06em] text-ink">
              {formatPrice(price)}
            </p>
          ) : note ? (
            <p className="mt-3 font-serif text-[0.85rem] italic tracking-[0.04em] text-taupe">
              {note}
            </p>
          ) : null}
          <button
            type="button"
            className="mt-4 inline-flex min-w-[10.5rem] items-center justify-center bg-gold px-5 py-2.5 font-serif text-[0.68rem] tracking-[0.22em] uppercase text-ivory transition-colors duration-300 hover:bg-burgundy"
            onClick={() => {
              /* Commerce wiring comes later */
            }}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p className="mt-4 font-display text-[0.72rem] tracking-[0.28em] uppercase text-burgundy/85">
          Coming Soon
        </p>
      )}
    </article>
  );
}

export function CandleProductCard({ product }: { product: CandleProduct }) {
  return (
    <ProductCard
      name={product.name}
      image={product.image}
      alt={product.alt}
      status={product.status}
      nomenclature={product.nomenclature}
      price={product.price}
    />
  );
}

export function GalleryProductCard({ item }: { item: GalleryItem }) {
  return (
    <ProductCard
      name={item.name}
      image={item.image}
      alt={item.alt}
      status={item.status}
      note={item.note}
    />
  );
}
