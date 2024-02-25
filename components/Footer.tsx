"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [result, setResult] = useState("none");

  const subscribe = async () => {
    // TODO: Fix cors hack
    setResult("pending");
    const proxy = `https://cors-proxy.fringe.zone/`;

    // Subscriptions accessible at https://docs.google.com/spreadsheets/d/16idprh-H11HqqDG6RHg0Fk_wLi9DWYXwIzI_3Bewpe4/edit
    const url = `https://script.google.com/macros/s/AKfycbwFEpszXsb5PPsc6mrls71fWI4o6RAbV64okWWZ6yZBcv960oF-3ITi7-hw-5wA6ptV/exec`;
    const response = await fetch(proxy + url, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.result === "success") {
      setResult("success");
    } else {
      setResult("none");
    }
  };

  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center gap-10 overflow-clip border-t bg-tertiary px-4 py-10 max-md:gap-10 md:px-32 lg:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col items-center gap-y-10 max-lg:text-center lg:items-start">
          <div className="flex flex-col items-center gap-y-3 md:gap-x-2 lg:flex-row">
            <Mail size={60} />
            <h1 className="text-4xl font-bold text-primary">Stay Tuned</h1>
          </div>

          <p className="w-full text-foreground lg:w-4/5">
            Subscribe and stay up-to-date on the latest developer news
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-1 flex-col items-center gap-4 lg:mt-4">
        <div className="flex w-full flex-col gap-3 lg:flex-row">
          <Input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="w-full"
            placeholder="First name"
          />
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full"
            placeholder="Email Address"
          />
        </div>
        <Button
          className={`w-full rounded-full ${
            email && firstName && result == "none"
              ? ""
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={subscribe}
        >
          {result == "success"
            ? "Subscribed ✔️"
            : result == "pending"
            ? "Subscribing..."
            : "Subscribe"}
        </Button>
        <span className="text-center text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </span>
      </div>
    </section>
  );
};

export default Footer;
