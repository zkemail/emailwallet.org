import { useState, useRef, useEffect } from "react";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import CreateButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAccountCode } from "@/lib/send";

const LoginAccount: React.FC<{
  setSelectedTab: (tab: "login" | "view" | "deposit") => void;
  setSignedInState: (state: boolean) => void;
}> = ({ setSelectedTab, setSignedInState }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const accountCodeRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    const checkInputFields = () => {
      const email = emailRef.current?.value;
      const accountCode = accountCodeRef.current?.value;
      if (email && accountCode) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    checkInputFields();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const email = emailRef.current?.value || "";
    const accountCode = accountCodeRef.current?.value || "";

    const address = await getWalletAddress(email, accountCode);
    setLoading(false);
    if (address !== "No address found") {
      setAccountCode(email, accountCode);
      setLoggedIn(true);
      setSelectedTab("view");
      setSignedInState(true);
    } else {
      alert("Failed to log in. Please check your email and account code.");
    }
  };

  return (
    <div className="flex w-[375px] flex-col items-center gap-[1.25rem] rounded-[2rem] bg-black p-[2rem] sm:w-full">
      <h3 className="text-center text-[1.625rem] font-bold text-white">
        Login Account
      </h3>
      <div className="flex flex-col gap-2.5">
        <Input
          ref={emailRef}
          className="h-[48px] rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] text-center text-white placeholder-[#5C5E71]"
          placeholder="Your Email Address"
          type="email"
          onChange={() =>
            setIsButtonDisabled(
              !(emailRef.current?.value && accountCodeRef.current?.value),
            )
          }
        />
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
        <CreateButton
          className="h-[48px] text-primary"
          onClick={handleLogin}
          disabled={isButtonDisabled || loading}
        >
          {loading ? "Logging in..." : loggedIn ? "Logged In ✔" : "Login"}
        </CreateButton>
      </div>
    </div>
  );
};

export default LoginAccount;
