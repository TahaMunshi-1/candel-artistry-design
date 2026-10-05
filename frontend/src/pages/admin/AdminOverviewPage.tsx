import { Link } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";

export default function AdminOverviewPage() {
  const { collections, paintings, cards } = useCatalog();
  const candleCount = collections.reduce((n, c) => n + c.products.length, 0);
  const availableCandles = collections.reduce(
    (n, c) => n + c.products.filter((p) => p.status === "available").length,
    0,
  );
  const comingSoon =
    collections.reduce(
      (n, c) => n + c.products.filter((p) => p.status === "coming_soon").length,
      0,
    ) +
    paintings.filter((p) => p.status === "coming_soon").length +
    cards.filter((c) => c.status === "coming_soon").length;

  const stats = [
    { label: "Candle SKUs", value: String(candleCount), hint: `${collections.length} collections` },
    { label: "For purchase", value: String(availableCandles), hint: "Live price + cart" },
    { label: "Paintings", value: String(paintings.length), hint: "Oil works" },
    { label: "Coming soon", value: String(comingSoon), hint: "Across catalog" },
  ];

  const tiles = [
    {
      to: "/admin/candles",
      title: "Candles",
      meta: `${candleCount} fragrances · ${availableCandles} for purchase`,
      hint: "Edit scent, price, Coming Soon, and jar imagery",
    },
    {
      to: "/admin/paintings",
      title: "Oil Paintings",
      meta: `${paintings.length} works`,
      hint: "Availability and inquire notes",
    },
    {
      to: "/admin/greeting-cards",
      title: "Greeting Cards",
      meta: `${cards.length} cards`,
      hint: "Availability and inquire notes",
    },
  ];

  return (
    <div>
      <header className="max-w-2xl">
        <p className="text-eyebrow text-burgundy">Dashboard</p>
        <h2 className="mt-2 font-display text-2xl tracking-[0.1em] uppercase text-ink">
          Catalog overview
        </h2>
        <p className="mt-3 font-serif text-taupe">
          Manage shop categories from the glass sidebar. Changes apply to the live shop in
          this browser.
        </p>
      </header>

      <div className="admin-stat-grid mt-8">
        {stats.map((s) => (
          <div key={s.label} className="admin-stat">
            <p className="admin-stat__label">{s.label}</p>
            <p className="admin-stat__value">{s.value}</p>
            <p className="admin-stat__hint">{s.hint}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 font-serif text-[0.72rem] tracking-[0.22em] uppercase text-taupe">
        Quick open
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="admin-dash-card">
            <h3 className="font-serif text-lg tracking-[0.08em] uppercase text-ink">
              {tile.title}
            </h3>
            <p className="mt-2 font-serif text-sm text-burgundy">{tile.meta}</p>
            <p className="mt-2 font-serif text-sm italic text-taupe">{tile.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
