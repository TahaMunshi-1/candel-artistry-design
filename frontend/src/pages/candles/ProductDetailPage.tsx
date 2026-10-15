import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";
import { useCart } from "../../context/CartContext";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { images, resolveImageUrl } from "../../constants/images";
import { CandleProductCard, GalleryProductCard } from "../../components/shop/ProductCard";
import type { CandleCollection, CandleProduct, GalleryItem } from "../../constants/catalog";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Curated fragrance and storytelling narratives for all catalog products
const candleNarratives: Record<string, string> = {
  bailando:
    "An intimate sensory dance inspired by late twilight in warm Havana salons. Bailando marries festive spiced clove warmth with sun-ripened orchard pear and caramelized golden sugar. It crafts an atmosphere of romance, joy, and celebration that lingers long after the flame is extinguished.",
  "serengeti-gold":
    "Capturing the golden majesty of the African plains at dusk. Serengeti Gold opens with sparkling citrus bursts of sun-drenched tangerine and bright lemon peel, melting into golden tropical pineapple and radiant earth for a bright, uplifting sanctuary.",
  "night-mood":
    "Sensual midnight blooms wrapped in the calm of dark hours. Silky night-blooming jasmine intertwined with warm dark amber and rich vanilla bean, setting an alluring mood for tender conversations, quiet music, and evening serenity.",
  "lady-in-the-rain":
    "A refreshing olfactory portrait of quiet rain falling over lush gardens. Crisp kaffir lime and chilled summer cantaloupe blend effortlessly with dewy bamboo shoots and crisp green foliage, bringing peace and rejuvenation to any room.",
  "storied-day":
    "The cozy nostalgia of aged literature, rich roasted coffee, and timeless memories. Freshly brewed espresso harmonizes with velvety tonka bean, amber resins, and the scent of crisp printed pages.",
  "the-awakening":
    "A nocturnal reverie charged with intrigue. Deep aged oak timber and moody forest greenery meet exotic lush palm and sweet vanilla undertones, cultivating an elegant and darkly romantic sanctuary.",
  "velvet-kiss":
    "An intoxicating whisper of velvet shadows. Deep damask rose petals steeped in ripe black currant and dark smoked plum evoke passionate glances and midnight desire.",
  "crimson-veil":
    "An enigmatic balance of sweet garden basil, ruby red grapefruit, delicate heirloom rose petals, and warm sensual musk. Refreshing yet intimate, delicate yet profound.",
  "hypnotic-host":
    "Smoky elegance with commanding allure. Rich charred agarwood (oud), dark blood orange zest, and resinous cedarwood combine to create a mesmerizing, hypnotic aroma.",
  tumbleweed:
    "The untamed spirit of the open frontier. Sun-warmed sagebrush, wild prairie sweetgrass, and golden glowing amber that echo the quiet majesty of open skies and warm canyon winds.",
  "home-sweet-home":
    "The soothing comfort of cherished beginnings. Delicate tea rose petals, aromatic carved cedarwood, and rich sun-warmed earth evoke the safety and warmth of home.",
  "leather-and-lace":
    "A daring union of rugged craftsmanship and soft delicacy. Hand-worked equestrian leather juxtaposed with warm ground nutmeg, bright lemon zest, and Ceylon cinnamon.",
  "eight-seconds":
    "The electrifying thrill of the rodeo arena. Weathered saddle leather, aromatic cured tobacco leaf, and crisp golden birch wood captured in radiant soy wax.",
  "savannah-dawn":
    "First sunlight breaking across boundless golden plains. Fragrant wild acacia blooms, radiant warmth, and golden dried savanna grass herald a brand new beginning.",
  "jambo-light":
    "A vibrant, energizing celebration of light and life. Fresh crushed garden spearmint leaves, vibrant tropical greenery, and spiced ginger root awaken your senses.",
  indlamu:
    "An ode to joyful rhythm and timeless heritage. Sweet orchard peach and powdered violet blossoms grounded in creamy, meditative Mysore sandalwood.",
  "sacred-horizon":
    "Ancient tranquility under an endless starry sky. Reverent baobab bark, smooth Madagascar vanilla, and sacred frankincense resins for quiet meditation.",
  "yosemite-might":
    "The majestic stillness of towering granite monoliths. Aromatic red cedar, grounding sandalwood, and earthy woodland musk inspired by the cathedral peaks of Yosemite.",
  "winter-silence":
    "The peaceful hush of first snowfall over alpine meadows. Crisp clean linen, fragrant orange blossoms, and calming creamy sandalwood.",
  "wild-equine":
    "Untamed grace roaming through mountain valleys. Sweet golden mountain meadows, crushed pine needles, and fresh wild clover in pure morning sunlight.",
  "gilded-birch":
    "Crisp alpine altitude meets warm autumn light. Chilled mountain air, golden sun-warmed birch bark, and rich forest timber.",
  "golden-moment":
    "Golden nostalgic honey poured into light. Sweet honeycomb, comforting bakery spices, and warm golden amber that feel like coming home.",
  "sunday-morning":
    "The unhurried peace of morning sunlight through sheer curtains. Soft fluttering petals, fresh golden morning light, and pure blooming sweet jasmine.",
};

const cardNarratives: Record<string, string> = {
  "card-garden-reverie":
    "An enchanted garden tableau featuring delicate botanical illustrations and shimmering gold foil detailing. Printed on heavy 350gsm archival cotton stock, ready to carry your heartfelt words.",
  "card-moonlit-raven":
    "A striking gothic nocturnal illustration capturing the mysterious beauty of nightfall. Embossed with fine metallic foil and paired with a luxury matching envelope.",
  "card-lantern-evening":
    "A warm, inviting scene of hand-lit lanterns illuminating twilight gardens. Designed to bring warmth and sincere affection to birthdays, anniversaries, or special milestones.",
  "card-open-sky":
    "Boundless skies and poetic horizons illustrated in rich artistic detail. Blank inside for personalized handwritten love letters or thoughtful notes.",
};

export default function ProductDetailPage() {
  const { collectionSlug, productSlug } = useParams<{
    collectionSlug?: string;
    productSlug?: string;
  }>();
  const { collections, cards } = useCatalog();
  const { addToCart, openCheckout } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("notes");

  // Determine target slug
  const targetSlug = productSlug || collectionSlug || "";

  // 1. Check candles
  let candle: (CandleProduct & { collection: CandleCollection }) | null = null;
  for (const col of collections) {
    if (collectionSlug && col.slug !== collectionSlug) continue;
    const match = col.products.find(
      (p) =>
        p.slug === targetSlug ||
        p.id === targetSlug ||
        slugify(p.name) === targetSlug,
    );
    if (match) {
      candle = { ...match, collection: col };
      break;
    }
  }

  // Fallback search in all collections if not found with collectionSlug filter
  if (!candle && collectionSlug) {
    for (const col of collections) {
      const match = col.products.find(
        (p) =>
          p.slug === targetSlug ||
          p.id === targetSlug ||
          slugify(p.name) === targetSlug,
      );
      if (match) {
        candle = { ...match, collection: col };
        break;
      }
    }
  }

  // 2. Check greeting cards
  let card: GalleryItem | null = null;
  if (!candle) {
    const cardMatch = cards.find(
      (c) =>
        c.id === targetSlug ||
        slugify(c.name) === targetSlug ||
        c.id.replace("card-", "") === targetSlug,
    );
    if (cardMatch) {
      card = cardMatch;
    }
  }

  // If neither found
  if (!candle && !card) {
    return (
      <ShopPageShell>
        <div className="container-editorial py-24 text-center">
          <p className="text-eyebrow text-burgundy">Catalog</p>
          <h1 className="mt-3 text-section font-serif text-ink font-light">
            Creation Not Found
          </h1>
          <p className="mt-4 text-taupe max-w-md mx-auto">
            The artisanal piece you are seeking may have retired to our archives or been moved.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/candles"
              className="inline-flex items-center bg-gold px-6 py-3 font-serif text-[0.72rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors"
            >
              Explore Collections
            </Link>
            <Link
              to="/greeting-cards"
              className="inline-flex items-center border border-gold/60 px-6 py-3 font-serif text-[0.72rem] tracking-[0.2em] uppercase text-ink hover:bg-champagne/40 transition-colors"
            >
              Greeting Cards
            </Link>
          </div>
        </div>
      </ShopPageShell>
    );
  }

  const isCandle = Boolean(candle);
  const name = isCandle ? candle!.name : card!.name;
  const price = (isCandle ? candle!.price : card!.price) ?? (isCandle ? 24 : 12);
  const defaultImage = isCandle ? images.candles : images.cards;
  const image = resolveImageUrl(isCandle ? candle!.image : card!.image, defaultImage);
  const alt = isCandle ? candle!.alt : card!.alt;
  const nomenclature = isCandle ? candle!.nomenclature : card!.note || "Greeting Card";
  const notesList = isCandle
    ? nomenclature
        .split(/•|,/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const narrative = isCandle
    ? candleNarratives[candle!.slug] ||
      candleNarratives[slugify(candle!.name)] ||
      "Artisan hand-poured in small batches using 100% natural botanical soy wax and phthalate-free fragrance oils. Designed to burn cleanly and evenly while infusing your sanctuary with comforting, luxurious scent throw."
    : cardNarratives[card!.id] ||
      cardNarratives[slugify(card!.name)] ||
      "Storybook greeting card printed on museum-grade 350gsm archival cotton paper with foil embossed illumination. Blank inside to hold your deepest handwritten sentiments, accompanied by a matching luxury envelope.";

  const handleAddToCart = () => {
    addToCart(
      {
        id: isCandle ? candle!.id : card!.id,
        name,
        price,
        image,
        category: isCandle ? "Candles" : "Greeting Cards",
        nomenclature,
      },
      quantity,
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: isCandle ? candle!.id : card!.id,
        name,
        price,
        image,
        category: isCandle ? "Candles" : "Greeting Cards",
        nomenclature,
      },
      quantity,
    );
    openCheckout();
  };

  // Sibling items for recommendations
  const relatedCandles = isCandle
    ? candle!.collection.products.filter((p) => p.id !== candle!.id).slice(0, 3)
    : [];
  const relatedCards = !isCandle
    ? cards.filter((c) => c.id !== card!.id).slice(0, 3)
    : [];

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden bg-ivory pt-6 pb-20 md:pt-10 md:pb-28">
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(180px,28vw)] opacity-[0.24] hidden md:block pointer-events-none"
        />
        <FloralCorner
          corner="bl"
          className="absolute left-0 bottom-0 w-[min(160px,24vw)] opacity-[0.2] hidden md:block pointer-events-none"
        />

        <div className="container-editorial relative z-[1]">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 font-serif text-[0.74rem] tracking-[0.18em] uppercase text-taupe">
            <Link to="/" className="hover:text-burgundy transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gold/60">/</span>
            {isCandle ? (
              <>
                <Link to="/candles" className="hover:text-burgundy transition-colors">
                  Collections
                </Link>
                <span className="mx-2 text-gold/60">/</span>
                <Link
                  to={`/candles/${candle!.collection.slug}`}
                  className="hover:text-burgundy transition-colors"
                >
                  {candle!.collection.title}
                </Link>
              </>
            ) : (
              <Link to="/greeting-cards" className="hover:text-burgundy transition-colors">
                Greeting Cards
              </Link>
            )}
            <span className="mx-2 text-gold/60">/</span>
            <span className="text-ink font-semibold">{name}</span>
          </nav>

          {/* Product Hero 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Product Imagery Showcase */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="group relative w-full max-w-[480px] overflow-hidden rounded-2xl bg-champagne/40 border border-gold/40 shadow-[0_20px_50px_rgba(26,4,8,0.08)] ring-1 ring-gold/20">
                <img
                  src={image}
                  alt={alt}
                  className="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = defaultImage;
                  }}
                />

                {/* Status / Category Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/90 backdrop-blur-md px-3.5 py-1 text-[0.68rem] font-serif uppercase tracking-[0.2em] text-burgundy shadow-sm border border-gold/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {isCandle ? "Hand-Poured Soy" : "Artisan Embossed"}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-burgundy/85 backdrop-blur-md px-3 py-1 text-[0.66rem] font-serif uppercase tracking-[0.18em] text-ivory">
                    In Stock • California
                  </span>
                </div>
              </div>

              {/* Artisan Value Badges */}
              <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-[480px] text-center">
                <div className="p-3 rounded-xl bg-champagne/30 border border-gold/25">
                  <p className="font-serif text-[0.72rem] tracking-wider uppercase text-burgundy font-medium">
                    {isCandle ? "100% Soy Wax" : "350gsm Cotton"}
                  </p>
                  <p className="mt-0.5 text-[0.66rem] text-taupe">Clean & Sustainable</p>
                </div>
                <div className="p-3 rounded-xl bg-champagne/30 border border-gold/25">
                  <p className="font-serif text-[0.72rem] tracking-wider uppercase text-burgundy font-medium">
                    {isCandle ? "45–50 Hr Burn" : "Gold Foil"}
                  </p>
                  <p className="mt-0.5 text-[0.66rem] text-taupe">Slow & Soothing</p>
                </div>
                <div className="p-3 rounded-xl bg-champagne/30 border border-gold/25">
                  <p className="font-serif text-[0.72rem] tracking-wider uppercase text-burgundy font-medium">
                    California
                  </p>
                  <p className="mt-0.5 text-[0.66rem] text-taupe">Handmade in Atelier</p>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              {/* Eyebrow & Collection link */}
              <div className="flex items-center gap-2">
                {isCandle ? (
                  <Link
                    to={`/candles/${candle!.collection.slug}`}
                    className="text-eyebrow text-burgundy tracking-[0.24em] hover:underline"
                  >
                    The {candle!.collection.title} Collection
                  </Link>
                ) : (
                  <Link
                    to="/greeting-cards"
                    className="text-eyebrow text-burgundy tracking-[0.24em] hover:underline"
                  >
                    Atelier Stationery
                  </Link>
                )}
                <span className="text-gold/60">•</span>
                <span className="text-[0.72rem] font-serif text-taupe tracking-widest uppercase">
                  Chapter Edition
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-2.5 font-serif text-[2.2rem] sm:text-[2.6rem] font-light tracking-[0.04em] text-ink leading-tight">
                {name}
              </h1>

              {/* Price & Rating Seal */}
              <div className="mt-3 flex items-center justify-between border-b border-gold/25 pb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[1.8rem] font-medium tracking-[0.04em] text-ink">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-[0.78rem] text-taupe font-serif">
                    USD • Free shipping over $75
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gold text-xs">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="ml-1 text-[0.72rem] text-taupe font-serif tracking-wider">
                    (Artisan Batch)
                  </span>
                </div>
              </div>

              {/* Scent Nomenclature Note Pills (for Candles) */}
              {isCandle && notesList.length > 0 ? (
                <div className="mt-6">
                  <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe">
                    Fragrance Architecture
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {notesList.map((note, index) => {
                      const noteStage =
                        index === 0
                          ? "Top Note"
                          : index === 1
                            ? "Heart Note"
                            : "Base Note";
                      return (
                        <div
                          key={note}
                          className="flex items-center gap-1.5 rounded-full bg-champagne/60 px-3.5 py-1.5 border border-gold/30 text-ink"
                        >
                          <span className="text-[0.64rem] uppercase tracking-wider text-burgundy font-semibold">
                            {noteStage}:
                          </span>
                          <span className="font-serif text-[0.82rem] tracking-wide">
                            {note}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Sensorial Story Narrative */}
              <div className="mt-6">
                <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe">
                  Sensory Narrative
                </p>
                <p className="mt-2 font-serif text-[1rem] leading-relaxed text-taupe/90 italic">
                  "{narrative}"
                </p>
              </div>

              {/* Quantity Selector & Action CTAs */}
              <div className="mt-8 pt-6 border-t border-gold/25 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[0.75rem] uppercase tracking-[0.2em] text-taupe">
                    Quantity
                  </span>
                  <div className="flex items-center rounded-full border border-gold/50 bg-champagne/40 px-3 py-1">
                    <button
                      type="button"
                      className="px-2 text-taupe hover:text-ink text-base font-bold transition-colors cursor-pointer"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 font-serif text-[0.95rem] text-ink font-medium min-w-[2.2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="px-2 text-taupe hover:text-ink text-base font-bold transition-colors cursor-pointer"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="relative flex items-center justify-center gap-2 bg-gold py-4 px-6 font-serif text-[0.76rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M6 8.5h12l-.8 10.2a1.5 1.5 0 0 1-1.5 1.3H8.3a1.5 1.5 0 0 1-1.5-1.3L6 8.5Z" />
                      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
                    </svg>
                    <span>{addedNotice ? "Added to Bag ✓" : "Add to Atelier Bag"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex items-center justify-center gap-2 border border-burgundy bg-burgundy/95 py-4 px-6 font-serif text-[0.76rem] tracking-[0.22em] uppercase text-ivory hover:bg-burgundy transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Instant Checkout →</span>
                  </button>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="mt-8 rounded-xl bg-champagne/25 p-4 border border-gold/30 space-y-2">
                <div className="flex items-center gap-2.5 text-[0.82rem] font-serif text-ink">
                  <span className="text-gold text-base">✦</span>
                  <span>Complimentary standard shipping on all orders over $75.</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.82rem] font-serif text-ink">
                  <span className="text-gold text-base">✦</span>
                  <span>Hand-inspected, individually wrapped in protective tissue.</span>
                </div>
                <div className="flex items-center gap-2.5 text-[0.82rem] font-serif text-ink">
                  <span className="text-gold text-base">✦</span>
                  <span>Phthalate-free, non-toxic & clean soot-free burn.</span>
                </div>
              </div>

              {/* Accordions for Ritual, Notes, and Shipping */}
              <div className="mt-8 border-t border-gold/25 divide-y divide-gold/20">
                {/* Accordion 1: Details & Specs */}
                <div>
                  <button
                    type="button"
                    className="w-full py-4 flex items-center justify-between text-left font-serif text-[0.95rem] tracking-[0.06em] text-ink hover:text-burgundy transition-colors"
                    onClick={() =>
                      setActiveAccordion(activeAccordion === "specs" ? null : "specs")
                    }
                  >
                    <span>Creation Specifications</span>
                    <span className="text-gold text-lg">
                      {activeAccordion === "specs" ? "−" : "+"}
                    </span>
                  </button>
                  {activeAccordion === "specs" && (
                    <div className="pb-5 text-[0.86rem] font-serif text-taupe leading-relaxed space-y-2 animate-in fade-in duration-200">
                      {isCandle ? (
                        <div className="grid grid-cols-2 gap-y-2 pt-1">
                          <div>
                            <span className="font-semibold text-ink">Wax:</span> 100% Pure
                            Soy Wax
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Wick:</span> Braided
                            Lead-free Cotton
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Burn Time:</span>{" "}
                            45–50 Hours
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Net Wt:</span> 8.5 oz
                            (240g)
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Vessel:</span>{" "}
                            Apothecary Amber Glass
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Origin:</span>{" "}
                            Coarsegold, California
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-y-2 pt-1">
                          <div>
                            <span className="font-semibold text-ink">Paper:</span> 350gsm
                            Cotton Stock
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Print:</span> Foil
                            Embossed
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Size:</span> 5" × 7"
                            (A7 folded)
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Interior:</span> Blank
                            for your note
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Envelope:</span>{" "}
                            Matching Ivory included
                          </div>
                          <div>
                            <span className="font-semibold text-ink">Made in:</span> USA
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Accordion 2: Burn Ritual & Care */}
                <div>
                  <button
                    type="button"
                    className="w-full py-4 flex items-center justify-between text-left font-serif text-[0.95rem] tracking-[0.06em] text-ink hover:text-burgundy transition-colors"
                    onClick={() =>
                      setActiveAccordion(activeAccordion === "care" ? null : "care")
                    }
                  >
                    <span>
                      {isCandle
                        ? "Atelier Candle Care & Ritual"
                        : "Stationery Care & Sending"}
                    </span>
                    <span className="text-gold text-lg">
                      {activeAccordion === "care" ? "−" : "+"}
                    </span>
                  </button>
                  {activeAccordion === "care" && (
                    <div className="pb-5 text-[0.86rem] font-serif text-taupe leading-relaxed space-y-2.5 animate-in fade-in duration-200">
                      {isCandle ? (
                        <>
                          <p>
                            • <strong>The First Burn:</strong> Allow the melted wax pool to
                            extend completely to the glass perimeter (approx. 2 to 3
                            hours). This prevents memory tunneling.
                          </p>
                          <p>
                            • <strong>Trim the Wick:</strong> Always trim the cotton wick to
                            1/4 inch before each lighting to maintain a pure flame and zero
                            smoke.
                          </p>
                          <p>
                            • <strong>Safety Ritual:</strong> Never burn for longer than 4
                            consecutive hours. Keep away from drafts, pets, and flammable
                            decor.
                          </p>
                        </>
                      ) : (
                        <p>
                          Each greeting card is crafted with archival inks and metallic
                          foil. Write with fountain pen, ballpoint, or gel ink and allow 30
                          seconds to set before folding into the matching embossed envelope.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Accordion 3: Shipping & Packaging */}
                <div>
                  <button
                    type="button"
                    className="w-full py-4 flex items-center justify-between text-left font-serif text-[0.95rem] tracking-[0.06em] text-ink hover:text-burgundy transition-colors"
                    onClick={() =>
                      setActiveAccordion(activeAccordion === "ship" ? null : "ship")
                    }
                  >
                    <span>Shipping & Atelier Packaging</span>
                    <span className="text-gold text-lg">
                      {activeAccordion === "ship" ? "−" : "+"}
                    </span>
                  </button>
                  {activeAccordion === "ship" && (
                    <div className="pb-5 text-[0.86rem] font-serif text-taupe leading-relaxed space-y-2 animate-in fade-in duration-200">
                      <p>
                        Every Candle Artistry piece is packed by hand using recyclable
                        cushioning and embossed protective sleeves.
                      </p>
                      <p>
                        • <strong>Orders over $75:</strong> Free standard shipping across
                        the continental United States.
                      </p>
                      <p>
                        • <strong>Processing time:</strong> 1 to 2 business days from our
                        Coarsegold studio.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related / Sibling Products Section */}
          {(relatedCandles.length > 0 || relatedCards.length > 0) && (
            <div className="mt-24 pt-16 border-t border-gold/30">
              <div className="text-center">
                <p className="text-eyebrow text-burgundy">You May Also Cherish</p>
                <h2 className="mt-2 font-serif text-[1.45rem] md:text-[1.85rem] uppercase tracking-[0.08em] text-ink font-light">
                  {isCandle
                    ? `More from The ${candle!.collection.title} Collection`
                    : "Complementary Greeting Cards"}
                </h2>
                <div className="mt-3 flex items-center justify-center gap-3 text-gold">
                  <div className="h-px w-10 bg-gold/45" />
                  <DiamondMark className="h-1.5 w-1.5" />
                  <div className="h-px w-10 bg-gold/45" />
                </div>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {isCandle
                  ? relatedCandles.map((p) => (
                      <CandleProductCard
                        key={p.id}
                        product={p}
                        collectionSlug={candle!.collection.slug}
                      />
                    ))
                  : relatedCards.map((c) => (
                      <GalleryProductCard
                        key={c.id}
                        item={c}
                        category="Greeting Cards"
                      />
                    ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to={isCandle ? `/candles/${candle!.collection.slug}` : "/greeting-cards"}
                  className="inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.2em] text-burgundy font-serif font-medium hover:underline"
                >
                  ← Return to {isCandle ? candle!.collection.title : "All Greeting Cards"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </ShopPageShell>
  );
}
