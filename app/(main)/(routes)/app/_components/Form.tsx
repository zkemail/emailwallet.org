"use client";

import React, { useEffect, useState } from "react";
import { isSignedIn } from "../../../../../lib/send";
import Tabs from "./Tabs";

export enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "create" | "send" | "deposit" | "view" | "login"
  >("view");
  const [signedInState, setSignedInState] = useState(false);
  useEffect(() => {
    const checkSignIn = async () => {
      const signedIn = await isSignedIn();
      setSignedInState(signedIn);
    };

    // Run once on load
    checkSignIn();

    window.addEventListener("storage", checkSignIn);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("storage", checkSignIn);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accountKey")) {
      setSelectedTab("send");
    }

    setIsMounted(true);
  }, []);

  // prevent hydration errors
  if (!isMounted) return null;

  return (
    <>
      <Tabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setSignedInState={setSignedInState}
        isSignedIn={signedInState}
      />
    </>
  );
};

export default Form;
