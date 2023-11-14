import Form from "./_components/Form";

export default function SendMoneyPage() {
  return (
    <div className="mb-56 h-full">
      <div className="gap- flex flex-col items-center gap-[5rem] py-[5rem] sm:py-24">
        <h1 className="text-4xl font-medium">Send Money via Email</h1>
        <h2 className=" text-center text-muted-foreground">
          This sends money from your currently logged-in email address, by
          emailing the relayer with the amount and recipient in your subject!
          <br /> Everyone starts with 100 TEST tokens.
        </h2>
        <Form />
      </div>
    </div>
  );
}
