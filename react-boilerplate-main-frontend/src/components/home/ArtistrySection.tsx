import { images } from "../../constants/images";
import { BotanicalPetal, FloralCorner } from "../decor/BotanicalAssets";

const cards = [
  {
    title: "Original Paintings",
    cta: "View the Collection →",
    image: images.paintings,
    alt: "Original greeting card artwork — angel with lantern",
  },
  {
    title: "Inspired Candles",
    cta: "Discover the Scents →",
    image: images.candles,
    alt: "Handcrafted soy candles with gold lids and storybook labels",
  },
  {
    title: "Greeting Cards",
    cta: "Send the Feeling →",
    image: images.cards,
    alt: "Original storybook greeting card illustration",
  },
];

/** Product category frames — copy lives on the Greeting Cards gallery */
export default function ArtistrySection() {
  return (
    <section
      id="artistry"
      className="relative section-pad bg-champagne overflow-hidden"
      aria-label="The Artistry collections"
    >
      <FloralCorner
        corner="tl"
        className="absolute left-0 top-0 w-[min(180px,28vw)] opacity-[0.36] hidden md:block"
      />
      <FloralCorner
        corner="br"
        className="absolute right-0 bottom-0 w-[min(180px,28vw)] opacity-[0.34] hidden md:block"
      />
      <BotanicalPetal
        className="absolute right-2 top-[22%] h-36 opacity-[0.42] hidden md:block"
        flip
        rotate={15}
      />
      <BotanicalPetal
        className="absolute left-2 bottom-[18%] h-32 opacity-[0.38] hidden md:block"
        rotate={-20}
      />

      <div className="container-editorial relative z-[1]">
        <div
          id="artistry-cards"
          className="mx-auto grid max-w-4xl grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6"
        >
          {cards.map((card) => (
            <a key={card.title} href="#shop" className="group block text-center">
              <div className="frame-ornate">
                <div className="frame-ornate-inner">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="img-zoom absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="mt-4 font-serif text-[0.8rem] tracking-[0.22em] uppercase text-ink">
                {card.title}
              </h3>
              <p className="mt-2 font-serif italic text-[0.88rem] text-taupe group-hover:text-burgundy transition-colors duration-500">
                {card.cta}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
