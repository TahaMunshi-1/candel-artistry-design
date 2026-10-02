import { Link } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";

export default function AdminOverviewPage() {
  const { collections, paintings, cards } = useCatalog();
  const candleCount = collections.reduce((n, c) => n + c.products.length, 0);
  const availableCandles = collections.reduce(
    (n, c) => n + c.products.filter((p) => p.status === "available").length,
    0,
  );

  const tiles = [
    {
      to: "/admin/candles",
      title: "Candles",
      meta: `${candleCount} fragrances · ${availableCandles} for purchase`,
      hint: "6 collections — edit scent, price, Coming Soon",
    },
    {
      to: "/admin/paintings",
      title: "Oil Paintings",
      meta: `${paintings.length} works`,
      hint: "Status and inquire notes",
    },
    {
      to: "/admin/greeting-cards",
      title: "Greeting Cards",
      meta: `${cards.length} cards`,
      hint: "Status and inquire notes",
    },
  ];

  return (
    <div>
      <header className="max-w-2xl">
        <h2 className="font-display text-2xl tracking-[0.1em] uppercase text-ink">Overview</h2>
        <p className="mt-3 font-serif text-taupe">
          Manage the three shop categories. Edits update the live shop UI in this browser
          via local storage — no backend yet.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className="block border border-gold/35 bg-ivory p-6 transition-colors hover:border-burgundy/50"
          >
            <h3 className="font-serif text-lg tracking-[0.08em] uppercase text-ink">
              {tile.title}
            </h3>
            <p className="mt-2 font-serif text-sm text-burgundy">{tile.meta}</p>
            <p className="mt-3 font-serif text-sm italic text-taupe">{tile.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
