import Form from "./components/Form";
import Nav from "./components/NavBar";

export default function SendMoneyPage() {
  return (
    <div className="mb-24 sm:h-full">
      <div className="flex flex-col py-8 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="mb-8">
            <Nav />
          </div>
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Send Money via Emails</h1>
            <h2 className="text-muted-foreground">
              Each email address will have a smart contract wallet deployed for
              them, but your email address will not be revealed on-chain.
              Everyone starts with 100 TEST tokens.
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
