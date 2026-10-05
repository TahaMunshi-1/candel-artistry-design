import { categoryShare, money, salesSeries, topProducts, demoOrders } from "./mockEcommerce";
import { useCatalog } from "../../catalog/CatalogContext";
import { Link } from "react-router";

function RevenueChart() {
  const max = Math.max(...salesSeries.map((p) => p.revenue));
  const w = 560;
  const h = 180;
  const pad = 16;
  const points = salesSeries.map((p, i) => {
    const x = pad + (i * (w - pad * 2)) / (salesSeries.length - 1);
    const y = h - pad - (p.revenue / max) * (h - pad * 2);
    return `${x},${y}`;
  });
  const area = `M${pad},${h - pad} L${points.join(" L")} L${w - pad},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="admin-chart" role="img" aria-label="Revenue trend">
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4a574" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c4a574" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={w - pad}
          y1={pad + t * (h - pad * 2)}
          y2={pad + t * (h - pad * 2)}
          className="admin-chart__grid"
        />
      ))}
      <path d={area} fill="url(#revFill)" />
      <polyline
        fill="none"
        stroke="#c4a574"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points.join(" ")}
      />
      {salesSeries.map((p, i) => {
        const x = pad + (i * (w - pad * 2)) / (salesSeries.length - 1);
        const y = h - pad - (p.revenue / max) * (h - pad * 2);
        return <circle key={p.label} cx={x} cy={y} r="3.5" fill="#f7f1e7" stroke="#c4a574" strokeWidth="2" />;
      })}
    </svg>
  );
}

function OrdersBars() {
  const max = Math.max(...salesSeries.map((p) => p.orders));
  return (
    <div className="admin-bars" aria-label="Orders by month">
      {salesSeries.slice(-8).map((p) => (
        <div key={p.label} className="admin-bars__col">
          <div
            className="admin-bars__bar"
            style={{ height: `${Math.max(8, (p.orders / max) * 100)}%` }}
            title={`${p.orders} orders`}
          />
          <span>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  const total = categoryShare.reduce((n, c) => n + c.value, 0);
  let acc = 0;
  const stops = categoryShare.map((c) => {
    const start = (acc / total) * 100;
    acc += c.value;
    const end = (acc / total) * 100;
    return `${c.color} ${start}% ${end}%`;
  });

  return (
    <div className="admin-donut-wrap">
      <div
        className="admin-donut"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
        aria-hidden
      />
      <ul className="admin-donut-legend">
        {categoryShare.map((c) => (
          <li key={c.label}>
            <span style={{ background: c.color }} />
            {c.label}
            <strong>{c.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminOverviewPage() {
  const { collections, paintings, cards } = useCatalog();
  const candleCount = collections.reduce((n, c) => n + c.products.length, 0);
  const revenue = salesSeries.reduce((n, p) => n + p.revenue, 0);
  const orders = salesSeries.reduce((n, p) => n + p.orders, 0);
  const aov = revenue / orders;

  const kpis = [
    { label: "Revenue (YTD)", value: money(revenue), delta: "+12.4%", up: true },
    { label: "Orders", value: String(orders), delta: "+8.1%", up: true },
    { label: "Avg. order value", value: money(aov), delta: "+3.2%", up: true },
    { label: "Catalog SKUs", value: String(candleCount + paintings.length + cards.length), delta: "Live", up: true },
  ];

  return (
    <div className="admin-dash">
      <header className="admin-dash__head">
        <div>
          <p className="admin-kicker">Overview</p>
          <h2>Store dashboard</h2>
          <p className="admin-sub">
            Dummy ecommerce metrics for demos — wired for a future live store.
          </p>
        </div>
        <div className="admin-dash__actions">
          <Link to="/admin/orders" className="admin-btn admin-btn--ghost">
            View orders
          </Link>
          <Link to="/admin/candles" className="admin-btn">
            Manage catalog
          </Link>
        </div>
      </header>

      <div className="admin-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="admin-kpi">
            <p className="admin-kpi__label">{k.label}</p>
            <p className="admin-kpi__value">{k.value}</p>
            <p className={`admin-kpi__delta ${k.up ? "is-up" : ""}`}>{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="admin-dash-grid">
        <section className="admin-panel admin-panel--wide">
          <div className="admin-panel__head">
            <h3>Revenue</h3>
            <span>Last 10 months</span>
          </div>
          <RevenueChart />
          <div className="admin-chart-labels">
            {salesSeries.map((p) => (
              <span key={p.label}>{p.label}</span>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <h3>Sales mix</h3>
            <span>By category</span>
          </div>
          <Donut />
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <h3>Orders volume</h3>
            <span>Recent months</span>
          </div>
          <OrdersBars />
        </section>

        <section className="admin-panel admin-panel--wide">
          <div className="admin-panel__head">
            <h3>Recent orders</h3>
            <Link to="/admin/orders">See all</Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Channel</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {demoOrders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td>
                      <strong>{o.id}</strong>
                      <div className="admin-muted">{o.date}</div>
                    </td>
                    <td>
                      {o.customer}
                      <div className="admin-muted">{o.email}</div>
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--${o.status}`}>{o.status}</span>
                    </td>
                    <td>{o.channel}</td>
                    <td>{money(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__head">
            <h3>Top products</h3>
            <span>Units sold</span>
          </div>
          <ul className="admin-rank">
            {topProducts.map((p, i) => (
              <li key={p.name}>
                <span className="admin-rank__n">{i + 1}</span>
                <div>
                  <strong>{p.name}</strong>
                  <div className="admin-muted">{p.sold} sold</div>
                </div>
                <span>{p.revenue ? money(p.revenue) : "—"}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
