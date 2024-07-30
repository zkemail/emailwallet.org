import { useState, useRef, useEffect } from "react";
import { getWalletAddress, recoverAccountCode } from "@/lib/callRelayerAPI";
import ClickButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail, setAccountCode } from "@/lib/send";
import ToolTip from "@/components/ToolTip";

const LoginAccount: React.FC<{
  setSelectedTab: (tab: "login" | "view" | "deposit" | "send") => void;
  setSignedInState: (state: boolean) => void;
}> = ({ setSelectedTab, setSignedInState }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const accountCodeRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isManuallyEnteringCode, setIsManuallyEnteringCode] =
    useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isValidEmailState, setIsValidEmailState] = useState<boolean>(false);

  useEffect(() => {
    const checkInputFields = () => {
      const email = emailRef.current?.value;
      const accountCode = accountCodeRef.current?.value;
      if (
        (!isManuallyEnteringCode && email) ||
        (isManuallyEnteringCode && accountCode && email)
      ) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    checkInputFields();
  }, [emailRef, accountCodeRef, isManuallyEnteringCode]);

  const handleLogin = async () => {
    setLoading(true);
    const email = emailRef.current?.value || "";
    const responseMessage = await recoverAccountCode(email);
    setLoading(false);
    if (responseMessage === "Account key recovery email sent") {
      setStatusMessage(
        "Login email sent successfully. Please check your inbox.",
      );
    } else {
      setStatusMessage("Failed to send login email. Please try again.");
    }
  };

  const handleManualLogin = async () => {
    setLoading(true);
    const email = emailRef.current?.value || "";
    const accountCode = accountCodeRef.current?.value || "";

    const address = await getWalletAddress(email, accountCode);
    setLoading(false);
    if (address !== "No address found") {
      setAccountCode(email, accountCode);
      setLoggedIn(true);
      setSelectedTab("send");
      setSignedInState(true);
    } else {
      setStatusMessage(
        "Failed to log in. Please check your email for account code and login manually.",
      );
    }
  };

  return (
    <div className="flex w-[375px] flex-col items-center gap-[1.25rem] rounded-[2rem] bg-black p-[2rem] sm:w-full md:w-1/2">
      <h3 className="text-center text-[1.625rem] font-bold text-white">
        Log In
      </h3>
      <div className="flex flex-col gap-2.5">
        <Input
          ref={emailRef}
          className="h-[48px] rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] text-center text-white placeholder-[#5C5E71]"
          placeholder="Your Email Address"
          type="email"
          onChange={() => {
            const isEmailValid: boolean =
              isValidEmail(emailRef.current?.value || "") ||
              !isManuallyEnteringCode ||
              accountCodeRef.current?.value !== "";
            setIsButtonDisabled(!isEmailValid);
            setIsValidEmailState(isEmailValid || false);
          }}
        />
        {isManuallyEnteringCode && (
          <ToolTip text="You can find code in any of your emails" side="right">
            <Input
              ref={accountCodeRef}
              className="h-[48px] rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] text-center text-white placeholder-[#5C5E71]"
              placeholder="Your Account Code"
              type="text"
              onChange={() =>
                setIsButtonDisabled(
                  !(emailRef.current?.value && accountCodeRef.current?.value),
                )
              }
            />
          </ToolTip>
        )}
        <ToolTip
          text="This will send an email with a link to login on this device"
          side="top"
        >
          <ClickButton
            className="h-[48px] text-primary"
            onClick={isManuallyEnteringCode ? handleManualLogin : handleLogin}
            disabled={isButtonDisabled || loading}
          >
            {loading
              ? "Logging in..."
              : loggedIn
                ? "Logged In ✔"
                : isManuallyEnteringCode
                  ? "Login"
                  : "Send Login Email"}
          </ClickButton>
        </ToolTip>
        {statusMessage && (
          <div
            className={`text-center ${
              statusMessage.toLowerCase().includes("fail") ? "text-red-500" : ""
            }`}
          >
            {statusMessage}
          </div>
        )}
        <ToolTip
          text={
            isManuallyEnteringCode
              ? "Switch to login by receiving an email."
              : "Switch to login via the code previously emailed to you."
          }
          side="bottom"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsManuallyEnteringCode(!isManuallyEnteringCode);
            }}
            className="text-sm text-[#5C5E71] hover:text-white"
          >
            {isManuallyEnteringCode ? "Login without Code" : "Login with Code"}
          </a>
        </ToolTip>
      </div>
    </div>
  );
};

export default LoginAccount;
