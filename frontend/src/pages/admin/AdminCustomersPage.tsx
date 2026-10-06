import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import { money } from "./mockEcommerce";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await api.getCustomers();
      if (Array.isArray(data)) {
        setCustomers(data);
      }
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleToggleStatus = async (customerCode: string) => {
    try {
      setTogglingId(customerCode);
      const res = await api.toggleCustomerStatus(customerCode);
      setCustomers((prev) =>
        prev.map((c) =>
          c.customerCode === customerCode || c.id === customerCode
            ? { ...c, status: res.status }
            : c,
        ),
      );
    } catch (err) {
      console.error("Failed to toggle customer status:", err);
      alert("Failed to toggle status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const rows = useMemo(() => {
    return customers.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      const hay = `${c.name} ${c.email} ${c.location || ""} ${c.customerCode || c.id || ""}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [customers, q, status]);

  const active = customers.filter((c) => c.status === "active").length;
  const lifetimeSpent = customers.reduce((n, c) => n + (c.spent || 0), 0);

  return (
    <div className="admin-dash">
      <header className="admin-dash__head">
        <div>
          <p className="admin-kicker">Store Operations</p>
          <h2>Customers</h2>
          <p className="admin-sub">
            Real customer database — {active} active of {customers.length} total profiles
          </p>
        </div>
      </header>

      <div className="admin-kpi-grid admin-kpi-grid--3">
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Total Customers</p>
          <p className="admin-kpi__value">{customers.length}</p>
          <p className="admin-kpi__delta is-up">Active in MongoDB</p>
        </div>
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Active</p>
          <p className="admin-kpi__value">{active}</p>
          <p className="admin-kpi__delta is-up">Can place orders</p>
        </div>
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Lifetime Spent</p>
          <p className="admin-kpi__value">{money(lifetimeSpent)}</p>
          <p className="admin-kpi__delta is-up">Total revenue generated</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-search glass-input"
          placeholder="Search name, email, location…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="admin-chips">
          {(["all", "active", "inactive"] as const).map((s) => (
            <button
              key={s}
              type="button"
              className={`admin-chip glass-chip ${status === s ? "is-on" : ""}`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <section className="admin-panel liquid-glass">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Spent</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.customerCode || c.id || c.email}>
                  <td>
                    <div className="admin-user-cell">
                      <span className="admin-avatar" aria-hidden>
                        {c.name
                          .split(" ")
                          .map((p: string) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div>
                        <strong>{c.name}</strong>
                        <div className="admin-muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.location || "United States"}</td>
                  <td>{c.ordersCount || c.orders || 0}</td>
                  <td>{money(c.spent || 0)}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${c.status}`}>{c.status}</span>
                  </td>
                  <td>{c.joined ? String(c.joined).slice(0, 10) : "2026-01-01"}</td>
                  <td>
                    <button
                      type="button"
                      className="text-xs text-burgundy hover:underline font-medium"
                      disabled={togglingId === (c.customerCode || c.id)}
                      onClick={() => handleToggleStatus(c.customerCode || c.id)}
                    >
                      {c.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-taupe">
                    No customers found matching this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="admin-footnote">Real-time customer database synced with MongoDB Atlas.</p>
      </section>
    </div>
  );
}
