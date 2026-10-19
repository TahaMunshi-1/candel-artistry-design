import { Link } from "react-router";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { DiamondMark, FloralMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <ShopPageShell>
      {/* Hero Banner */}
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
              Candle Artistry Design Co. · Atelier Governance
            </p>
            <span className="h-px w-8 bg-gold/50" />
          </div>

          <h1 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light uppercase tracking-[0.08em] text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            Privacy Policy
          </h1>

          <div className="mt-4 flex items-center justify-center gap-3 text-gold">
            <div className="h-px w-14 bg-gold/45" />
            <DiamondMark className="h-2 w-2 text-gold shrink-0" />
            <div className="h-px w-14 bg-gold/45" />
          </div>

          <p className="mt-3.5 font-serif italic text-sm md:text-base text-[#F3E5D0]">
            Effective Date: {lastUpdated} · Handcrafted in Coarsegold, California
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="container-editorial py-12 md:py-20 max-w-4xl mx-auto">
        <div className="bg-cream/80 rounded-3xl border border-gold/30 p-8 sm:p-12 md:p-16 shadow-xs space-y-10 font-serif text-ink">
          
          {/* Introduction */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 1
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              1. Our Commitment to Your Privacy
            </h2>
            <p className="text-base text-ink/90 leading-[1.8]">
              At Candle Artistry Design Co. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), we cherish the trust you place in our family atelier. We operate with heartfelt transparency, intention, and respect. This Privacy Policy details how we collect, protect, utilize, and honor your personal information when you visit our website, explore our collections, commission custom fragrances, or correspond with our studio in Coarsegold, California.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Information Collected */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 2
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              2. Information We Collect
            </h2>
            <p className="text-base text-ink/90 leading-[1.8] mb-4">
              When engaging with Candle Artistry Design Co., we may collect information necessary to fulfill your orders, prepare custom bespoke candle batches, and provide boutique customer care:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-sm md:text-base text-taupe leading-relaxed">
              <li>
                <strong className="text-ink">Contact & Identity Details:</strong> Full name, email address, telephone number, and physical shipping / delivery address.
              </li>
              <li>
                <strong className="text-ink">Order & Commission Data:</strong> Selected candle collections, scent preferences, quantity requirements, personalized label specifications, and gift recipient inscriptions.
              </li>
              <li>
                <strong className="text-ink">Payment & Billing Details:</strong> Encrypted transaction identifiers processed through secure, PCI-compliant payment gateways. We never store raw credit card numbers or security CVV codes on our servers.
              </li>
              <li>
                <strong className="text-ink">Inquiry & Correspondence History:</strong> Records of communications submitted via our Contact Us intake form, direct email, or atelier phone inquiries.
              </li>
              <li>
                <strong className="text-ink">Browsing & Device Information:</strong> Standard anonymized analytical signals including IP address, browser type, device specifications, and page interactions to maintain a fluid storefront experience.
              </li>
            </ul>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Use of Information */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 3
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              3. Purpose & Use of Collected Data
            </h2>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              The information we gather is employed exclusively to elevate your experience with Candle Artistry Design Co.:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-taupe leading-relaxed">
              <li>Hand-pouring, packaging, and dispatching your artisanal candles and stationery.</li>
              <li>Communicating order status confirmations, dispatch tracking, and concierge intake replies.</li>
              <li>Administering our optional <em>Collectors Circle</em> seasonal fragrance announcements (only when you explicitly opt in).</li>
              <li>Ensuring studio security, preventing fraudulent transactions, and preserving atelier records.</li>
            </ul>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Supreme Quality & Policy Notice */}
          <div className="rounded-2xl border border-burgundy/30 bg-burgundy/5 p-6 md:p-8">
            <h3 className="font-serif text-lg font-medium text-burgundy mb-2 flex items-center gap-2">
              <DiamondMark className="w-3.5 h-3.5 text-burgundy" />
              <span>Supreme Artisanal Quality Standard & Sales Finality</span>
            </h3>
            <p className="text-sm md:text-base text-ink/90 leading-[1.8]">
              Candle Artistry Design Co. produces luxury home fragrance and stationery goods made by hand with clean, premium ingredients. Because every creation is hand-poured in small artisan batches to supreme quality standards, <strong>all sales are final and there are no refunds</strong>. Information provided during ordering is utilized to ensure your exact specifications are meticulously fulfilled prior to dispatch.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Third-Party Sharing */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 4
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              4. Non-Disclosure & Third-Party Partners
            </h2>
            <p className="text-base text-ink/90 leading-[1.8]">
              We respect your sanctuary. <strong>We do not sell, rent, monetize, or trade your personal data to advertisers, data brokers, or third parties.</strong> Data is shared strictly with essential service providers necessary for business operation, such as insured shipping carriers (e.g. USPS, UPS) to deliver your parcel and PCI-DSS certified payment processors to securely authorize your purchase.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Cookies & Storage */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 5
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              5. Cookies & Local Storage
            </h2>
            <p className="text-base text-ink/90 leading-[1.8]">
              Our website uses minimal, non-invasive cookies and local browser storage strictly to preserve your cart items across sessions, remember your navigation preferences, and verify administrative privileges. You may adjust your browser settings to decline cookies at any time, though doing so may affect interactive shopping bag features.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Client Rights */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 6
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              6. Your Privacy Rights & Choices
            </h2>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              Regardless of your jurisdiction, you retain full ownership over your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-taupe leading-relaxed">
              <li>You may request a copy of the personal information we maintain regarding your client profile.</li>
              <li>You may request updates, corrections, or deletions of non-essential records.</li>
              <li>You can unsubscribe from marketing communications at any time via the link in our newsletters or by emailing our concierge desk.</li>
            </ul>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Contact Details */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 7
              </span>
            </div>
            <h2 className="text-2xl font-light text-ink mb-3">
              7. Contact Our Atelier Privacy Concierge
            </h2>
            <p className="text-base text-ink/90 leading-[1.8] mb-4">
              If you have any questions, inquiries, or requests concerning this Privacy Policy, please reach out directly to our studio:
            </p>
            <div className="rounded-2xl border border-gold/40 bg-white/70 p-6 space-y-2 text-sm">
              <p>
                <strong className="text-ink">Candle Artistry Design Co.</strong>
              </p>
              <p className="text-taupe">
                Attn: Atelier Privacy Concierge
              </p>
              <p className="text-taupe">
                Coarsegold, California 93614 · United States
              </p>
              <p className="text-taupe">
                Email:{" "}
                <a href="mailto:privacy@candleartistrydesign.com" className="text-burgundy hover:underline">
                  privacy@candleartistrydesign.com
                </a>{" "}
                /{" "}
                <a href="mailto:info@candleartistrydesign.com" className="text-burgundy hover:underline">
                  info@candleartistrydesign.com
                </a>
              </p>
              <p className="text-taupe">
                Telephone:{" "}
                <a href="tel:+15596832263" className="text-burgundy hover:underline">
                  (559) 683-2263
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider uppercase">
            <Link to="/terms-and-conditions" className="text-burgundy hover:underline font-semibold">
              ← View Terms & Conditions
            </Link>
            <Link to="/contact" className="text-gold hover:text-burgundy font-semibold">
              Contact Us Directly →
            </Link>
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
