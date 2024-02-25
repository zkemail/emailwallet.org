import { useState, useRef } from "react";
import { getAddress } from "@/lib/callRelayerAPI";
import CreateButton from "./BlueButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginAccount: React.FC<{
  setSelectedTab: (tab: "login" | "view" | "deposit") => void;
}> = ({ setSelectedTab }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const accountCodeRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    const email = emailRef.current?.value;
    const accountCode = accountCodeRef.current?.value;
    if (!email || !accountCode) {
      alert("Please fill in both fields.");
      setLoading(false);
      return;
    }

    const address = await getAddress(email, accountCode);
    setLoading(false);
    if (address !== "No address found") {
      setLoggedIn(true);
      setSelectedTab("view");
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
        />
        <Input
          ref={accountCodeRef}
          className="h-[48px] rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] text-center text-white placeholder-[#5C5E71]"
          placeholder="Your Account Code"
          type="text"
        />
        <CreateButton
          className="h-[48px] text-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : loggedIn ? "Logged In ✔" : "Login"}
        </CreateButton>
      </div>
    </div>
  );
};

export default LoginAccount;
