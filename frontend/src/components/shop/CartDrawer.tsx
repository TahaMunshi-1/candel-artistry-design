import { useEffect } from "react";
import { Link } from "react-router";
import { images, resolveImageUrl } from "../../constants/images";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    cartCount,
    cartSubtotal,
    cartShipping,
    cartTotal,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl z-10 border-l border-gold/30 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gold/25 px-6 py-5">
          <div>
            <h2 className="font-serif text-[1.15rem] tracking-[0.06em] text-ink uppercase">
              Your Atelier Bag
            </h2>
            <p className="text-[0.75rem] font-serif tracking-wider text-taupe">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-taupe hover:text-burgundy hover:bg-champagne/60 transition-colors"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-champagne/80 flex items-center justify-center text-gold mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 8.5h12l-.8 10.2a1.5 1.5 0 0 1-1.5 1.3H8.3a1.5 1.5 0 0 1-1.5-1.3L6 8.5Z" />
                  <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
                </svg>
              </div>
              <p className="font-serif text-[1.05rem] text-ink">Your bag is empty</p>
              <p className="mt-1.5 text-[0.82rem] text-taupe max-w-xs">
                Light your senses with our artisanal hand-poured candle collections.
              </p>
              <Link
                to="/candles"
                className="mt-6 inline-flex bg-gold px-6 py-2.5 font-serif text-[0.72rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors"
                onClick={closeCart}
              >
                Explore Candles
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="flex gap-4 border-b border-gold/15 pb-6 last:border-b-0"
              >
                <img
                  src={resolveImageUrl(item.image, images.candles)}
                  alt={item.name}
                  className="h-24 w-20 rounded-lg object-cover bg-champagne border border-gold/25 shrink-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = images.candles;
                  }}
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-[0.98rem] font-medium text-ink leading-snug">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        className="text-taupe hover:text-burgundy text-xs ml-2"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    {item.nomenclature ? (
                      <p className="text-[0.72rem] text-taupe line-clamp-1 mt-0.5">
                        {item.nomenclature}
                      </p>
                    ) : null}
                    <p className="mt-1 font-serif text-[0.92rem] text-ink font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gold/40 rounded-full px-2 py-0.5 text-xs bg-cream/50">
                      <button
                        type="button"
                        className="px-1.5 py-0.5 text-taupe hover:text-ink font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-2 font-medium text-ink">{item.quantity}</span>
                      <button
                        type="button"
                        className="px-1.5 py-0.5 text-taupe hover:text-ink font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 ? (
          <footer className="border-t border-gold/25 bg-cream/40 p-6 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-taupe">
                <span>Subtotal</span>
                <span className="text-ink font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-taupe">
                <span>Estimated Shipping</span>
                <span className="text-ink font-medium">
                  {cartShipping === 0 ? "Free" : `$${cartShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-serif text-[1.1rem] text-ink font-semibold pt-2 border-t border-gold/20">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-gold py-3.5 font-serif text-[0.78rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-colors duration-300 shadow-md"
              onClick={openCheckout}
            >
              Proceed to Checkout →
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
