import { Link } from "react-router";
import { images, resolveImageUrl } from "../../constants/images";
import { FloralCorner, BotanicalPetal } from "../decor/BotanicalAssets";
import { DiamondMark } from "../decor/Ornaments";
import { useCart } from "../../context/CartContext";

const cardsData = [
  {
    id: "card-garden-reverie",
    name: "Garden Reverie",
    image: images.card1,
    alt: "Greeting card — Garden Reverie with floral gold embossed foil",
    nomenclature: "Gold Foil Embossed • Luxury Envelope Included",
    price: 12,
  },
  {
    id: "card-moonlit-raven",
    name: "Moonlit Raven",
    image: images.card2,
    alt: "Greeting card — Moonlit Raven in enchanted night forest",
    nomenclature: "Gold Foil Embossed • Luxury Envelope Included",
    price: 12,
  },
  {
    id: "card-lantern-evening",
    name: "Lantern Evening",
    image: images.card3,
    alt: "Greeting card — Lantern Evening moonlit balcony with roses",
    nomenclature: "Gold Foil Embossed • Luxury Envelope Included",
    price: 12,
  },
  {
    id: "card-open-sky",
    name: "Open Sky",
    image: images.card4,
    alt: "Greeting card — Open Sky golden winged figure",
    nomenclature: "Gold Foil Embossed • Luxury Envelope Included",
    price: 12,
  },
];

export default function GreetingCardsGallery() {
  const { addToCart } = useCart();

  const handleAdd = (card: (typeof cardsData)[0]) => {
    addToCart({
      id: card.id,
      name: card.name,
      price: card.price,
      image: resolveImageUrl(card.image, images.cards),
      category: "Greeting Cards",
      nomenclature: card.nomenclature,
    });
  };

  return (
    <section
      id="experience-gallery"
      className="relative min-h-[680px] lg:min-h-[740px] flex items-center overflow-hidden bg-ivory py-14 md:py-18"
      aria-labelledby="greeting-cards-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at 50% 18%, #5c1018 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(160px,26vw)] opacity-[0.32] hidden md:block pointer-events-none"
      />
      <FloralCorner
        corner="tr"
        className="absolute right-0 top-0 w-[min(160px,26vw)] opacity-[0.32] hidden md:block pointer-events-none"
      />
      <FloralCorner
        corner="bl"
        className="absolute left-0 bottom-0 w-[min(130px,20vw)] opacity-[0.24] hidden lg:block pointer-events-none"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(130px,20vw)] opacity-[0.24] hidden lg:block pointer-events-none"
      />
      <BotanicalPetal
        className="absolute left-0 top-[42%] -translate-y-1/2 h-32 opacity-[0.24] hidden xl:block pointer-events-none"
        rotate={-10}
      />
      <BotanicalPetal
        className="absolute right-0 top-[42%] -translate-y-1/2 h-32 opacity-[0.24] hidden xl:block pointer-events-none"
        flip
        rotate={10}
      />

      <div className="container-editorial relative z-[1] w-full">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-eyebrow text-burgundy !tracking-[0.3em]">The Artistry</p>
          <h2
            id="greeting-cards-heading"
            className="mt-2 text-section text-ink tracking-[0.04em] font-light leading-tight"
          >
            Greeting Cards
          </h2>
          <div className="mt-2.5 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-10 bg-gold/45" />
            <DiamondMark className="h-1.5 w-1.5 shrink-0" />
            <div className="h-px w-10 bg-gold/45" />
          </div>
          <p className="mt-3 text-body text-taupe max-w-lg mx-auto text-[0.88rem] md:text-[0.95rem]">
            Illustrated storybook moments brought to heirloom-quality cards. Foil embossed on heavy textured stock, complete with matching artisan envelopes.
          </p>
        </div>

        {/* 4 Cards Showcase like Candle Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7 items-stretch">
          {cardsData.map((card) => (
            <article
              key={card.id}
              className="group flex flex-col rounded-2xl border border-gold/35 bg-[#fcf9f4] p-4 text-center shadow-[0_8px_24px_rgba(40,25,20,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_16px_36px_rgba(92,16,24,0.14)]"
            >
              {/* Card Image Container */}
              <Link to="/greeting-cards" className="block overflow-hidden rounded-xl bg-champagne/40 border border-gold/25 p-2">
                <img
                  src={resolveImageUrl(card.image, images.cards)}
                  alt={card.alt}
                  className="aspect-[3/4] w-full object-contain object-center drop-shadow-[0_8px_20px_rgba(64,51,43,0.18)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.cards;
                  }}
                />
              </Link>

              {/* Info */}
              <div className="mt-4 flex flex-col flex-1">
                <h3 className="font-serif text-[1.12rem] font-medium tracking-[0.06em] text-ink">
                  {card.name}
                </h3>
                <p className="mt-1.5 font-serif text-[0.78rem] text-taupe leading-snug">
                  {card.nomenclature}
                </p>
                <p className="mt-3 font-serif text-[1.15rem] tracking-[0.06em] text-ink font-semibold">
                  ${card.price.toFixed(2)}
                </p>

                {/* Add to Cart button */}
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => handleAdd(card)}
                    className="w-full inline-flex items-center justify-center bg-gold px-4 py-2 font-serif text-[0.68rem] tracking-[0.2em] uppercase text-ivory transition-colors duration-300 hover:bg-burgundy cursor-pointer rounded-full shadow-xs"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/greeting-cards"
            className="outline-btn !border-burgundy !text-burgundy hover:!bg-burgundy hover:!text-[#FBF8F2] shadow-xs"
          >
            Explore All Greeting Cards <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
