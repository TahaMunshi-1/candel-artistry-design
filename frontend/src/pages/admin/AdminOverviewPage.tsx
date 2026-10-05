import {
  money,
  salesSeries,
  demoOrders,
  demoCustomers,
} from "./mockEcommerce";
import { useCatalog } from "../../catalog/CatalogContext";
import { images } from "../../constants/images";
import { Link } from "react-router";
import { useState } from "react";

function RevenueChart() {
  const max = Math.max(...salesSeries.map((p) => p.revenue));
  const w = 640;
  const h = 150;
  const padX = 18;
  const padY = 22;
  const coords = salesSeries.map((p, i) => {
    const x = padX + (i * (w - padX * 2)) / (salesSeries.length - 1);
    const y = h - padY - (p.revenue / max) * (h - padY * 2);
    return { x, y, p };
  });
  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area = `M${padX},${h - padY} L${line.replace(/ /g, " L")} L${w - padX},${h - padY} Z`;
  const tip = coords[coords.length - 2] ?? coords[coords.length - 1];

  return (
    <div className="admin-chart-stage">
      <div
        className="admin-chart-tip"
        style={{ left: `${(tip.x / w) * 100}%`, top: `${(tip.y / h) * 100 - 8}%` }}
        aria-hidden
      >
        <strong>
          {tip.p.label} — {money(tip.p.revenue)}
        </strong>
      </div>
      <div className="admin-chart-botanical" aria-hidden />
      <svg viewBox={`0 0 ${w} ${h}`} className="admin-chart" role="img" aria-label="Sales overview">
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CB5F58" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#CB5F58" stopOpacity="0.02" />
          </linearGradient>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0.2, 0.4, 0.6, 0.8].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={w - padX}
            y1={padY + t * (h - padY * 2)}
            y2={padY + t * (h - padY * 2)}
            className="admin-chart__grid"
          />
        ))}
        <path d={area} fill="url(#revFill)" />
        <polyline
          fill="none"
          stroke="#CB5F58"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={line}
          filter="url(#lineGlow)"
        />
        {coords.map(({ x, y, p }) => (
          <circle key={p.label} cx={x} cy={y} r="3.5" fill="#FFF9F2" stroke="#CB5F58" strokeWidth="2" />
        ))}
      </svg>
      <div className="admin-chart-labels">
        {salesSeries.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

function OrderStatusDonut() {
  const display = [
    {
      label: "Completed",
      color: "#6E8663",
      value: demoOrders.filter((o) => o.status === "delivered").length,
    },
    {
      label: "Processing",
      color: "#C67A70",
      value: demoOrders.filter((o) => o.status === "shipped" || o.status === "paid").length,
    },
    {
      label: "Pending",
      color: "#D6AA6B",
      value: demoOrders.filter((o) => o.status === "pending").length,
    },
    {
      label: "Cancelled",
      color: "#A95454",
      value: demoOrders.filter((o) => o.status === "cancelled").length,
    },
    { label: "Refunded", color: "#8A817B", value: 0 },
  ];

  const total = display.reduce((n, c) => n + c.value, 0) || 1;
  let acc = 0;
  const stops = display
    .filter((c) => c.value > 0)
    .map((c) => {
      const start = (acc / total) * 100;
      acc += c.value;
      const end = (acc / total) * 100;
      return `${c.color} ${start}% ${end}%`;
    });

  return (
    <div className="admin-donut-wrap">
      <div className="admin-donut-stage">
        <div
          className="admin-donut"
          style={{ background: `conic-gradient(${stops.join(", ")})` }}
          aria-hidden
        />
        <div className="admin-donut-center">
          <strong>{demoOrders.length}</strong>
          <span>Orders</span>
        </div>
      </div>
      <ul className="admin-donut-legend">
        {display.map((c) => (
          <li key={c.label}>
            <span style={{ background: c.color }} />
            {c.label}
            <strong>{c.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniSpark({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="admin-kpi__spark" aria-hidden>
      {values.map((v, i) => (
        <i key={i} style={{ height: `${Math.max(22, (v / max) * 100)}%` }} />
      ))}
    </div>
  );
}

function KpiIcon({ kind }: { kind: "revenue" | "orders" | "customers" | "products" }) {
  if (kind === "revenue") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v18M17 8c0-2-2-3.5-5-3.5S7 6 7 8s2 3 5 3.5 5 1.5 5 3.5-2 3.5-5 3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "orders") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 7h12l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H9.2a1.5 1.5 0 0 1-1.5-1.3L6.5 4H4" />
      </svg>
    );
  }
  if (kind === "customers") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c1.2-3 3.2-4.5 5.5-4.5S15.3 16 16.5 19" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3c.8 1.2.8 2.4 0 3.2-.8-.8-.8-2 0-3.2Z" />
      <path d="M9 9h6v11H9V9Z" />
    </svg>
  );
}

function statusVisual(status: (typeof demoOrders)[number]["status"]) {
  if (status === "delivered") return { label: "Completed", className: "admin-badge--delivered" };
  if (status === "shipped") return { label: "Processing", className: "admin-badge--processing" };
  if (status === "paid") return { label: "Processing", className: "admin-badge--processing" };
  if (status === "pending") return { label: "Pending", className: "admin-badge--pending" };
  return { label: "Cancelled", className: "admin-badge--cancelled" };
}

function relativeLabel(date: string) {
  const day = Number(date.slice(-2));
  const labels = ["2 mins ago", "18 mins ago", "1 hour ago", "Yesterday", "2 days ago", "3 days ago"];
  return labels[day % labels.length] ?? date;
}

export default function AdminOverviewPage() {
  const { collections, paintings, cards } = useCatalog();
  const [productQ, setProductQ] = useState("");

  const candleProducts = collections.flatMap((c) =>
    c.products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      category: c.title,
      price: p.price,
      status: p.status,
      stock: p.status === "available" ? 24 : 0,
      href: "/admin/candles",
    })),
  );

  const galleryProducts = [
    ...paintings.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      category: "Paintings",
      price: null as number | null,
      status: p.status,
      stock: p.status === "available" ? 6 : 0,
      href: "/admin/paintings",
    })),
    ...cards.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      category: "Cards",
      price: null as number | null,
      status: p.status,
      stock: p.status === "available" ? 40 : 0,
      href: "/admin/greeting-cards",
    })),
  ];

  const allProducts = [...candleProducts, ...galleryProducts];
  const filteredProducts = allProducts.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(productQ.trim().toLowerCase()),
  );

  const revenue = salesSeries.reduce((n, p) => n + p.revenue, 0);
  const orders = salesSeries.reduce((n, p) => n + p.orders, 0);
  const productCount = allProducts.length;
  const customerCount = demoCustomers.length;

  const kpis = [
    {
      label: "Total Revenue",
      value: money(revenue),
      delta: "+12% vs last month",
      tone: "champagne" as const,
      kind: "revenue" as const,
      spark: salesSeries.slice(-8).map((p) => p.revenue),
    },
    {
      label: "Total Orders",
      value: String(orders),
      delta: "+8% vs last month",
      tone: "blush" as const,
      kind: "orders" as const,
      spark: salesSeries.slice(-8).map((p) => p.orders),
    },
    {
      label: "Total Customers",
      value: customerCount.toLocaleString(),
      delta: "+5% vs last month",
      tone: "amber" as const,
      kind: "customers" as const,
      spark: [3, 4, 5, 5, 6, 7, 7, customerCount],
    },
    {
      label: "Products",
      value: String(productCount),
      delta: "+3% vs last month",
      tone: "sage" as const,
      kind: "products" as const,
      spark: [8, 10, 12, 14, 16, 18, 19, productCount],
    },
  ];

  /* Main-site product imagery for the admin welcome card */
  const heroImage = images.featuredMain || images.candles || images.lifestyle || images.hero;
  const orderThumbs = [
    images.craftRomance,
    images.craftVampire,
    images.craftRodeo,
    images.paintings,
    images.cards,
    images.candles,
  ];

  return (
    <div className="admin-dash">
      <section className="admin-hero liquid-glass-gold" aria-label="Welcome">
        <div
          className="admin-hero__media"
          style={{ backgroundImage: `url(${heroImage})` }}
          role="img"
          aria-label="Candle Artistry product photography"
        />
        <div className="admin-hero__overlay" aria-hidden />
        <div className="admin-hero__content">
          <p className="admin-hero__welcome">Welcome back,</p>
          <h2 className="admin-hero__name">
            Admin <em aria-hidden="true">✦</em>
          </h2>
          <p className="admin-hero__desc">Here&apos;s what&apos;s happening with your store today.</p>
          <div className="admin-hero__actions">
            <Link to="/" className="admin-btn glass-btn glass-btn-primary">
              View Store →
            </Link>
            <Link to="/admin/candles" className="admin-btn--hero-ghost glass-btn">
              + Add New Product
            </Link>
          </div>
        </div>
        <div className="admin-hero__quote">
          <p>“Turning everyday moments into timeless memories.”</p>
        </div>
      </section>

      <div className="admin-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="admin-kpi liquid-glass liquid-glass-hover">
            <div className="admin-kpi__top">
              <span className={`admin-kpi__icon admin-kpi__icon--${k.tone}`} aria-hidden>
                <KpiIcon kind={k.kind} />
              </span>
              <p className="admin-kpi__label">{k.label}</p>
            </div>
            <div className="admin-kpi__body">
              <div className="admin-kpi__copy">
                <p className="admin-kpi__value">{k.value}</p>
                <p className={`admin-kpi__delta${k.delta.startsWith("+") ? " is-up" : ""}`}>
                  {k.delta}
                </p>
              </div>
              <MiniSpark values={k.spark} />
            </div>
          </div>
        ))}
      </div>

      {/* Target row: Sales ~50% | Order Status ~28% | Recent Orders ~22% */}
      <div className="admin-analytics-row">
        <section className="admin-panel admin-panel--sales liquid-glass">
          <div className="admin-panel__head">
            <h3>Sales Overview</h3>
            <span className="admin-panel__chip">Last 10 months</span>
          </div>
          <RevenueChart />
        </section>

        <section className="admin-panel admin-panel--status liquid-glass">
          <div className="admin-panel__head">
            <h3>Order Status</h3>
          </div>
          <OrderStatusDonut />
        </section>

        <section className="admin-panel admin-panel--orders liquid-glass">
          <div className="admin-panel__head">
            <h3>Recent Orders</h3>
            <Link to="/admin/orders">See all</Link>
          </div>
          <ul className="admin-order-list">
            {demoOrders.slice(0, 2).map((o, i) => {
              const vis = statusVisual(o.status);
              return (
                <li key={o.id}>
                  <img
                    className="admin-order-list__thumb"
                    src={orderThumbs[i % orderThumbs.length]}
                    alt=""
                  />
                  <div className="admin-order-list__meta">
                    <strong>#{o.id.replace("CAD-", "CA-")}</strong>
                    <span>
                      {
                        [
                          "Serengeti Gold",
                          "Lady in the Rain",
                          "Crimson Veil",
                          "Garden Reverie",
                          "Golden Moments",
                        ][i % 5]
                      }
                    </span>
                  </div>
                  <div className="admin-order-list__right">
                    <strong>{money(o.total)}</strong>
                    <time dateTime={o.date}>{relativeLabel(o.date)}</time>
                    <span className={`admin-badge ${vis.className}`}>{vis.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="admin-panel admin-panel--products liquid-glass">
        <div className="admin-products-toolbar">
          <h3>Products</h3>
          <div className="admin-products-toolbar__controls">
            <input
              className="admin-products-search"
              placeholder="Search Products"
              value={productQ}
              onChange={(e) => setProductQ(e.target.value)}
            />
            <button type="button" className="admin-btn--ghost admin-btn--compact">
              Filter
            </button>
            <Link to="/admin/candles" className="admin-btn admin-btn--compact">
              + Add Product
            </Link>
          </div>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 36 }} />
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.slice(0, 6).map((p) => {
                const active = p.status === "available";
                return (
                  <tr key={`${p.category}-${p.id}`}>
                    <td>
                      <input
                        type="checkbox"
                        className="admin-check"
                        aria-label={`Select ${p.name}`}
                      />
                    </td>
                    <td>
                      <div className="admin-product-cell">
                        <img src={p.image} alt="" />
                        <strong>{p.name}</strong>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.price != null ? money(p.price) : "—"}</td>
                    <td>{active ? p.stock : 0}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          active ? "admin-badge--active" : "admin-badge--draft"
                        }`}
                      >
                        {active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <Link to={p.href} aria-label={`Open ${p.name}`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                            <path d="M14 4h6v6M20 4 11 13" strokeLinecap="round" />
                          </svg>
                        </Link>
                        <button type="button" aria-label={`More for ${p.name}`}>
                          ···
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
