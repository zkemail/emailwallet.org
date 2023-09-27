import HeroSection from "@/components/HeroSection";
import SendToPeopleSection from "@/components/SendToPeopleSection";
import YouOwnMoneySection from "@/components/YouOwnMoneySection";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl md:mx-auto">
      <HeroSection />
      <YouOwnMoneySection />
      <SendToPeopleSection />
    </div>
  );
};

export default HomePage;
