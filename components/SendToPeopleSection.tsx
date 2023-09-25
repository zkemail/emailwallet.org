const SendToPeopleSection = () => {
  return (
    <section className="mx-8 flex max-w-screen-lg items-center max-md:text-end md:mx-20">
      <div className="mb-20 ml-auto flex flex-col gap-6 md:basis-[50%]">
        <h1 className="text-3xl font-semibold md:text-4xl">
          Send to people outside the system.
        </h1>
        <p className="text-sm text-muted-foreground">
          Send to anyone with an email address, whether or not they have an
          account with us yet.
        </p>
      </div>
    </section>
  );
};

export default SendToPeopleSection;
