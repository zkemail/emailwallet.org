import Form from "./components/Form";
import NavBar from "./components/NavBar";

export default function SendMoney() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col py-8 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Send money</h1>
            <h2 className="text-slate-500">
              This tool will send money from your currently logged-in email
              address, by formatting an email to the relayer and including the
              amount and recipient in your subject! Everyone starts with 10 TEST
              tokens.
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
