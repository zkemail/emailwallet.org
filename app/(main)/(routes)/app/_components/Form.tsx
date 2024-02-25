"use client";

import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";

export enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"create" | "send" | "deposit">(
    "create",
  );

  useEffect(() => {
    if (localStorage.getItem("code")) {
      setSelectedTab("send");
    }

    setIsMounted(true);
  }, []);

  // prevent hydration errors
  if (!isMounted) return null;

  return (
    <>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </>
  );
};

export default Form;
