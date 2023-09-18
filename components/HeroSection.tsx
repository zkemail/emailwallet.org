import Image from "next/image";
import { Button } from "./ui/button";
import AirplaneImages from "./AirplaneImages";
import Balls from "./Balls";

const HeroSection = () => {
  return (
    <section className="mt-32 flex justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={"/backgroundhero.png"}
          alt={"background image"}
          fill
          className="hidden object-fill md:block"
        />
      </div>
      <Balls />

      <div className="flex flex-col items-center gap-20 px-6 md:flex-row md:px-10">
        <div className="flex basis-[60%] flex-col gap-y-8">
          <h1 className="text-6xl font-semibold leading-tight">
            Email money to{" "}
            <span className="rounded-xl bg-tertiary px-2">anyone.</span>
          </h1>
          <h3 className="text-lg text-muted-foreground">
            We use zk proofs to ensure you own your money.
          </h3>
          <div className="flex gap-4">
            <Button className="rounded-lg bg-tertiary px-8 text-primary hover:bg-tertiary/80">
              Try Demo
            </Button>
            <Button className="rounded-lg border-2 px-8" variant={"outline"}>
              Read Docs
            </Button>
          </div>
        </div>

        <AirplaneImages />
      </div>
    </section>
  );
};

export default HeroSection;
