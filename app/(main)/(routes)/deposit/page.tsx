import Form from "./components/Form";
import Nav from "./components/NavBar";

export default function Deposit() {
  return (
    <div>
      <div className="flex flex-col py-8 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="mb-8 mt-[-8]">
            <Nav />
          </div>

          <div className="flex flex-col gap-2 pb-8 ">
            <h1 className="text-4xl font-medium">Deposit money</h1>
            <h2 className="text-muted-foreground">
              This deposits money from your currently logged-in email address.
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
