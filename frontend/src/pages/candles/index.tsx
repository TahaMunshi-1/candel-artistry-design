import { Link } from "react-router";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { candleCollections } from "../../constants/catalog";

export default function CandlesPage() {
  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad">
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(180px,28vw)] opacity-[0.3] hidden md:block"
        />
        <FloralCorner
          corner="br"
          className="absolute right-0 bottom-0 w-[min(180px,28vw)] opacity-[0.28] hidden md:block"
        />

        <div className="container-editorial relative z-[1]">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-burgundy">Shop</p>
            <h1 className="mt-3 text-section text-ink tracking-[0.04em]">Candles</h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe">
              Six collections — each fragrance shown with its scent nomenclature. Launch
              scents include price and Add to Cart; more labels arrive soon.
            </p>
          </header>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {candleCollections.map((collection) => (
              <Link
                key={collection.id}
                to={`/candles/${collection.slug}`}
                className="group block text-center"
              >
                <div className="overflow-hidden bg-champagne ring-1 ring-gold/35">
                  <img
                    src={collection.heroImage}
                    alt={collection.heroAlt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-eyebrow text-burgundy/80">{collection.eyebrow}</p>
                <h2 className="mt-1 font-serif text-[1.15rem] tracking-[0.12em] uppercase text-ink">
                  {collection.title}
                </h2>
                <p className="mt-2 font-serif text-[0.95rem] italic text-taupe group-hover:text-burgundy transition-colors">
                  Enter the collection →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
