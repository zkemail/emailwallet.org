import { setAccountCode } from "@/lib/send";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const accountCode = searchParams.get("accountCode");
    console.log("Storing: ", email, accountCode);
    if (email && accountCode) {
      setAccountCode(email, accountCode);
    }
  }, [searchParams]); // Depend on the mounted state
};

export default useQueryParams;
