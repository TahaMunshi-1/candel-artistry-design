import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/home/Hero";
import ExperienceSelector from "../../components/home/ExperienceSelector";
import CandleMakingSection from "../../components/home/CandleMakingSection";
import GreetingCardsGallery from "../../components/home/GreetingCardsGallery";

const Home = () => {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Header />
      <main>
        <Hero />
        <ExperienceSelector />
        <CandleMakingSection />
        <GreetingCardsGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
