import InfoGraph from "./components/InfoGraph";

const AboutPage = () => {
  return (
    <section className="mx-auto flex max-w-screen-xl items-center py-20">
      <div className="mx-auto flex flex-col items-center px-6">
        <h1 className="mb-8 w-[70%] text-center text-3xl font-semibold md:text-5xl md:leading-snug">
          Secured by Advanced Cryptography
        </h1>
        <h3 className="w-[50%] text-center text-muted-foreground">
          Secured by zero knowledge proofs on Ethereum. Private by default.
        </h3>
        <InfoGraph />
      </div>
    </section>
  );
};

export default AboutPage;
