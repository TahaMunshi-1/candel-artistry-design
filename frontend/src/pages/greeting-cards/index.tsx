import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { GalleryProductCard } from "../../components/shop/ProductCard";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { useCatalog } from "../../catalog/CatalogContext";

export default function GreetingCardsPage() {
  const { cards } = useCatalog();

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden section-pad">
        <FloralCorner
          corner="br"
          className="absolute right-0 bottom-0 w-[min(160px,26vw)] opacity-[0.28] hidden md:block"
        />
        <div className="container-editorial relative z-[1]">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow text-burgundy">Shop</p>
            <h1 className="mt-3 text-section text-ink tracking-[0.04em]">
              Greeting Cards
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 text-body text-taupe">
              Storybook cards from the same illustrated world — ready to send the feeling
              home.
            </p>
          </header>

          <div className="mx-auto mt-14 grid max-w-4xl gap-12 sm:grid-cols-2">
            {cards.map((item) => (
              <GalleryProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
