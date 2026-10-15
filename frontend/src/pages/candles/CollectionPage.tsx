import { Link, Navigate, useParams } from "react-router";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { CandleProductCard } from "../../components/shop/ProductCard";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { useCatalog } from "../../catalog/CatalogContext";
import { images, resolveImageUrl } from "../../constants/images";

export default function CandleCollectionPage() {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const { getCollection } = useCatalog();
  const collection = collectionSlug ? getCollection(collectionSlug) : undefined;

  if (!collection) {
    return <Navigate to="/candles" replace />;
  }

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad bg-ivory">
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(160px,26vw)] opacity-[0.28] hidden md:block pointer-events-none"
        />
        <FloralCorner
          corner="bl"
          className="absolute left-0 bottom-0 w-[min(160px,26vw)] opacity-[0.22] hidden md:block pointer-events-none"
        />

        <div className="container-editorial relative z-[1]">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-center font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe">
            <Link to="/candles" className="nav-link hover:text-burgundy">
              Collections
            </Link>
            <span className="mx-2 text-gold/60" aria-hidden>
              /
            </span>
            <span className="text-ink font-semibold">{collection.title}</span>
          </nav>

          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-burgundy !tracking-[0.3em]">
              {collection.eyebrow || "Collection"}
            </p>
            <h1 className="mt-3 text-section text-ink tracking-[0.06em] font-light">
              {collection.title}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe text-[0.95rem] leading-relaxed max-w-xl mx-auto">
              {collection.line}
            </p>
          </header>

          {/* Big Master Collection Mockup Showcase Banner */}
          <div className="mt-10 mx-auto max-w-5xl rounded-3xl overflow-hidden border border-gold/45 shadow-[0_16px_40px_rgba(30,15,10,0.14)] bg-champagne/30">
            <img
              src={resolveImageUrl(collection.heroImage, images.craftRomance)}
              alt={collection.heroAlt || `${collection.title} master collection mockup`}
              className="w-full h-auto aspect-[16/9] object-cover object-center"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = images.candles;
              }}
            />
          </div>

          {/* Individual Fragrance Cards */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-[1.25rem] md:text-[1.45rem] uppercase tracking-[0.12em] text-ink font-light">
              Available Fragrances
            </h2>
            <div className="mt-2.5 flex items-center justify-center gap-2 text-gold/60">
              <div className="h-px w-8 bg-gold/30" />
              <span className="text-xs">✦</span>
              <div className="h-px w-8 bg-gold/30" />
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
            {collection.products.map((product) => (
              <CandleProductCard
                key={product.id}
                product={product}
                collectionSlug={collection.slug}
              />
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-lg text-center font-serif text-[0.92rem] italic text-taupe leading-relaxed">
            Handcrafted with love in Coarsegold, CA. More limited batch releases from this collection are scheduled for upcoming seasons.
          </p>

          <div className="mt-8 text-center">
            <Link
              to="/candles"
              className="inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.16em] text-burgundy font-serif font-medium hover:underline"
            >
              ← Back to All Collections
            </Link>
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
