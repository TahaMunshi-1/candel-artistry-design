import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import { money, type OrderStatus } from "./mockEcommerce";

const filters: Array<"all" | OrderStatus> = [
  "all",
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      await api.updateOrderStatus(orderId, nextStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: nextStatus } : o)),
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const rows = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      const hay = `${o.id || o.orderNumber} ${o.customer} ${o.email}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [orders, filter, q]);

  const totals = {
    count: rows.length,
    revenue: rows.reduce((n, o) => n + (o.status === "cancelled" ? 0 : o.total), 0),
  };

  return (
    <div className="admin-dash">
      <header className="admin-dash__head">
        <div>
          <p className="admin-kicker">Store Operations</p>
          <h2>Orders</h2>
          <p className="admin-sub">
            Live order queue — {totals.count} shown · {money(totals.revenue)} non-cancelled revenue
          </p>
        </div>
      </header>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Search order #, customer, email…"
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

      <section className="admin-panel liquid-glass">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id || o.orderNumber}>
                  <td>
                    <strong>#{o.id || o.orderNumber}</strong>
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
                  <td>
                    <select
                      className="text-xs bg-cream/80 border border-gold/40 rounded px-1.5 py-1 text-ink focus:outline-none"
                      value={o.status}
                      disabled={updatingId === (o.id || o.orderNumber)}
                      onChange={(e) =>
                        handleStatusChange(o.id || o.orderNumber, e.target.value as OrderStatus)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-taupe">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="admin-footnote">Real-time store orders connected with MongoDB Atlas.</p>
      </section>
    </div>
  );
}
