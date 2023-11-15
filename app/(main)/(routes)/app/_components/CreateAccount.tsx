import { getCreateEmailLink } from "@/lib/send";
import { useState } from "react";
import BlueButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateAccount: React.FC<{
  setSelectedTab: (tab: "create" | "send" | "deposit") => void;
}> = ({ setSelectedTab }) => {
  const [email, setEmail] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [emailProviderName, setEmailProviderName] = useState("");
  const [emailSearchLink, setEmailSearchLink] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div
      className={
        "flex w-[375px] flex-col items-center gap-[1.25rem] rounded-[2rem] bg-black p-[2rem] sm:w-full"
      }
    >
      <h3 className={`text-[1.625rem] font-bold text-white`}>Create Account</h3>
      <div className={"leading-5 text-[#878AA1]"}>
        Simply email a relayer to create your account.
      </div>
      <div className={"flex flex-col gap-2.5"}>
        <div className={"flex items-center gap-2.5"}>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={`rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center placeholder-[#5C5E71]`}
            placeholder={"Your Email Address"}
            type="email"
          />
          <BlueButton
            className="py-6"
            onClick={async () => {
              console.log(email);
              const [name, sendLink, viewLink] =
                await getCreateEmailLink(email);
              setEmailProviderName(name);
              setEmailSearchLink(viewLink);
              setEmailLink(sendLink);
              if (sendLink) {
                window.open(sendLink, "_blank");
              }
              setSent(true);
            }}
          >
            Create Account
          </BlueButton>
        </div>
        <div className="flex w-full items-start">
          <Button
            onClick={() => setSelectedTab("send")}
            className="w-full bg-tertiary text-white hover:bg-tertiary/80"
          >
            {sent
              ? "Sent? Go to 'Send Money' tab ➜"
              : "Already created? Go to 'Send Money' tab ➜"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
