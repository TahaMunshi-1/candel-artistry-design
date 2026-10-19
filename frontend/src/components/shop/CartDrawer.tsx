import { useEffect, useState } from "react";
import { Link } from "react-router";
import { images, resolveImageUrl } from "../../constants/images";
import { useCart } from "../../context/CartContext";
import { DiamondMark } from "../decor/Ornaments";

const FREE_SHIPPING_THRESHOLD = 75;

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

  const [giftNoteOpen, setGiftNoteOpen] = useState(false);
  const [giftNote, setGiftNote] = useState("");

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

  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cartSubtotal,
  );

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="relative flex h-full w-full max-w-md flex-col bg-[#FAF7F2] shadow-[-20px_0_50px_rgba(20,5,5,0.25)] z-10 border-l border-gold/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="border-b border-gold/30 bg-champagne/40 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-gold mb-1">
                <DiamondMark className="h-2 w-2" />
                <span className="font-serif text-[0.66rem] uppercase tracking-[0.24em] text-burgundy font-medium">
                  Candle Artistry Design
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-serif text-[1.25rem] tracking-[0.06em] text-ink uppercase font-light">
                  Your Atelier Bag
                </h2>
                <span className="rounded-full bg-champagne px-2.5 py-0.5 font-serif text-[0.72rem] tracking-wider text-burgundy border border-gold/40">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="rounded-full p-2 text-taupe hover:text-burgundy hover:bg-champagne/80 transition-all duration-200 border border-transparent hover:border-gold/30 cursor-pointer"
              onClick={closeCart}
              aria-label="Close cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {items.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-gold/20">
              <div className="flex items-center justify-between text-[0.74rem] font-serif">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-taupe">
                    Add{" "}
                    <strong className="text-burgundy font-semibold">
                      ${remainingForFreeShipping.toFixed(2)}
                    </strong>{" "}
                    for Free Atelier Shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span>✨</span> Complimentary Atelier Shipping Unlocked!
                  </span>
                )}
                <span className="text-gold font-medium">{progressPercent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-champagne/80 ring-1 ring-gold/25">
                <div
                  className="h-full bg-gradient-to-r from-gold via-burgundy to-gold transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-champagne/70 border border-gold/40 flex items-center justify-center text-gold mb-5 shadow-sm">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M6 8.5h12l-.8 10.2a1.5 1.5 0 0 1-1.5 1.3H8.3a1.5 1.5 0 0 1-1.5-1.3L6 8.5Z" />
                  <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
                </svg>
              </div>
              <h3 className="font-serif text-[1.18rem] text-ink font-light">
                Your Atelier Bag is Empty
              </h3>
              <p className="mt-2 text-[0.82rem] text-taupe max-w-xs font-serif leading-relaxed">
                Light your sanctuary with hand-poured artisan soy candles crafted with pure love in California.
              </p>
              <Link
                to="/candles"
                className="mt-6 inline-flex bg-gold px-7 py-3 font-serif text-[0.72rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-colors duration-300 shadow-sm"
                onClick={closeCart}
              >
                Discover Collections →
              </Link>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const productPath =
                  item.category === "Greeting Cards"
                    ? `/greeting-cards/${item.productId || item.id}`
                    : `/product/${item.productId || item.id}`;

                return (
                  <article
                    key={item.id}
                    className="group relative flex gap-4 rounded-xl border border-gold/30 bg-ivory p-3.5 shadow-sm transition-all duration-200 hover:border-gold/60 hover:shadow-md"
                  >
                    {/* Thumbnail Link */}
                    <Link
                      to={productPath}
                      onClick={closeCart}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-champagne ring-1 ring-gold/30"
                      title={`View ${item.name}`}
                    >
                      <img
                        src={resolveImageUrl(item.image, images.candles)}
                        alt={item.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = images.candles;
                        }}
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-[1rem] font-medium text-ink leading-snug">
                            <Link
                              to={productPath}
                              onClick={closeCart}
                              className="hover:text-burgundy transition-colors"
                            >
                              {item.name}
                            </Link>
                          </h4>
                          <button
                            type="button"
                            className="text-taupe/70 hover:text-burgundy p-1 text-xs transition-colors cursor-pointer"
                            onClick={() => removeFromCart(item.id)}
                            title="Remove creation"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {item.nomenclature ? (
                          <p className="text-[0.72rem] text-taupe/90 font-serif italic line-clamp-1 mt-0.5">
                            {item.nomenclature}
                          </p>
                        ) : null}

                        <p className="mt-1 font-serif text-[0.82rem] text-taupe">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Bottom row: Quantity pill and item line total */}
                      <div className="flex items-center justify-between pt-2 border-t border-gold/15 mt-2">
                        <div className="flex items-center rounded-full border border-gold/45 bg-champagne/40 px-2 py-0.5">
                          <button
                            type="button"
                            className="px-2 py-0.5 text-taupe hover:text-ink font-bold text-sm cursor-pointer transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-2.5 font-serif text-[0.88rem] font-medium text-ink min-w-[1.4rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2 py-0.5 text-taupe hover:text-ink font-bold text-sm cursor-pointer transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-[1rem] font-semibold text-ink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Complimentary Handwritten Gift Note Option */}
              <div className="rounded-xl border border-gold/30 bg-champagne/25 p-3.5 transition-colors">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left font-serif text-[0.82rem] tracking-wider text-burgundy uppercase font-medium cursor-pointer"
                  onClick={() => setGiftNoteOpen(!giftNoteOpen)}
                >
                  <span className="flex items-center gap-1.5">
                    <span>🎁</span> Complimentary Gift Note
                  </span>
                  <span className="text-gold font-bold">{giftNoteOpen ? "−" : "+"}</span>
                </button>
                {giftNoteOpen && (
                  <div className="mt-2.5 pt-2 border-t border-gold/20 animate-in fade-in duration-200">
                    <p className="text-[0.74rem] text-taupe font-serif mb-2">
                      We will handwrite your message on an embossed Atelier enclosure card.
                    </p>
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personal gift message here..."
                      rows={3}
                      className="w-full rounded-lg border border-gold/40 bg-ivory px-3 py-2 text-[0.82rem] font-serif text-ink placeholder:text-taupe/60 focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 ? (
          <footer className="border-t border-gold/30 bg-champagne/50 p-6 space-y-4">
            <div className="space-y-2 text-sm font-serif">
              <div className="flex justify-between text-taupe">
                <span>Subtotal</span>
                <span className="text-ink font-medium font-serif">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-taupe">
                <span>Estimated Shipping</span>
                <span className="text-ink font-medium">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `$${cartShipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-taupe text-[0.78rem]">
                <span>Sales Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-serif text-[1.22rem] text-ink font-semibold pt-2.5 border-t border-gold/25">
                <span>Total</span>
                <span className="text-burgundy">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action CTA */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#5c1018] py-4 px-6 font-serif text-[0.78rem] tracking-[0.22em] uppercase text-ivory hover:bg-[#721520] transition-colors duration-300 shadow-lg cursor-pointer border border-gold/40"
              onClick={openCheckout}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Proceed to Checkout →</span>
            </button>

            {/* Reassurance Badges */}
            <div className="pt-2 grid grid-cols-3 gap-1 text-center border-t border-gold/20">
              <div className="text-[0.66rem] font-serif text-taupe">
                🌿 Pure Soy Wax
              </div>
              <div className="text-[0.66rem] font-serif text-taupe">
                🛡️ Handcrafted in CA
              </div>
              <div className="text-[0.66rem] font-serif text-taupe">
                🔒 Secure Checkout
              </div>
            </div>

            <p className="text-center text-[0.64rem] font-serif text-taupe/90 italic pt-1">
              Supreme Artisanal Quality · All Sales Final (No Refunds)
            </p>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={closeCart}
                className="text-[0.72rem] font-serif uppercase tracking-[0.18em] text-taupe hover:text-burgundy transition-colors cursor-pointer"
              >
                ← Continue Shopping
              </button>
            </div>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
