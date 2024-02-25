import { createAccount, isAccountCreated } from "@/lib/callRelayerAPI";
import { useState, useRef } from "react";
import CreateButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolTip from "@/components/ToolTip";
import { useCountdown } from "usehooks-ts";
import { setAccountCode } from "@/lib/send";

const CreateAccount: React.FC<{
  setSelectedTab: (
    tab: "create" | "send" | "deposit" | "view" | "login",
  ) => void;
  setSignedInState: (state: boolean) => void;
}> = ({ setSelectedTab, setSignedInState }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  // Whether the request has been sent
  const [sent, setSent] = useState(false);

  //Countdown timer hook
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 61,
    intervalMs: 1000,
  });

  const handleCreate = async () => {
    const email = emailRef.current?.value;
    setSent(true);
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    setStatus("Sending confirmation email...");
    const response = await createAccount(email);
    setStatus("Sent! Waiting for reply...");
    if (response === "Account creation successful") {
      setAccountCode(email, response);
      setSignedInState(true);
      startPolling(); //Start create timer
    } else {
      setSent(false);
    }
  };

  const startPolling = async () => {
    let accountCreated = false;
    const maxAttempts = 300;
    let attempts = 0;

    while (!accountCreated && attempts < maxAttempts) {
      attempts++;
      try {
        const result = await isAccountCreated(emailRef.current?.value || "");
        if (result === "Account exists") {
          accountCreated = true;
          setStatus("Account successfully created!");
          setSelectedTab("view");
          setSignedInState(true);
          break;
        } else {
          console.log(
            `Attempt ${attempts}: Account not created yet. Polling again in 1 second...`,
          );
          // Wait for 1 second before the next poll
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      } catch (error) {
        console.error("Error polling account creation status:", error);
        setStatus("Error checking account creation status. Please try again.");
        setSent(false);
        return;
      }
    }

    if (!accountCreated) {
      setStatus("Account creation timed out. Please try again.");
      setSent(false);
    }
  };

  return (
    <div
      className={
        "flex w-[375px] flex-col items-center gap-[1.25rem] rounded-[2rem] bg-black p-[2rem] sm:w-full"
      }
      style={{ display: "block" }}
    >
      <h3 className={`text-center text-[1.625rem] font-bold text-white`}>
        Create Account
      </h3>
      <div className={"mb-3 text-center leading-5 text-[#878AA1]"}>
        Email a relayer to create an account.
      </div>

      <div className={"flex flex-col gap-2.5"}>
        <div className={"flex items-center gap-2.5"}>
          <div className="flex flex-col gap-2.5">
            <Input
              ref={emailRef}
              className={`h-[48px] rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] text-center text-white placeholder-[#5C5E71]`}
              placeholder={"Your Email Address"}
              type="email"
            />
          </div>

          <ToolTip text="This will create your account.">
            <CreateButton
              className="h-[48px] text-primary"
              onClick={async () => {
                await handleCreate();
                // Reset countdown to dismiss countdown message
                setTimeout(() => {
                  resetCountdown();
                }, 121000);
              }}
              disabled={sent}
            >
              {sent ? "Creating..." : "Create"}
            </CreateButton>
          </ToolTip>
        </div>

        {/* <div className="flex w-full items-start">
          <Button
            onClick={() => setSelectedTab("send")}
            className="hover:bg-neutral/80 w-full border border-solid border-primary bg-secondary text-primary"
          >
            {sent
              ? "Replied to email? Go to 'Send Money' tab ➜"
              : "Create account to proceed to 'Send Money' tab ➜"}
          </Button>
        </div> */}
      </div>

      {status && (
        <div className="my-4 text-center">
          <p className="text-lg font-medium">{status}</p>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
