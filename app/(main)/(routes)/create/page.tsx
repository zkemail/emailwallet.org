import Form from "./components/Form";
import Nav from "../app/components/NavBar";

export default function Withdraw() {
  return (
    <div>
      <div className="flex flex-col py-4 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="mb-8">
            <Nav />
          </div>
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Create Account</h1>
            <h2 className="text-muted-foreground">
              Simply email a relayer to create your account.
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
