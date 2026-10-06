import type { CandleProduct, GalleryItem, ProductStatus } from "../../constants/catalog";
import { useCart } from "../../context/CartContext";

type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  alt: string;
  status: ProductStatus;
  category?: string;
  nomenclature?: string;
  price?: number;
  note?: string;
};

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function ProductCard({
  id,
  name,
  image,
  alt,
  status,
  category,
  nomenclature,
  price,
  note,
}: ProductCardProps) {
  const available = status === "available";
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price: price ?? (category === "Oil Paintings" ? 450 : category === "Greeting Cards" ? 12 : 24),
      image,
      category,
      nomenclature: nomenclature || note,
    });
  };

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
            onError={(e) => {
              // Graceful fallback to default image if needed
              (e.currentTarget as HTMLImageElement).src = "/images/candles.jpg";
            }}
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
            className="mt-4 inline-flex min-w-[10.5rem] items-center justify-center bg-gold px-5 py-2.5 font-serif text-[0.68rem] tracking-[0.22em] uppercase text-ivory transition-colors duration-300 hover:bg-burgundy cursor-pointer"
            onClick={handleAdd}
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
      id={product.id || product.slug}
      name={product.name}
      image={product.image}
      alt={product.alt}
      status={product.status}
      category="Candles"
      nomenclature={product.nomenclature}
      price={product.price}
    />
  );
}

export function GalleryProductCard({
  item,
  category,
}: {
  item: GalleryItem;
  category?: string;
}) {
  return (
    <ProductCard
      id={item.id}
      name={item.name}
      image={item.image}
      alt={item.alt}
      status={item.status}
      category={category || "Atelier Gallery"}
      price={item.price}
      note={item.note}
    />
  );
}
