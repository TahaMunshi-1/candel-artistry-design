import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { GalleryProductCard } from "../../components/shop/ProductCard";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { oilPaintings } from "../../constants/catalog";

export default function PaintingsPage() {
  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad">
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(160px,26vw)] opacity-[0.3] hidden md:block"
        />
        <div className="container-editorial relative z-[1]">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-burgundy">Shop</p>
            <h1 className="mt-3 text-section text-ink tracking-[0.04em]">
              Oil Paintings
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe">
              Original works from the atelier — the same worlds that inspire our labels
              and candles.
            </p>
          </header>

          <div className="mx-auto mt-14 grid max-w-4xl gap-12 sm:grid-cols-2">
            {oilPaintings.map((item) => (
              <GalleryProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
