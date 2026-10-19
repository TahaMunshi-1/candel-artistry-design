import { Link } from "react-router";
import ShopPageShell from "../../components/shop/ShopPageShell";
import { DiamondMark, FloralMark } from "../../components/decor/Ornaments";
import { FloralCorner } from "../../components/decor/BotanicalAssets";

export default function TermsPage() {
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
            Terms & Conditions
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

      {/* Terms Content */}
      <section className="container-editorial py-12 md:py-20 max-w-4xl mx-auto">
        <div className="bg-cream/80 rounded-3xl border border-gold/30 p-8 sm:p-12 md:p-16 shadow-xs space-y-10 font-serif text-ink">
          
          {/* Prominent Supreme Quality & No-Refund Policy Spotlight Box */}
          <div className="rounded-2xl border-2 border-burgundy/60 bg-gradient-to-br from-[#4e0d16]/10 via-cream to-champagne/40 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 text-burgundy mb-3">
              <DiamondMark className="w-4 h-4 text-burgundy shrink-0" />
              <h2 className="font-serif text-[0.88rem] sm:text-base uppercase tracking-[0.24em] text-burgundy font-bold">
                Supreme Quality Standard & Strict No-Refund Policy
              </h2>
            </div>
            <p className="text-base md:text-[1.05rem] text-ink font-light leading-relaxed">
              Every candle, greeting card, and bespoke piece from <strong>Candle Artistry Design Co.</strong> is hand-poured, hand-labeled, and individually inspected to supreme artisanal standards in our Coarsegold, California studio.
            </p>
            <p className="mt-3 text-base md:text-[1.05rem] text-burgundy font-medium leading-relaxed">
              Because our quality is supreme and each creation is a handcrafted work of art, ALL SALES ARE FINAL AND THERE ARE NO REFUNDS.
            </p>
            <p className="mt-2 text-xs md:text-sm text-taupe leading-relaxed">
              Damaged in Transit: If a parcel is damaged during shipment by the postal carrier, please inform us within 48 hours of delivery with photos of the damaged packaging and product. Our studio will promptly dispatch an identical replacement.
            </p>
          </div>

          {/* Section 1: Agreement to Terms */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 1
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              1. Acceptance of Terms
            </h3>
            <p className="text-base text-ink/90 leading-[1.8]">
              Welcome to Candle Artistry Design Co. By visiting our website, exploring our olfactory collections, placing an order, or submitting an inquiry through our intake concierge, you agree to be bound by these Terms & Conditions (&ldquo;Terms&rdquo;) and our Privacy Policy. If you do not agree to these Terms, please refrain from using our website or ordering our handcrafted creations.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 2: Artisanal Handcrafted Creations */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 2
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              2. Handcrafted Nature & Variations
            </h3>
            <p className="text-base text-ink/90 leading-[1.8]">
              All candles are individually hand-poured using 100% natural soy and coconut wax blends and phthalate-free fine fragrance oils. Because our products are hand-poured rather than mass-manufactured by machines, minor natural variations in wax tops, frosting, crystal setting, and label alignment are celebrated hallmarks of genuine small-batch artisanal craft and do not constitute defects.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 3: Orders, Pricing & Payment */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 3
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              3. Pricing, Orders & Payment Processing
            </h3>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              All prices displayed on our website are stated in United States Dollars (USD) and exclude shipping and applicable sales tax unless explicitly noted. We reserve the right to revise prices or discontinue fragrance blends at our atelier's discretion.
            </p>
            <p className="text-base text-ink/90 leading-[1.8]">
              Payment is authorized at the time of purchase through our secure, encrypted gateway. We reserve the right to decline or cancel any order suspected of fraudulent activity, unauthorized reselling, or inventory unavailability.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 4: Refund Policy Detailed */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 4
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              4. Strict All Sales Final Policy
            </h3>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              <strong>Due to the supreme quality and personal care nature of our hand-poured candles and stationery, all sales are strictly final and non-refundable.</strong>
            </p>
            <p className="text-base text-ink/90 leading-[1.8]">
              We encourage all clients to review fragrance architectural notes (Top, Heart, and Base notes) on each product page prior to finalizing purchases. Scent preference is subjective, and returns or exchanges based on scent perception are not accepted.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 5: Bespoke Commissions & Wholesale */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 5
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              5. Bespoke Commissions, Weddings & Wholesale Orders
            </h3>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              For custom candle commissions, wedding favor runs, corporate gifting, and wholesale boutique orders arranged through our intake form:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-taupe leading-relaxed">
              <li>Custom label proofs must be reviewed and approved in writing by the client before pouring commences.</li>
              <li>A non-refundable 50% deposit is required for bespoke commissions exceeding 50 units.</li>
              <li>Estimated lead times are typically 2 to 3 weeks from artwork sign-off to completion.</li>
            </ul>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 6: Candle Safety Ritual & Customer Duty */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 6
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              6. Candle Safety Ritual & Liability Disclaimer
            </h3>
            <p className="text-base text-ink/90 leading-[1.8] mb-3">
              Safety is paramount when enjoying flame in the sanctuary of your home. By purchasing our candles, the customer assumes full responsibility to observe all standard candle care rituals:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-taupe leading-relaxed">
              <li>Always trim the cotton wick to 1/4 inch before every single lighting.</li>
              <li>Never leave a burning candle unattended or within reach of children or pets.</li>
              <li>Burn on a stable, heat-resistant surface away from drafts, curtains, and flammable materials.</li>
              <li>Do not burn continuously for more than 4 hours at a time.</li>
              <li>Candle Artistry Design Co. is not liable for improper burn usage, negligence, or failure to follow warning labels affixed to the base of every jar.</li>
            </ul>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 7: Intellectual Property & Impressionist Artwork */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 7
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              7. Intellectual Property & Fine Art Protection
            </h3>
            <p className="text-base text-ink/90 leading-[1.8]">
              All label artwork, original Impressionist oil paintings created by Jeff Fontano, product nomenclature, brand marks, photography, narratives, and digital content are the exclusive intellectual property of Candle Artistry Design Co. No part of our creative works may be reproduced, digitally copied, or commercially exploited without our express written authorization.
            </p>
          </div>

          <div className="h-px bg-gold/25" />

          {/* Section 8: Governing Law */}
          <div>
            <div className="flex items-center gap-2 text-gold mb-2">
              <FloralMark className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[0.72rem] uppercase tracking-[0.24em] text-taupe font-semibold">
                Section 8
              </span>
            </div>
            <h3 className="text-2xl font-light text-ink mb-3">
              8. Governing Law & Atelier Contact
            </h3>
            <p className="text-base text-ink/90 leading-[1.8] mb-4">
              These Terms & Conditions are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles. Any legal proceedings arising hereunder shall be filed in the courts of Madera County, California.
            </p>
            <div className="rounded-2xl border border-gold/40 bg-white/70 p-6 space-y-2 text-sm">
              <p>
                <strong className="text-ink">Candle Artistry Design Co.</strong>
              </p>
              <p className="text-taupe">
                Coarsegold, California 93614 · United States
              </p>
              <p className="text-taupe">
                Studio Phone:{" "}
                <a href="tel:+15596832263" className="text-burgundy hover:underline">
                  (559) 683-2263
                </a>
              </p>
              <p className="text-taupe">
                Email:{" "}
                <a href="mailto:info@candleartistrydesign.com" className="text-burgundy hover:underline">
                  info@candleartistrydesign.com
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider uppercase">
            <Link to="/privacy-policy" className="text-burgundy hover:underline font-semibold">
              ← View Privacy Policy
            </Link>
            <Link to="/contact" className="text-gold hover:text-burgundy font-semibold">
              Have Questions? Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </ShopPageShell>
  );
}
