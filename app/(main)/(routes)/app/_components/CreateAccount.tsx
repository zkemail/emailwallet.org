import { getCreateEmailLink } from "@/lib/send";
import { useState, useEffect } from "react";
import BlueButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolTip from "@/components/ToolTip";

const CreateAccount: React.FC<{
  setSelectedTab: (tab: "create" | "send" | "deposit") => void;
}> = ({ setSelectedTab }) => {
  const [email, setEmail] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [emailProviderName, setEmailProviderName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailSearchLink, setEmailSearchLink] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const [name, sendLink, viewLink, subject] = getCreateEmailLink(email);
    setEmailProviderName(name);
    setEmailSearchLink(viewLink);
    setEmailLink(sendLink);
    setSubject(subject);

    if (sendLink?.startsWith("mailto:")) {
      const emailLink = document.getElementById("emailLink");
      if (!emailLink) return;

      emailLink.addEventListener("click", function (event: any) {
        var timeout: NodeJS.Timeout;

        window.addEventListener("blur", function () {
          clearTimeout(timeout);
          setSent(true);
        });

        timeout = setTimeout(function () {
          const inst = document.getElementById("manualInstructions");
          if (!inst) return;
          inst.style.display = "block";
        }, 500);
      });
    } else {
      setSent(true);
    }
  }, [email]);

  function copyText(e: any) {
    const target = e.target;
    if (!target) return;

    navigator.clipboard.writeText(target.innerText);
  }

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
        {/* w-1/2 `Create Account` pops out your default email client with your private code in the subject. */}
      </div>
      <div className={"flex flex-col gap-2.5"}>
        <div className={"flex items-center gap-2.5"}>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={`rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center text-white placeholder-[#5C5E71]`}
            placeholder={"Your Email Address"}
            type="email"
          />
          <ToolTip text="This will open your default email client, with your private code in the subject.">
            <a
              id="emailLink"
              href={emailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BlueButton
                className="py-6 text-primary"
                onClick={async () => {
                  console.log(email);
                  // setSent(true);
                }}
              >
                {sent ? "Created ✔" : "Create"}
              </BlueButton>
            </a>
          </ToolTip>
        </div>

        <div
          id="manualInstructions"
          className="manual-instructions bg-secondary"
          style={{ display: "none" }}
        >
          <p>We were not able to able to open your email client.</p>
          <p>
            You can create an account by sending an email to
            <div>
              <code className="bg-tertiary" onClick={copyText}>
                arbitrum@sendeth.org
              </code>
            </div>
            <p> with subject</p>
            <div>
              <code className="bg-tertiary" onClick={copyText}>
                {subject}
              </code>
            </div>
          </p>
        </div>
        <div className="flex w-full items-start">
          <Button
            onClick={() => setSelectedTab("send")}
            className="hover:bg-neutral/80 w-full border border-solid border-primary bg-secondary text-primary"
          >
            {sent
              ? "Sent email? Go to 'Send Money' tab ➜"
              : "Created? Go to 'Send Money' tab ➜"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
