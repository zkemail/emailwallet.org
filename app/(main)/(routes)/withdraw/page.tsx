import Form from "./components/Form";
import Nav from "./components/NavBar";

export default function Withdraw() {
  return (
    <div>
      <div className="flex flex-col py-4 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="mb-8">
            <Nav />
          </div>
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Withdraw money</h1>
            <h2 className="text-muted-foreground">
              This withdraws money from your currently logged-in email address,
              by emailing the relayer with the amount and recipient in your
              subject!
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
