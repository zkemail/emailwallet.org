import Form from "./_components/Form";

export default function SendMoneyPage() {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center gap-[2rem] py-[5rem] sm:py-24">
        <h1 className="text-4xl font-medium">Send Money via Email</h1>
        <h2 className="w-1/2 text-center text-muted-foreground">
          Just send emails from your currently logged-in email address! Everyone
          starts with 100 TEST tokens (and 5 USDC during ProgCrypto!).
          <br />
          <br />
          This 2-week demo experiment on Optimism mainnet will shut down on
          November 28, 2023. Make sure to withdraw your money by then!
        </h2>
        <Form />
      </div>
    </div>
  );
}
