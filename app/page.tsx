import HeroSection from "@/components/HeroSection";
import SendToPeopleSection from "@/components/SendToPeopleSection";
import YouOwnMoneySection from "@/components/YouOwnMoneySection";

const HomePage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <HeroSection />
      <YouOwnMoneySection />
      <SendToPeopleSection />
    </div>
  );
};

export default HomePage;
