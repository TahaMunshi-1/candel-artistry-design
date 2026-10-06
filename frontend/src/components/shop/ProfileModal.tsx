import { useEffect, useState } from "react";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { api } from "../../services/api";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { customer, logout } = useCustomerAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && customer?.email) {
      setLoading(true);
      api.getOrders({ keyword: customer.email })
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          }
        })
        .catch(() => setOrders([]))
        .finally(() => setLoading(false));
    }
  }, [isOpen, customer?.email]);

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gold/40 bg-ivory shadow-2xl z-10 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <header className="flex items-center justify-between border-b border-gold/25 px-6 py-4 bg-cream/30">
          <div>
            <h2 className="font-serif text-[1.15rem] tracking-[0.06em] text-ink uppercase">
              Customer Profile
            </h2>
            <p className="text-[0.72rem] text-taupe font-serif">
              Connected with Atelier Account
            </p>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-taupe hover:text-burgundy"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* User badge */}
          <div className="flex items-center gap-4 rounded-2xl border border-gold/30 bg-cream/50 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 text-burgundy font-serif font-bold text-lg">
              {customer.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-[1.1rem] font-medium text-ink truncate">
                {customer.fullName}
              </h3>
              <p className="text-xs text-taupe truncate">{customer.email}</p>
              <span className="mt-1 inline-block rounded-full bg-forest/15 px-2 py-0.5 text-[0.65rem] font-semibold text-forest uppercase tracking-wider">
                Active Member
              </span>
            </div>
          </div>

          {/* Past Orders */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ink">
                Order History
              </h4>
              <span className="text-xs text-taupe">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {loading ? (
              <p className="text-xs text-taupe py-4 text-center">Loading orders from database…</p>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gold/30 p-6 text-center text-xs text-taupe">
                No orders placed yet. Add items to your bag and complete checkout!
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <article
                    key={o.id || o.orderNumber}
                    className="rounded-2xl border border-gold/25 bg-cream/30 p-3.5 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-ink">#{o.id || o.orderNumber}</strong>
                        <span className="text-taupe block text-[0.68rem]">{o.date}</span>
                      </div>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase ${
                        o.status === "delivered" || o.status === "paid" ? "bg-forest/15 text-forest" : "bg-gold/20 text-burgundy"
                      }`}>
                        {o.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-taupe pt-1 border-t border-gold/15">
                      <span>{o.items} {o.items === 1 ? "item" : "items"}</span>
                      <strong className="text-ink font-semibold">${o.total?.toFixed(2)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-gold/25 bg-cream/40 px-6 py-3.5 flex justify-between items-center">
          <button
            type="button"
            className="text-xs uppercase tracking-wider text-burgundy font-semibold hover:underline"
            onClick={() => {
              logout();
              onClose();
            }}
          >
            Sign Out
          </button>
          <button
            type="button"
            className="bg-gold px-5 py-2 font-serif text-[0.7rem] tracking-wider uppercase text-ivory hover:bg-burgundy transition-colors"
            onClick={onClose}
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}
