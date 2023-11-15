"use client";

import React, { useEffect, useRef, useState } from "react";
import { getEmailLink, getCreateEmailLink } from "@/lib/send";
import useMediaQuery from "@/hooks/useMediaQuery";
import Tabs from "./Tabs";

export enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [selectedTab, setSelectedTab] = useState<"create" | "send" | "deposit">(
    "create",
  );

  useEffect(() => {
    if (localStorage.getItem("code")) {
      setSelectedTab("send");
    }
  }, []);

  return (
    <>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </>
  );
};

export default Form;
