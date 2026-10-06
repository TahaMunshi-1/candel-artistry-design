import { useState } from "react";
import { Link } from "react-router";
import { images, resolveImageUrl } from "../../constants/images";
import { useCatalog } from "../../catalog/CatalogContext";
import { useCart } from "../../context/CartContext";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { collections, paintings, cards } = useCatalog();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  // Flatten catalog items
  const candleItems = collections.flatMap((c) =>
    c.products.map((p) => ({
      id: p.id,
      name: p.name,
      category: `Candles • ${c.title}`,
      nomenclature: p.nomenclature,
      price: p.price ?? 24,
      image: p.image,
      href: `/candles/${c.slug}`,
      status: p.status,
    })),
  );

  const paintingItems = paintings.map((p) => ({
    id: p.id,
    name: p.name,
    category: "Oil Paintings",
    nomenclature: p.note,
    price: p.price ?? 450,
    image: p.image,
    href: "/paintings",
    status: p.status,
  }));

  const cardItems = cards.map((c) => ({
    id: c.id,
    name: c.name,
    category: "Greeting Cards",
    nomenclature: c.note,
    price: c.price ?? 12,
    image: c.image,
    href: "/greeting-cards",
    status: c.status,
  }));

  const allItems = [...candleItems, ...paintingItems, ...cardItems];

  const results = query.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          (item.nomenclature &&
            item.nomenclature.toLowerCase().includes(query.toLowerCase())),
      )
    : [];

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/40 bg-ivory shadow-2xl z-10 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
        <header className="flex items-center gap-3 border-b border-gold/25 px-6 py-4 bg-cream/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16.5 16.5 21 21" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            autoFocus
            className="w-full bg-transparent font-serif text-lg text-ink placeholder:text-taupe/60 outline-none"
            placeholder="Search fragrances, collections, paintings, cards…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="rounded-full p-2 text-taupe hover:text-burgundy"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-taupe space-y-2">
              <p className="font-serif text-base text-ink">Search the Candle Artistry Atelier</p>
              <p className="text-xs">
                Try searching for &quot;Serengeti&quot;, &quot;Vampire&quot;, &quot;Romance&quot;, &quot;Cinnamon&quot;, or &quot;Cards&quot;.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-taupe">
              <p className="font-serif text-base text-ink">No fragrances or works found</p>
              <p className="text-xs mt-1">Try another keyword or scent note.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-serif tracking-wider uppercase text-taupe">
                {results.length} {results.length === 1 ? "result" : "results"} found
              </p>
              {results.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-gold/20 bg-cream/40 p-3 hover:bg-champagne/40 transition-colors"
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <img
                      src={resolveImageUrl(item.image, images.candles)}
                      alt={item.name}
                      className="h-14 w-12 rounded-lg object-cover bg-champagne border border-gold/20 shrink-0"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = images.candles;
                      }}
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-medium text-ink truncate">
                        {item.name}
                      </h4>
                      <p className="text-[0.7rem] text-burgundy tracking-wide uppercase">
                        {item.category}
                      </p>
                      {item.nomenclature ? (
                        <p className="text-[0.68rem] text-taupe truncate">
                          {item.nomenclature}
                        </p>
                      ) : null}
                    </div>
                  </Link>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-serif text-sm text-ink font-semibold">
                      ${item.price}
                    </span>
                    {item.status === "available" ? (
                      <button
                        type="button"
                        className="rounded-full bg-gold px-3.5 py-1 text-[0.65rem] font-serif tracking-wider uppercase text-ivory hover:bg-burgundy transition-colors"
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            nomenclature: item.nomenclature,
                          });
                          onClose();
                        }}
                      >
                        Add
                      </button>
                    ) : (
                      <span className="text-[0.65rem] uppercase text-taupe">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
