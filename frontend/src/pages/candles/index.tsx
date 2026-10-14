import { Link } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";
import { images, resolveImageUrl } from "../../constants/images";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import ShopPageShell from "../../components/shop/ShopPageShell";

export default function CandlesPage() {
  const { collections } = useCatalog();

  // Ensure "Moments" is always first on top as requested
  const sortedCollections = [...collections].sort((a, b) => {
    if (a.slug === "moments") return -1;
    if (b.slug === "moments") return 1;
    return 0;
  });

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad bg-ivory">
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(180px,28vw)] opacity-[0.32] hidden md:block pointer-events-none"
        />
        <FloralCorner
          corner="br"
          className="absolute right-0 bottom-0 w-[min(180px,28vw)] opacity-[0.28] hidden md:block pointer-events-none"
        />

        <div className="container-editorial relative z-[1]">
          {/* Page Header */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-burgundy !tracking-[0.32em]">
              Candle Artistry Design Co.
            </p>
            <h1 className="mt-3 text-section text-ink tracking-[0.05em] font-light">
              Collections
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-12 bg-gold/45" />
              <DiamondMark className="h-2 w-2 shrink-0" />
              <div className="h-px w-12 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe max-w-2xl mx-auto text-[0.92rem] md:text-[1rem] leading-relaxed">
              Six curated worlds — hand-filled in small batches in Coarsegold, CA using pure Coconut Apricot & Soy wax, lead-free wicks, and phthalate-free fragrances.
            </p>
          </header>

          {/* Collections Showcase — Product image BIGGER & highlighted */}
          <div className="mt-14 md:mt-18 space-y-16 md:space-y-24">
            {sortedCollections.map((collection, index) => {
              const isMoments = collection.slug === "moments";
              return (
                <article
                  key={collection.id}
                  id={collection.slug}
                  className={`rounded-3xl border ${
                    isMoments
                      ? "border-gold/60 bg-[#fdfaf5] ring-1 ring-gold/40 shadow-[0_16px_40px_rgba(92,16,24,0.1)]"
                      : "border-gold/35 bg-[#fcf9f4] shadow-sm"
                  } p-5 sm:p-7 md:p-9 transition-all duration-500 hover:border-gold hover:shadow-md`}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-12">
                    {/* BIG Highlighted Mockup Image (Prominent & Dominant) */}
                    <div className="w-full lg:w-[62%] xl:w-[65%] shrink-0">
                      <Link
                        to={`/candles/${collection.slug}`}
                        className="group relative block aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-champagne/40 border border-gold/40 shadow-[0_12px_32px_rgba(30,15,10,0.12)] transition-transform duration-700 ease-out hover:scale-[1.01]"
                      >
                        <img
                          src={resolveImageUrl(collection.heroImage, images.craftRomance)}
                          alt={collection.heroAlt || `${collection.title} master mockup`}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading={index === 0 ? "eager" : "lazy"}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = images.candles;
                          }}
                        />
                        {/* Subtle gold frame overlay */}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-2xl" />
                        <div className="absolute top-3.5 left-3.5 bg-ivory/95 backdrop-blur-xs px-3 py-1 rounded-full text-[0.66rem] font-semibold uppercase tracking-wider text-burgundy shadow-xs">
                          {isMoments ? "★ Featured First • " : ""}
                          {collection.eyebrow || "Collection"}
                        </div>
                      </Link>
                    </div>

                    {/* Collection Info & Fragrances */}
                    <div className="w-full lg:w-[38%] xl:w-[35%] flex flex-col justify-center text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-burgundy text-[0.68rem] uppercase tracking-[0.24em] font-semibold">
                        <span>Chapter {index + 1}</span>
                        <span>•</span>
                        <span>{collection.products?.length || 0} Fragrances</span>
                      </div>

                      <h2 className="mt-2 font-serif text-[1.65rem] sm:text-[1.85rem] md:text-[2.05rem] font-normal tracking-[0.06em] uppercase text-ink leading-tight">
                        {collection.title}
                      </h2>

                      <p className="mt-3 font-serif italic text-[0.92rem] md:text-[0.98rem] text-taupe leading-relaxed">
                        {collection.line}
                      </p>

                      {/* Fragrance Pills */}
                      <div className="mt-5 pt-4 border-t border-gold/25">
                        <p className="font-serif text-[0.68rem] uppercase tracking-[0.2em] text-ink font-semibold mb-2.5">
                          Fragrances in this collection:
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                          {collection.products?.map((p) => (
                            <span
                              key={p.id}
                              className="rounded-full bg-champagne/80 border border-gold/30 px-3 py-1 text-[0.72rem] font-medium text-ink shadow-2xs"
                            >
                              {p.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-7">
                        <Link
                          to={`/candles/${collection.slug}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5c1018] px-7 py-3 font-serif text-[0.74rem] uppercase tracking-[0.16em] text-[#fcf8f2] shadow-sm hover:bg-[#7a1c25] transition-all hover:scale-102 cursor-pointer font-medium"
                        >
                          <span>Explore {collection.title}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
