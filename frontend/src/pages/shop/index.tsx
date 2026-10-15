import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useCatalog } from "../../catalog/CatalogContext";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { DiamondMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { ProductCard } from "../../components/shop/ProductCard";
import type { ProductStatus } from "../../constants/catalog";

type ShopItem = {
  id: string;
  slug: string;
  name: string;
  category: "Candles" | "Greeting Cards";
  collectionId?: string;
  collectionTitle?: string;
  collectionSlug?: string;
  price: number;
  image: string;
  alt: string;
  status: ProductStatus;
  nomenclature: string;
  scentFamily: string;
  productUrl: string;
};

// Categorize fragrances into luxury olfactory families
function getScentFamily(nomenclature: string, category: string): string {
  if (category === "Greeting Cards") return "Stationery";
  const text = (nomenclature || "").toLowerCase();

  if (
    text.includes("sandalwood") ||
    text.includes("cedar") ||
    text.includes("oak") ||
    text.includes("oud") ||
    text.includes("musk") ||
    text.includes("sagebrush") ||
    text.includes("sweetgrass") ||
    text.includes("leather") ||
    text.includes("tobacco") ||
    text.includes("birch") ||
    text.includes("pine") ||
    text.includes("baobab") ||
    text.includes("amber")
  ) {
    return "Woody & Earthy";
  }

  if (
    text.includes("vanilla") ||
    text.includes("clove") ||
    text.includes("sugar") ||
    text.includes("coffee") ||
    text.includes("tonka") ||
    text.includes("nutmeg") ||
    text.includes("cinnamon") ||
    text.includes("honey") ||
    text.includes("pear")
  ) {
    return "Warm & Gourmand";
  }

  if (
    text.includes("lemon") ||
    text.includes("tangerine") ||
    text.includes("orange peel") ||
    text.includes("pineapple") ||
    text.includes("lime") ||
    text.includes("cantaloupe") ||
    text.includes("bamboo") ||
    text.includes("mint") ||
    text.includes("ginger") ||
    text.includes("grapefruit") ||
    text.includes("linen")
  ) {
    return "Citrus & Fresh";
  }

  if (
    text.includes("rose") ||
    text.includes("jasmine") ||
    text.includes("violet") ||
    text.includes("blossom") ||
    text.includes("floral") ||
    text.includes("acacia") ||
    text.includes("petals")
  ) {
    return "Floral & Rose";
  }

  return "Artisan Blend";
}

export default function ShopPage() {
  const { collections, cards } = useCatalog();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [selectedScentFamily, setSelectedScentFamily] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compile all items into a single unified list
  const allItems = useMemo<ShopItem[]>(() => {
    const list: ShopItem[] = [];

    // All candles across all collections
    collections.forEach((col) => {
      col.products.forEach((p) => {
        list.push({
          id: p.id || p.slug,
          slug: p.slug || p.id,
          name: p.name,
          category: "Candles",
          collectionId: col.id || col.slug,
          collectionTitle: col.title,
          collectionSlug: col.slug,
          price: p.price ?? 24,
          image: p.image,
          alt: p.alt || `${p.name} hand-poured candle`,
          status: p.status,
          nomenclature: p.nomenclature || "",
          scentFamily: getScentFamily(p.nomenclature || "", "Candles"),
          productUrl: `/candles/${col.slug}/${p.slug || p.id}`,
        });
      });
    });

    // All greeting cards
    cards.forEach((card) => {
      list.push({
        id: card.id,
        slug: card.id,
        name: card.name,
        category: "Greeting Cards",
        price: card.price ?? 12,
        image: card.image,
        alt: card.alt || `${card.name} greeting card`,
        status: card.status,
        nomenclature: card.note || "Foil embossed greeting card",
        scentFamily: "Stationery",
        productUrl: `/greeting-cards/${card.id}`,
      });
    });

    return list;
  }, [collections, cards]);

  // Scent family options with item counts
  const scentFamilies = useMemo(() => {
    return [
      { id: "all", label: "All Scent Families" },
      { id: "Woody & Earthy", label: "Woody & Earthy" },
      { id: "Warm & Gourmand", label: "Warm & Gourmand" },
      { id: "Citrus & Fresh", label: "Citrus & Fresh" },
      { id: "Floral & Rose", label: "Floral & Rose" },
    ];
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return allItems
      .filter((item) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchNomenclature = item.nomenclature.toLowerCase().includes(q);
          const matchCollection = (item.collectionTitle || "").toLowerCase().includes(q);
          const matchFamily = item.scentFamily.toLowerCase().includes(q);
          if (!matchName && !matchNomenclature && !matchCollection && !matchFamily) {
            return false;
          }
        }

        // Category / Collection filter
        if (selectedCollection !== "all") {
          if (selectedCollection === "cards") {
            if (item.category !== "Greeting Cards") return false;
          } else {
            if (item.category !== "Candles") return false;
            if (item.collectionSlug !== selectedCollection && item.collectionId !== selectedCollection) {
              return false;
            }
          }
        }

        // Scent Family filter
        if (selectedScentFamily !== "all") {
          if (item.scentFamily !== selectedScentFamily) return false;
        }

        // Price range filter
        if (selectedPriceRange !== "all") {
          if (selectedPriceRange === "under-15" && item.price >= 15) return false;
          if (selectedPriceRange === "15-25" && (item.price < 15 || item.price > 25)) return false;
          if (selectedPriceRange === "over-25" && item.price <= 25) return false;
        }

        // Availability filter
        if (selectedAvailability === "available" && item.status !== "available") {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        return 0; // featured/curated order
      });
  }, [
    allItems,
    searchQuery,
    selectedCollection,
    selectedScentFamily,
    selectedPriceRange,
    selectedAvailability,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedCollection !== "all" ? 1 : 0) +
    (selectedScentFamily !== "all" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0) +
    (selectedAvailability !== "all" ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCollection("all");
    setSelectedScentFamily("all");
    setSelectedPriceRange("all");
    setSelectedAvailability("all");
    setSortBy("featured");
  };

  return (
    <ShopPageShell>
      <section className="relative overflow-hidden bg-ivory pt-8 pb-20 md:pt-12 md:pb-28">
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
          <nav className="mb-6 text-center font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe">
            <Link to="/" className="hover:text-burgundy transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gold/60">/</span>
            <span className="text-ink font-semibold">Shop All</span>
          </nav>

          {/* Header Banner */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-burgundy !tracking-[0.3em]">
              The Atelier Collection
            </p>
            <h1 className="mt-3 font-serif text-[2.2rem] md:text-[2.8rem] font-light tracking-[0.06em] text-ink uppercase">
              Shop All Creations
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-1.5 w-1.5" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
            <p className="mt-4 font-serif text-[0.96rem] leading-relaxed text-taupe max-w-xl mx-auto">
              Explore our full catalog of hand-poured artisan soy candles and foil-embossed greeting cards. Handcrafted with love in Coarsegold, California.
            </p>
          </header>

          {/* Mobile Filter Toggle & Quick Bar */}
          <div className="mt-8 flex items-center justify-between lg:hidden border-y border-gold/30 py-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-champagne/40 px-4 py-2 font-serif text-[0.75rem] uppercase tracking-wider text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
              </svg>
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
            </button>

            <span className="font-serif text-[0.78rem] text-taupe">
              {filteredItems.length} {filteredItems.length === 1 ? "Creation" : "Creations"}
            </span>
          </div>

          {/* Main 2-Column Layout */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Sidebar: Filters */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-7 rounded-2xl border border-gold/35 bg-champagne/25 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gold/25 pb-3">
                <h2 className="font-serif text-[0.95rem] tracking-[0.16em] uppercase text-ink font-medium">
                  Refine Creations
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="font-serif text-[0.72rem] tracking-wider text-burgundy hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* 1. Keyword Search */}
              <div>
                <label
                  htmlFor="shop-search"
                  className="block font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2"
                >
                  Search Fragrance or Name
                </label>
                <div className="relative">
                  <input
                    id="shop-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Bailando, Jasmine, Clove..."
                    className="w-full rounded-lg border border-gold/40 bg-ivory px-3.5 py-2 pl-9 text-[0.84rem] font-serif text-ink placeholder:text-taupe/60 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="absolute left-3 top-3 text-taupe"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2 text-taupe hover:text-burgundy text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Collection & Category Filter */}
              <div>
                <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2.5">
                  Collection & Category
                </p>
                <div className="space-y-1.5 font-serif text-[0.84rem]">
                  <button
                    type="button"
                    onClick={() => setSelectedCollection("all")}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                      selectedCollection === "all"
                        ? "bg-burgundy text-ivory font-medium"
                        : "text-ink hover:bg-champagne/60"
                    }`}
                  >
                    <span>All Collections</span>
                    <span className="text-xs opacity-75">{allItems.length}</span>
                  </button>

                  {collections.map((col) => (
                    <button
                      key={col.id || col.slug}
                      type="button"
                      onClick={() => setSelectedCollection(col.slug || col.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                        selectedCollection === col.slug || selectedCollection === col.id
                          ? "bg-burgundy text-ivory font-medium"
                          : "text-ink hover:bg-champagne/60"
                      }`}
                    >
                      <span>{col.title} Collection</span>
                      <span className="text-xs opacity-75">{col.products.length}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setSelectedCollection("cards")}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                      selectedCollection === "cards"
                        ? "bg-burgundy text-ivory font-medium"
                        : "text-ink hover:bg-champagne/60"
                    }`}
                  >
                    <span>Greeting Cards</span>
                    <span className="text-xs opacity-75">{cards.length}</span>
                  </button>
                </div>
              </div>

              {/* 3. Scent Family Filter */}
              <div>
                <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2.5">
                  Fragrance Profile
                </p>
                <div className="space-y-1.5 font-serif text-[0.84rem]">
                  {scentFamilies.map((fam) => {
                    const count =
                      fam.id === "all"
                        ? allItems.length
                        : allItems.filter((i) => i.scentFamily === fam.id).length;

                    return (
                      <button
                        key={fam.id}
                        type="button"
                        onClick={() => setSelectedScentFamily(fam.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                          selectedScentFamily === fam.id
                            ? "bg-burgundy text-ivory font-medium"
                            : "text-ink hover:bg-champagne/60"
                        }`}
                      >
                        <span>{fam.label}</span>
                        <span className="text-xs opacity-75">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Price Range Filter */}
              <div>
                <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2.5">
                  Price Range
                </p>
                <div className="space-y-1.5 font-serif text-[0.84rem]">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under-15", label: "Under $15 (Cards)" },
                    { id: "15-25", label: "$15 – $25 (Candles)" },
                  ].map((pr) => (
                    <button
                      key={pr.id}
                      type="button"
                      onClick={() => setSelectedPriceRange(pr.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                        selectedPriceRange === pr.id
                          ? "bg-burgundy text-ivory font-medium"
                          : "text-ink hover:bg-champagne/60"
                      }`}
                    >
                      <span>{pr.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Free Shipping Notice Callout */}
              <div className="rounded-xl border border-gold/35 bg-ivory p-3.5 text-center">
                <p className="font-serif text-[0.74rem] uppercase tracking-wider text-burgundy font-semibold">
                  Atelier Guarantee
                </p>
                <p className="mt-1 text-[0.7rem] text-taupe font-serif">
                  Complimentary shipping on all orders over $75 across the USA.
                </p>
              </div>
            </aside>

            {/* Right Main Grid Area */}
            <main className="lg:col-span-9">
              {/* Top Filter Summary and Sort Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/25 pb-4">
                <div>
                  <p className="font-serif text-[0.95rem] text-ink font-medium">
                    Showing{" "}
                    <span className="text-burgundy font-semibold">
                      {filteredItems.length}
                    </span>{" "}
                    {filteredItems.length === 1 ? "Creation" : "Handcrafted Creations"}
                  </p>
                  {searchQuery && (
                    <p className="text-[0.78rem] text-taupe font-serif mt-0.5">
                      Matching keyword: <em>"{searchQuery}"</em>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <label
                    htmlFor="sort-select"
                    className="font-serif text-[0.74rem] tracking-wider uppercase text-taupe"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gold/40 bg-ivory px-3 py-1.5 font-serif text-[0.82rem] text-ink focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer"
                  >
                    <option value="featured">Featured / Curated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips */}
              {activeFilterCount > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[0.72rem] font-serif uppercase tracking-wider text-taupe mr-1">
                    Active Filters:
                  </span>

                  {selectedCollection !== "all" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/80 px-3 py-1 text-[0.72rem] font-serif text-ink border border-gold/35">
                      Collection:{" "}
                      {selectedCollection === "cards"
                        ? "Greeting Cards"
                        : collections.find((c) => c.slug === selectedCollection || c.id === selectedCollection)
                            ?.title || selectedCollection}
                      <button
                        type="button"
                        onClick={() => setSelectedCollection("all")}
                        className="text-burgundy hover:text-ink font-bold text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedScentFamily !== "all" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/80 px-3 py-1 text-[0.72rem] font-serif text-ink border border-gold/35">
                      Profile: {selectedScentFamily}
                      <button
                        type="button"
                        onClick={() => setSelectedScentFamily("all")}
                        className="text-burgundy hover:text-ink font-bold text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedPriceRange !== "all" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/80 px-3 py-1 text-[0.72rem] font-serif text-ink border border-gold/35">
                      Price:{" "}
                      {selectedPriceRange === "under-15"
                        ? "Under $15"
                        : selectedPriceRange === "15-25"
                          ? "$15 – $25"
                          : "Over $25"}
                      <button
                        type="button"
                        onClick={() => setSelectedPriceRange("all")}
                        className="text-burgundy hover:text-ink font-bold text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/80 px-3 py-1 text-[0.72rem] font-serif text-ink border border-gold/35">
                      "{searchQuery}"
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-burgundy hover:text-ink font-bold text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[0.72rem] font-serif uppercase tracking-wider text-burgundy hover:underline ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {filteredItems.length === 0 ? (
                <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-gold/25 bg-champagne/20 py-16 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-gold mb-4 border border-gold/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[1.2rem] text-ink font-light">
                    No Creations Match Your Filters
                  </h3>
                  <p className="mt-2 text-[0.86rem] text-taupe font-serif max-w-md">
                    We could not find any creations matching your current search criteria. Try broadening your filters or resetting to view our full catalog.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-6 inline-flex bg-gold px-6 py-2.5 font-serif text-[0.72rem] tracking-[0.2em] uppercase text-ivory hover:bg-burgundy transition-colors shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
                  {filteredItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      alt={item.alt}
                      status={item.status}
                      category={item.category}
                      nomenclature={item.nomenclature}
                      price={item.price}
                      productUrl={item.productUrl}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden flex justify-start">
          <div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex h-full w-full max-w-xs flex-col bg-ivory shadow-2xl z-10 border-r border-gold/40 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gold/30 pb-4">
              <h3 className="font-serif text-[1.05rem] uppercase tracking-wider text-ink font-light">
                Filter Creations
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-taupe hover:text-burgundy text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Mobile Collections */}
            <div>
              <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2">
                Collections
              </p>
              <div className="space-y-1 font-serif text-[0.84rem]">
                <button
                  type="button"
                  onClick={() => setSelectedCollection("all")}
                  className={`block w-full text-left px-2 py-1.5 rounded ${
                    selectedCollection === "all" ? "bg-burgundy text-ivory" : "text-ink"
                  }`}
                >
                  All Collections
                </button>
                {collections.map((col) => (
                  <button
                    key={col.id || col.slug}
                    type="button"
                    onClick={() => setSelectedCollection(col.slug || col.id)}
                    className={`block w-full text-left px-2 py-1.5 rounded ${
                      selectedCollection === col.slug || selectedCollection === col.id
                        ? "bg-burgundy text-ivory"
                        : "text-ink"
                    }`}
                  >
                    {col.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedCollection("cards")}
                  className={`block w-full text-left px-2 py-1.5 rounded ${
                    selectedCollection === "cards" ? "bg-burgundy text-ivory" : "text-ink"
                  }`}
                >
                  Greeting Cards
                </button>
              </div>
            </div>

            {/* Mobile Scent Profiles */}
            <div>
              <p className="font-serif text-[0.72rem] tracking-[0.2em] uppercase text-taupe mb-2">
                Scent Profiles
              </p>
              <div className="space-y-1 font-serif text-[0.84rem]">
                {scentFamilies.map((fam) => (
                  <button
                    key={fam.id}
                    type="button"
                    onClick={() => setSelectedScentFamily(fam.id)}
                    className={`block w-full text-left px-2 py-1.5 rounded ${
                      selectedScentFamily === fam.id ? "bg-burgundy text-ivory" : "text-ink"
                    }`}
                  >
                    {fam.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="pt-4 border-t border-gold/30 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-gold py-3 font-serif text-[0.75rem] uppercase tracking-wider text-ivory hover:bg-burgundy"
              >
                Apply Filters ({filteredItems.length})
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2 font-serif text-[0.72rem] uppercase tracking-wider text-taupe hover:text-burgundy"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </ShopPageShell>
  );
}
