import Form from "./_components/Form";

export default function SendMoneyPage() {
  return (
    <div className="mb-24 sm:h-full">
      <div className="flex flex-col py-8 text-center sm:py-24">
        <div className="mx-auto max-w-3xl p-4">
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Send money</h1>
            <h2 className="text-muted-foreground">
              This sends money from your currently logged-in email address, by
              emailing the relayer with the amount and recipient in your
              subject! Everyone starts with 100 TEST tokens.
            </h2>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
