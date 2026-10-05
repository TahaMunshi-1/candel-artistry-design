import { useMemo, useState } from "react";
import { demoOrders, money, type OrderStatus } from "./mockEcommerce";

const filters: Array<"all" | OrderStatus> = [
  "all",
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    return demoOrders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      const hay = `${o.id} ${o.customer} ${o.email}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [filter, q]);

  const totals = {
    count: rows.length,
    revenue: rows.reduce((n, o) => n + (o.status === "cancelled" ? 0 : o.total), 0),
  };

  return (
    <div className="admin-dash">
      <header className="admin-dash__head">
        <div>
          <p className="admin-kicker">Store</p>
          <h2>Orders</h2>
          <p className="admin-sub">
            Demo order queue — {totals.count} shown · {money(totals.revenue)} non-cancelled
          </p>
        </div>
      </header>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Search order, customer, email…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="admin-chips">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`admin-chip ${filter === f ? "is-on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td>
                    <strong>{o.id}</strong>
                  </td>
                  <td>
                    {o.customer}
                    <div className="admin-muted">{o.email}</div>
                  </td>
                  <td>{o.items}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${o.status}`}>{o.status}</span>
                  </td>
                  <td>{o.channel}</td>
                  <td>{o.date}</td>
                  <td>{money(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="admin-footnote">Frontend dummy data — not connected to a payment backend.</p>
      </section>
    </div>
  );
}
