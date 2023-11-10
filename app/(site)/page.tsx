import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LandingPageNavbar from "@/components/navigation/LandingPageNavbar";

const Home: React.FC = () => {
  return (
    <div className="h-full ">
      <LandingPageNavbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Home;