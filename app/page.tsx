import HeroSection from "@/components/HeroSection";
import SendToPeopleSection from "@/components/SendToPeopleSection";
import YouOwnMoneySection from "@/components/YouOwnMoneySection";
import GlobalSection from "@/components/GlobalSection";

const HomePage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <HeroSection />
      <YouOwnMoneySection />
      <SendToPeopleSection />
      <GlobalSection />
    </div>
  );
};

export default HomePage;
