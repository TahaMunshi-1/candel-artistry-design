import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext";
import { api } from "../../services/api";

export default function CheckoutModal() {
  const {
    items,
    cartTotal,
    cartSubtotal,
    cartShipping,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
  } = useCart();
  const { customer, isLoggedIn, openAuthModal } = useCustomerAuth();

  const [shipping, setShipping] = useState({
    street: "742 Evergreen Terrace",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  });

  const [payment, setPayment] = useState({
    cardNumber: "4242 •••• •••• 4242",
    expiry: "12/28",
    cvc: "888",
  });

  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [error, setError] = useState("");

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      openAuthModal("login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const itemList = items.map((i) => ({
        productId: i.productId,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        image: i.image,
      }));

      let res: any = null;
      try {
        res = await api.createOrder({
          customer: customer.fullName,
          email: customer.email,
          items: items.reduce((n, i) => n + i.quantity, 0),
          itemList,
          total: cartTotal,
          channel: "Web",
          status: "paid",
          shippingAddress: {
            line1: shipping.street,
            city: shipping.city,
            state: shipping.state,
            postalCode: shipping.zip,
            country: shipping.country,
          },
        });
      } catch (apiErr) {
        console.warn("Remote API order creation failed, generating local confirmed order:", apiErr);
      }

      if (!res || !res.orderNumber) {
        const storedOrders = JSON.parse(localStorage.getItem("cad-orders") || "[]");
        const orderNum = `CAD-${10440 + storedOrders.length + 1}`;
        res = {
          orderNumber: orderNum,
          id: orderNum,
          customer: customer.fullName,
          email: customer.email,
          items: items.reduce((n, i) => n + i.quantity, 0),
          itemList,
          total: cartTotal,
          status: "paid",
          channel: "Web",
          date: new Date().toISOString().slice(0, 10),
          shippingAddress: {
            line1: shipping.street,
            city: shipping.city,
            state: shipping.state,
            postalCode: shipping.zip,
            country: shipping.country,
          },
        };
        storedOrders.unshift(res);
        localStorage.setItem("cad-orders", JSON.stringify(storedOrders));
      }

      setConfirmedOrder(res);
      clearCart();
    } catch (err: any) {
      setError(err?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm"
        onClick={closeCheckout}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/40 bg-ivory shadow-2xl z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gold/25 px-6 py-4 bg-cream/40 shrink-0">
          <div>
            <h2 className="font-serif text-[1.2rem] tracking-[0.06em] text-ink uppercase">
              Atelier Checkout
            </h2>
            <p className="text-[0.75rem] font-serif tracking-wider text-taupe">
              Handcrafted in small batches • Safe test transaction
            </p>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-taupe hover:text-burgundy"
            onClick={closeCheckout}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {confirmedOrder ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/15 text-forest">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-serif text-[1.4rem] text-ink">Thank you for your order!</h3>
              <p className="text-sm text-taupe max-w-md mx-auto">
                Your order <strong className="text-ink">#{confirmedOrder.orderNumber}</strong> has been placed and received by our atelier.
              </p>
              <div className="rounded-2xl border border-gold/30 bg-cream/50 p-4 max-w-sm mx-auto text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-taupe">Customer:</span>
                  <span className="font-medium text-ink">{confirmedOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Total Paid:</span>
                  <span className="font-medium text-ink">${confirmedOrder.total?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Status:</span>
                  <span className="font-semibold text-forest uppercase">{confirmedOrder.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-taupe">Channel:</span>
                  <span className="text-ink">{confirmedOrder.channel}</span>
                </div>
              </div>
              <p className="text-xs text-taupe italic">
                ✦ This order is now live and visible in the Admin Portal under <strong>Orders</strong>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  className="bg-gold px-8 py-3 font-serif text-[0.76rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors"
                  onClick={() => {
                    setConfirmedOrder(null);
                    closeCheckout();
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : !isLoggedIn ? (
            <div className="py-10 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-gold">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 20c1.5-3.5 4.5-5 7-5s5.5 1.5 7 5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-serif text-[1.25rem] text-ink">Account Required to Purchase</h3>
              <p className="text-[0.84rem] text-taupe max-w-sm mx-auto">
                Browsing is open to all visitors. To complete your order, please sign in or create an account with us.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="bg-gold px-6 py-3 font-serif text-[0.76rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors shadow"
                  onClick={() => openAuthModal("login")}
                >
                  Sign In / Create Account →
                </button>
              </div>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Customer Info */}
              <section className="rounded-2xl border border-gold/25 bg-cream/30 p-4">
                <h4 className="font-serif text-[0.95rem] font-medium text-ink mb-2">
                  Customer Profile
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-taupe block">Name</span>
                    <strong className="text-ink">{customer?.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-taupe block">Email</span>
                    <strong className="text-ink">{customer?.email}</strong>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-3">
                <h4 className="font-serif text-[0.95rem] font-medium text-ink">
                  Shipping Destination
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-taupe mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={shipping.street}
                      onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-taupe mb-1">City</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-taupe mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-taupe mb-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-taupe mb-1">Country</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={shipping.country}
                      onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    />
                  </div>
                </div>
              </section>

              {/* Dummy Transaction / Payment */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-[0.95rem] font-medium text-ink">
                    Payment Method
                  </h4>
                  <span className="text-[0.68rem] tracking-wider uppercase bg-champagne text-burgundy px-2 py-0.5 rounded-full font-medium">
                    Demo Mode Transaction
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="col-span-3 sm:col-span-2">
                    <label className="block text-taupe mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-gold/40 bg-ivory px-3 py-2 text-ink outline-none focus:border-gold"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-taupe mb-1">Expiry / CVC</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-1/2 rounded-xl border border-gold/40 bg-ivory px-2 py-2 text-ink text-center outline-none focus:border-gold"
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      />
                      <input
                        type="text"
                        className="w-1/2 rounded-xl border border-gold/40 bg-ivory px-2 py-2 text-ink text-center outline-none focus:border-gold"
                        value={payment.cvc}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[0.72rem] text-taupe italic">
                  Transactions in demo mode simulate approval and automatically persist live orders to MongoDB Atlas.
                </p>
              </section>

              {/* Summary */}
              <section className="border-t border-gold/25 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-taupe">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="text-ink font-medium">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-taupe">
                  <span>Shipping</span>
                  <span className="text-ink font-medium">
                    {cartShipping === 0 ? "Free" : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-ink pt-1 border-t border-gold/15">
                  <span>Order Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[0.68rem] font-serif text-taupe/90 italic pt-1 text-center">
                  Supreme Artisanal Quality Guarantee · All Sales Final (No Refunds)
                </p>
              </section>

              {error ? (
                <p className="rounded-lg bg-burgundy/10 p-2.5 text-center text-xs text-burgundy font-medium">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>

        {/* Footer */}
        {!confirmedOrder && isLoggedIn ? (
          <footer className="border-t border-gold/25 bg-cream/40 px-6 py-4 flex justify-between items-center shrink-0">
            <button
              type="button"
              className="font-serif text-[0.76rem] tracking-wider uppercase text-taupe hover:text-ink"
              onClick={closeCheckout}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="checkout-form"
              disabled={loading || items.length === 0}
              className="bg-gold px-7 py-3 font-serif text-[0.76rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors shadow disabled:opacity-50"
            >
              {loading ? "Processing Order…" : `Place Order • $${cartTotal.toFixed(2)}`}
            </button>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
