import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/home/Hero";
import ExperienceSelector from "../../components/home/ExperienceSelector";
import FeaturedCollection from "../../components/home/FeaturedCollection";
import GreetingCardsGallery from "../../components/home/GreetingCardsGallery";
import ProductShowcase from "../../components/home/ProductShowcase";
import CandleMakingSection from "../../components/home/CandleMakingSection";
import OurStory from "../../components/home/OurStory";

const Home = () => {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Header />
      <main>
        <Hero />
        <ExperienceSelector />
        <FeaturedCollection />
        <ProductShowcase />
        <OurStory />
        <CandleMakingSection />
        <GreetingCardsGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
