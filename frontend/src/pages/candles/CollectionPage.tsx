import { Link, Navigate, useParams } from "react-router";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { CandleProductCard } from "../../components/shop/ProductCard";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { getCandleCollection } from "../../constants/catalog";

export default function CandleCollectionPage() {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const collection = collectionSlug ? getCandleCollection(collectionSlug) : undefined;

  if (!collection) {
    return <Navigate to="/candles" replace />;
  }

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad">
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(160px,26vw)] opacity-[0.28] hidden md:block"
        />

        <div className="container-editorial relative z-[1]">
          <nav className="mb-8 text-center font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe">
            <Link to="/candles" className="nav-link hover:text-burgundy">
              Candles
            </Link>
            <span className="mx-2 text-gold/60" aria-hidden>
              /
            </span>
            <span className="text-ink">{collection.title}</span>
          </nav>

          <header className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-burgundy">{collection.eyebrow}</p>
            <h1 className="mt-3 text-section text-ink tracking-[0.06em]">
              {collection.title}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe">{collection.line}</p>
          </header>

          <div className="mx-auto mt-14 grid max-w-4xl gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {collection.products.map((product) => (
              <CandleProductCard key={product.id} product={product} />
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center font-serif text-[0.95rem] italic text-taupe">
            More fragrances from this collection are arriving soon — shown here as they
            are released for purchase.
          </p>
        </div>
      </section>
    </ShopPageShell>
  );
}
