import { useMemo, useState } from "react";
import { demoCustomers, money } from "./mockEcommerce";

export default function AdminCustomersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const rows = useMemo(() => {
    return demoCustomers.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      const hay = `${c.name} ${c.email} ${c.location} ${c.id}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [q, status]);

  const active = demoCustomers.filter((c) => c.status === "active").length;

  return (
    <div className="admin-dash">
      <header className="admin-dash__head">
        <div>
          <p className="admin-kicker">Store</p>
          <h2>Customers</h2>
          <p className="admin-sub">
            User management demo — {active} active of {demoCustomers.length} profiles
          </p>
        </div>
      </header>

      <div className="admin-kpi-grid admin-kpi-grid--3">
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Customers</p>
          <p className="admin-kpi__value">{demoCustomers.length}</p>
          <p className="admin-kpi__delta is-up">Demo list</p>
        </div>
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Active</p>
          <p className="admin-kpi__value">{active}</p>
          <p className="admin-kpi__delta is-up">Can place orders</p>
        </div>
        <div className="admin-kpi liquid-glass liquid-glass-hover">
          <p className="admin-kpi__label">Lifetime spent</p>
          <p className="admin-kpi__value">
            {money(demoCustomers.reduce((n, c) => n + c.spent, 0))}
          </p>
          <p className="admin-kpi__delta is-up">Lifetime</p>
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
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="admin-user-cell">
                      <span className="admin-avatar" aria-hidden>
                        {c.name
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <div>
                        <strong>{c.name}</strong>
                        <div className="admin-muted">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.location}</td>
                  <td>{c.orders}</td>
                  <td>{money(c.spent)}</td>
                  <td>
                    <span className={`admin-badge admin-badge--${c.status}`}>{c.status}</span>
                  </td>
                  <td>{c.joined}</td>
                  <td>
                    <button type="button" className="admin-linkish" disabled title="Demo only">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="admin-footnote">
          Demo customer records for dashboard realism — not linked to auth/backend.
        </p>
      </section>
    </div>
  );
}
