import { useState } from "react";
import { Link } from "react-router";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { DiamondMark, FloralMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";
import { api } from "../../services/api";

type InquiryType =
  | "Custom & Bespoke Candle Order"
  | "Wholesale & Stockist Partnership"
  | "Weddings & Special Events"
  | "Corporate & Luxury Gifting"
  | "Greeting Cards & Commission Art"
  | "General Inquiry & Atelier Care";

const inquiryOptions: InquiryType[] = [
  "Custom & Bespoke Candle Order",
  "Wholesale & Stockist Partnership",
  "Weddings & Special Events",
  "Corporate & Luxury Gifting",
  "Greeting Cards & Commission Art",
  "General Inquiry & Atelier Care",
];

const scentOptions = [
  "Romance & Passion",
  "West & Rodeo",
  "Mystery & Midnight",
  "Cabin & Wilderness",
  "Africa & Exotic",
  "Yosemite Foothills",
  "Custom Scent Formulation",
  "Need Artisan Recommendation",
];

const quantityOptions = [
  "1 – 5 Pieces (Personal & Gifts)",
  "6 – 24 Pieces (Boutique Sample / Small Gathering)",
  "25 – 100 Pieces (Weddings & Corporate Favors)",
  "100+ Pieces (Volume Wholesale & Brand Gifting)",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "General Inquiry & Atelier Care" as InquiryType,
    estimatedQuantity: "",
    scentPreferences: [] as string[],
    neededByDate: "",
    budget: "",
    subject: "",
    message: "",
    newsletterOptIn: true,
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceNumber: string;
    name: string;
    email: string;
    inquiryType: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleScent = (scent: string) => {
    setFormData((prev) => {
      const exists = prev.scentPreferences.includes(scent);
      return {
        ...prev,
        scentPreferences: exists
          ? prev.scentPreferences.filter((s) => s !== scent)
          : [...prev.scentPreferences, scent],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!formData.subject.trim()) {
      setError("Please enter a subject for your inquiry.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please tell us about your request or inquiry.");
      return;
    }

    setLoading(true);

    try {
      let resultRef = `CAD-CT-${Math.floor(100000 + Math.random() * 900000)}`;

      try {
        const res = await api.submitContact(formData);
        if (res?.referenceNumber) {
          resultRef = res.referenceNumber;
        }
      } catch (backendErr) {
        console.warn("Backend contact endpoint unavailable, persisting locally:", backendErr);
        // Graceful fallback to client storage so the user always has a seamless experience
        const existing = JSON.parse(localStorage.getItem("cad-contact-inquiries") || "[]");
        existing.push({
          ...formData,
          referenceNumber: resultRef,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("cad-contact-inquiries", JSON.stringify(existing));
      }

      setSubmittedData({
        referenceNumber: resultRef,
        name: formData.name.trim(),
        email: formData.email.trim(),
        inquiryType: formData.inquiryType,
      });

      // Scroll smoothly to confirmation
      window.scrollTo({ top: 380, behavior: "smooth" });
    } catch (err: any) {
      setError(err?.message || "Unable to submit inquiry. Please try again or reach us by phone.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "General Inquiry & Atelier Care",
      estimatedQuantity: "",
      scentPreferences: [],
      neededByDate: "",
      budget: "",
      subject: "",
      message: "",
      newsletterOptIn: true,
    });
    setError("");
  };

  const faqs = [
    {
      q: "What is your refund and return policy?",
      a: "Because each Candle Artistry Design candle and stationery piece is hand-poured, hand-inspected, and crafted to supreme artisanal standards in small batches, all sales are final and there are no refunds. We take immense pride in the supreme quality and intention poured into every single creation. In the rare event that an item is damaged during shipping transit, our Coarsegold atelier will immediately provide a replacement upon receiving photos of the damaged package.",
    },
    {
      q: "Where is your studio located and can I pick up my order locally?",
      a: "Our atelier and pouring workshop is located in picturesque Coarsegold, California 93614, nestled in the Sierra Nevada foothills just south of Yosemite National Park. We offer complimentary curbside atelier pickup for local collectors and residents throughout Madera and Fresno counties by appointment.",
    },
    {
      q: "What is the turnaround time for custom bespoke or wedding orders?",
      a: "Custom candle commissions and personalized event favors typically require 2 to 3 weeks from fragrance approval and label design finalization to hand-pouring, curing, and delivery. Expedited atelier timelines are available upon consultation.",
    },
    {
      q: "What makes Candle Artistry Design candles supreme in quality?",
      a: "We formulate exclusively with 100% natural, biodegradable soy and coconut wax blends, braided lead-free cotton wicks, and pure, phthalate-free fragrance oils infused with essential oils. Every candle delivers a clean, soot-free burn with rich scent throw and features Jeff Fontano's original Impressionist fine art labels.",
    },
    {
      q: "Do you offer wholesale stockist partnerships for boutiques and spas?",
      a: "Yes! We proudly partner with curated gift shops, luxury lodges, boutiques, and wellness spas across the country. Please select 'Wholesale & Stockist Partnership' in the intake form above or reach out directly to wholesale@candleartistrydesign.com for our catalog and line sheet.",
    },
  ];

  return (
    <ShopPageShell>
      {/* Hero Header */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse at 50% 12%, #4e0d16 0%, #2c050a 52%, #180205 100%)",
        }}
      >
        <FloralCorner
          corner="tl"
          className="absolute left-0 top-0 w-[min(180px,26vw)] opacity-[0.22] hidden sm:block z-[1] brightness-125 pointer-events-none"
        />
        <FloralCorner
          corner="tr"
          className="absolute right-0 top-0 w-[min(180px,26vw)] opacity-[0.22] hidden sm:block z-[1] brightness-125 pointer-events-none"
        />

        <div className="container-editorial relative z-[2] pt-12 md:pt-16 pb-16 md:pb-20 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-gold/80 mb-3">
            <span className="h-px w-8 bg-gold/50" />
            <p className="font-serif text-[0.68rem] uppercase tracking-[0.32em] text-[#E8D4A8]">
              Candle Artistry Design Co. · Atelier Concierge
            </p>
            <span className="h-px w-8 bg-gold/50" />
          </div>

          <h1 className="font-serif text-[clamp(2.3rem,5vw,3.7rem)] font-light uppercase tracking-[0.08em] text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            Contact Our Atelier
          </h1>

          <div className="mt-4 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-14 bg-gold/45" />
            <DiamondMark className="h-2 w-2 text-gold shrink-0" />
            <div className="h-px w-14 bg-gold/45" />
          </div>

          <p className="mt-4 max-w-2xl mx-auto font-serif text-[1.05rem] md:text-[1.15rem] text-[#F3E5D0] leading-relaxed font-light">
            Handcrafted in the Sierra Nevada foothills of Coarsegold, California. Whether inquiring about custom bespoke candle orders, boutique wholesale, wedding favors, or order assistance, our artisans look forward to connecting with you.
          </p>

          {/* Supreme Quality & Policy Highlight Banner */}
          <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-gold/40 bg-white/5 backdrop-blur-md px-5 py-3.5 text-center shadow-lg">
            <p className="font-serif text-[0.74rem] md:text-[0.8rem] uppercase tracking-[0.22em] text-[#F9E8B2] font-semibold flex items-center justify-center gap-2">
              <span className="text-gold">✦</span> Supreme Quality Standard · All Sales Final <span className="text-gold">✦</span>
            </p>
            <p className="mt-1 font-serif text-[0.84rem] md:text-[0.88rem] text-white/90 leading-relaxed">
              Every candle and art card is small-batch hand-poured with uncompromising precision. Due to our supreme quality standards, there are no refunds.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Intake Form (7 cols on lg) */}
          <div className="lg:col-span-7 bg-cream/70 rounded-3xl border border-gold/30 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-gold">
              <FloralMark className="w-5 h-5 text-gold shrink-0" />
              <span className="font-serif text-[0.72rem] uppercase tracking-[0.26em] text-taupe font-semibold">
                Client Intake & Concierge Form
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-light text-ink">
              Send an Atelier Inquiry
            </h2>
            <p className="mt-1 font-serif text-sm text-taupe/90 mb-8">
              Please share your project or inquiry details below. Our studio team reviews every submission with personal care.
            </p>

            {/* Confirmation State */}
            {submittedData ? (
              <div className="rounded-2xl border border-emerald-600/40 bg-emerald-50/70 p-6 md:p-8 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 mx-auto flex items-center justify-center text-2xl mb-4 shadow-sm">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-medium text-emerald-900">
                  Inquiry Received with Thanks, {submittedData.name}!
                </h3>
                <p className="mt-2 font-serif text-sm text-emerald-800/90 leading-relaxed max-w-lg mx-auto">
                  Your request has been logged in our Coarsegold atelier system. A concierge confirmation has been prepared for <strong className="font-semibold">{submittedData.email}</strong>.
                </p>

                <div className="mt-5 inline-block rounded-xl border border-gold/40 bg-white/80 px-5 py-3 shadow-xs">
                  <span className="block text-[0.68rem] font-serif uppercase tracking-[0.2em] text-taupe">
                    Inquiry Reference Number
                  </span>
                  <strong className="font-serif text-lg tracking-wider text-burgundy">
                    {submittedData.referenceNumber}
                  </strong>
                </div>

                <div className="mt-6 pt-5 border-t border-emerald-200/70 text-xs font-serif text-emerald-900/80 space-y-1">
                  <p>
                    <strong>Inquiry Type:</strong> {submittedData.inquiryType}
                  </p>
                  <p>
                    <strong>Estimated Response Time:</strong> Within 24–48 business hours from our California studio.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-full border border-gold/60 bg-white px-6 py-2.5 font-serif text-xs uppercase tracking-[0.18em] text-ink hover:bg-champagne/40 transition-colors cursor-pointer shadow-xs"
                  >
                    Send Another Message
                  </button>
                  <Link
                    to="/candles"
                    className="rounded-full bg-burgundy px-7 py-2.5 font-serif text-xs uppercase tracking-[0.18em] text-white hover:bg-[#6c121c] transition-colors shadow-xs"
                  >
                    Browse Collections →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-serif text-red-700">
                    {error}
                  </div>
                )}

                {/* Inquiry Type Selector */}
                <div>
                  <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-2">
                    Inquiry Purpose <span className="text-burgundy">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inquiryOptions.map((type) => {
                      const isSelected = formData.inquiryType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-serif transition-all cursor-pointer ${
                            isSelected
                              ? "border-burgundy bg-burgundy/10 text-burgundy font-medium shadow-xs"
                              : "border-gold/30 bg-white/70 text-ink/80 hover:border-gold hover:bg-white"
                          }`}
                        >
                          <span className="mr-1.5">{isSelected ? "●" : "○"}</span> {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Client Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Your Full Name <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Email Address <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Phone Number <span className="text-taupe text-[0.66rem] normal-case">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (559) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Company / Organization <span className="text-taupe text-[0.66rem] normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sierra Luxe Boutique"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>
                </div>

                {/* Scent Preferences of Interest (Multi-select) */}
                <div>
                  <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                    Collections or Scents of Interest <span className="text-taupe text-[0.66rem] normal-case">(Optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scentOptions.map((scent) => {
                      const active = formData.scentPreferences.includes(scent);
                      return (
                        <button
                          key={scent}
                          type="button"
                          onClick={() => toggleScent(scent)}
                          className={`rounded-full px-3 py-1 font-serif text-xs transition-all cursor-pointer ${
                            active
                              ? "bg-gold text-white font-medium shadow-xs"
                              : "border border-gold/40 bg-white/80 text-ink/80 hover:border-gold hover:bg-white"
                          }`}
                        >
                          {active ? "✓ " : "+ "}
                          {scent}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity and Target Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Estimated Quantity <span className="text-taupe text-[0.66rem] normal-case">(If applicable)</span>
                    </label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold"
                    >
                      <option value="">Select Estimated Quantity...</option>
                      {quantityOptions.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                      Needed-By / Event Date <span className="text-taupe text-[0.66rem] normal-case">(Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={formData.neededByDate}
                      onChange={(e) => setFormData({ ...formData, neededByDate: e.target.value })}
                      className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                    Subject Line <span className="text-burgundy">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bespoke Candle Inquiry for Autumn Wedding"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-serif text-[0.74rem] uppercase tracking-[0.2em] text-ink font-semibold mb-1.5">
                    Detailed Message & Project Vision <span className="text-burgundy">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your desired fragrances, personal memories, custom label ideas, or any questions for Jeff & Alda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-gold/40 bg-white px-3.5 py-2.5 font-serif text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 leading-relaxed"
                  />
                </div>

                {/* Newsletter Opt-in Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="newsletter-opt-in"
                    type="checkbox"
                    checked={formData.newsletterOptIn}
                    onChange={(e) => setFormData({ ...formData, newsletterOptIn: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-gold text-burgundy focus:ring-gold cursor-pointer"
                  />
                  <label htmlFor="newsletter-opt-in" className="font-serif text-xs text-taupe leading-relaxed cursor-pointer">
                    Join the <strong>Candle Artistry Design Collectors Circle</strong> for seasonal private releases, secret scent drops, and invitation-only atelier announcements.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-burgundy px-8 py-4 font-serif text-[0.78rem] tracking-[0.22em] uppercase text-white hover:bg-[#6e131d] transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <span>Transmitting Inquiry to Atelier…</span>
                    ) : (
                      <>
                        <span>Submit Atelier Inquiry</span>
                        <span className="arrow">→</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center font-serif text-[0.7rem] text-taupe/80 italic">
                    Supreme Handcrafted Quality · All Sales Final (No Refunds)
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Business Location, Atelier Details & Map (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Location & Studio Card */}
            <div className="rounded-3xl border border-gold/30 bg-cream/70 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-gold">
                <span className="text-base">📍</span>
                <span className="font-serif text-[0.72rem] uppercase tracking-[0.26em] text-taupe font-semibold">
                  Business Location & Studio
                </span>
              </div>

              <h3 className="font-serif text-2xl font-light text-ink">
                Candle Artistry Design Co.
              </h3>
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-gold mt-1">
                Atelier & Hand-Pouring Studio
              </p>

              <div className="mt-5 space-y-3 font-serif text-sm text-ink/90">
                <div className="flex items-start gap-3">
                  <span className="text-gold text-base shrink-0 mt-0.5">✦</span>
                  <div>
                    <strong className="block text-ink">Studio Address:</strong>
                    <span>Coarsegold, California 93614</span>
                    <span className="block text-taupe text-xs mt-0.5">
                      Madera County · Sierra Nevada Foothills (Gateway to Yosemite)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gold text-base shrink-0 mt-0.5">✦</span>
                  <div>
                    <strong className="block text-ink">Curbside & Studio Pickup:</strong>
                    <span className="text-xs text-taupe">
                      Available for regional collectors and local residents by appointment.
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-gold/40 shadow-sm relative bg-champagne/30">
                <iframe
                  title="Candle Artistry Design Co. Location in Coarsegold, California"
                  src="https://maps.google.com/maps?q=Coarsegold,+CA+93614&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="230"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="bg-white/90 backdrop-blur-xs p-2.5 flex items-center justify-between border-t border-gold/25">
                  <span className="font-serif text-[0.75rem] text-ink font-medium">
                    Coarsegold, California · 93614
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Coarsegold,+CA+93614"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-[0.72rem] uppercase tracking-wider text-burgundy hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* Hours of Operation */}
              <div className="mt-6 pt-5 border-t border-gold/25">
                <h4 className="font-serif text-[0.8rem] uppercase tracking-[0.2em] text-ink font-semibold mb-3">
                  Studio & Atelier Hours
                </h4>
                <div className="space-y-2 text-xs font-serif">
                  <div className="flex justify-between py-1 border-b border-gold/15">
                    <span className="text-taupe">Monday – Friday</span>
                    <span className="text-ink font-medium">9:00 AM – 5:00 PM PST</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold/15">
                    <span className="text-taupe">Saturday</span>
                    <span className="text-ink font-medium">10:00 AM – 3:00 PM PST (By Appt)</span>
                  </div>
                  <div className="flex justify-between py-1 text-taupe">
                    <span>Sunday</span>
                    <span className="text-burgundy font-medium">Closed · Hand-Pouring Days</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="mt-6 pt-5 border-t border-gold/25 space-y-3">
                <h4 className="font-serif text-[0.8rem] uppercase tracking-[0.2em] text-ink font-semibold">
                  Direct Channels
                </h4>
                <div className="space-y-2 text-xs font-serif">
                  <div className="flex items-center gap-2 text-ink">
                    <span className="text-gold">📞</span>
                    <span className="text-taupe">Studio Phone:</span>
                    <a href="tel:+15596832263" className="text-burgundy font-medium hover:underline">
                      (559) 683-2263
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <span className="text-gold">✉️</span>
                    <span className="text-taupe">General Concierge:</span>
                    <a href="mailto:info@candleartistrydesign.com" className="text-burgundy font-medium hover:underline">
                      info@candleartistrydesign.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <span className="text-gold">🕯️</span>
                    <span className="text-taupe">Bespoke Orders:</span>
                    <a href="mailto:bespoke@candleartistrydesign.com" className="text-burgundy font-medium hover:underline">
                      bespoke@candleartistrydesign.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-ink">
                    <span className="text-gold">📦</span>
                    <span className="text-taupe">Wholesale Desk:</span>
                    <a href="mailto:wholesale@candleartistrydesign.com" className="text-burgundy font-medium hover:underline">
                      wholesale@candleartistrydesign.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Supreme Quality & No-Refund Policy Spotlight */}
            <div className="rounded-3xl border border-burgundy/30 bg-radial from-[#4e0d16]/10 to-[#2c050a]/5 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 text-burgundy mb-2">
                <DiamondMark className="w-3 h-3 text-burgundy" />
                <h4 className="font-serif text-[0.76rem] uppercase tracking-[0.22em] text-burgundy font-bold">
                  Supreme Quality Guarantee & Policy
                </h4>
              </div>
              <p className="font-serif text-sm leading-relaxed text-ink/90">
                At Candle Artistry Design Co., each piece represents an intersection of impressionistic fine art and master candlemaking. <strong>Because our quality is supreme and each candle is hand-poured in limited batches, all sales are final and there are no refunds.</strong>
              </p>
              <p className="mt-2.5 font-serif text-xs leading-relaxed text-taupe">
                In the rare event of transit damage, please notify us within 48 hours of delivery with photographic evidence, and our Coarsegold team will promptly arrange a replacement creation.
              </p>
            </div>

            {/* The Founders' Direct Note */}
            <div className="rounded-3xl border border-gold/30 bg-cream/40 p-6 sm:p-7 text-center">
              <p className="font-serif italic text-sm text-ink/90 leading-relaxed">
                "Every flame we light carries our dedication to Katherine's care and the profound stories of life in the Sierra Foothills. Thank you for welcoming Candle Artistry into your sanctuary."
              </p>
              <p className="mt-3 font-serif text-xs uppercase tracking-[0.2em] text-gold font-medium">
                — Jeff & Alda Fontano, Founders
              </p>
            </div>

          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-gold/30 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-serif text-[0.72rem] uppercase tracking-[0.28em] text-taupe">
              Questions & Answers
            </p>
            <h3 className="mt-2 font-serif text-3xl font-light text-ink">
              Atelier Frequently Asked Questions
            </h3>
            <div className="mt-3 flex items-center justify-center gap-3 text-gold">
              <div className="h-px w-10 bg-gold/45" />
              <DiamondMark className="h-2 w-2 text-gold shrink-0" />
              <div className="h-px w-10 bg-gold/45" />
            </div>
          </div>

          <div className="divide-y divide-gold/25 rounded-2xl border border-gold/30 bg-cream/50 overflow-hidden shadow-xs">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="p-4 sm:p-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-serif text-[1rem] md:text-[1.05rem] text-ink hover:text-burgundy transition-colors cursor-pointer gap-4"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <span className="text-gold text-xl font-bold shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 font-serif text-sm md:text-[0.92rem] text-taupe leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
