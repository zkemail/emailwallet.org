import Form from "./_components/Form";

export default function SendMoneyPage() {
  return (
    <div className="mb-10 px-2.5">
      <div className="flex flex-col items-center gap-[2rem] py-[5rem] sm:py-24">
        <h1 className="text-center text-4xl font-medium">
          Send Assets via Email
        </h1>
        <h2 className="mx-auto w-11/12 text-center text-muted-foreground sm:w-1/2">
          Create your account and send assets, by replying to emails. Your email
          address will not be posted on-chain. We cannot control your assets,
          only your emails can. Everyone starts with 100 TEST tokens on the
          ZKSync Sepolia testnet.
        </h2>
        <div className="text-center text-sm text-muted-foreground">
          By using this service, you agree to our{" "}
          <a
            href="/terms-of-service.html"
            target="_blank"
            className="underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy.html" target="_blank" className="underline">
            Privacy Policy
          </a>
          .
        </div>
        <Form />
      </div>
    </div>
  );
}
