import HeroSection from "@/components/HeroSection";
import SendToPeopleSection from "@/components/SendToPeopleSection";
import StayUpToDate from "@/components/StayUpToDate";
import YouOwnMoneySection from "@/components/YouOwnMoneySection";

const HomePage = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <HeroSection />
      <YouOwnMoneySection />
      <SendToPeopleSection />
      <StayUpToDate />
    </div>
  );
};

export default HomePage;
