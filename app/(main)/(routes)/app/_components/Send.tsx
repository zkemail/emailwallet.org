"use client";

import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";
import { sendAsset } from "@/lib/callRelayerAPI";
import { getEmailLink } from "@/lib/send";
import { useEffect, useRef, useState } from "react";
import ClickButton from "./BlueButton";

enum Currency {
  USDC,
  DAI,
  TEST,
}

const Send = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [awaitingSend, setAwaitingSend] = useState<boolean>(false);

  const dropdownRef = useRef(null);
  const countdownMax = 120;

  function isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
    return regex.test(email);
  }

  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-700 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-slate-100`
      : `${baseClasses} hover:bg-slate-100`;
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setAmount(undefined);
      return;
    }
    if (!Number.isInteger(Number(value))) {
      const roundedValue = Math.floor(Number(value));
      setAmount(roundedValue);
    } else {
      setAmount(Number(value));
    }
    if (Number(value) > 100 && currency === Currency.TEST) {
      setAmount(100);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex w-full items-start">
        {/* <label
          htmlFor="subject_email"
          className="mr-2 flex items-center justify-center px-2 py-5 text-sm font-bold text-primary"
        >
          Subject:
        </label> */}
        <div className="h-15 flex w-full justify-between rounded-lg bg-secondary p-2.5 px-5">
          <input
            type="number"
            placeholder="Amount to send"
            // onChange={(e) => {
            //   setAmount(Math.round(Number(e.target.value)));
            // }}
            onChange={handleAmountChange}
            onBlur={handleAmountChange}
            className="bg-secondary text-sm text-primary focus:outline-none"
            value={amount || ""}
          />

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <Button
                type="button"
                className="gap-x-1 font-semibold shadow-sm"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {Currency[currency]}
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
            {dropdownOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <span
                    className={getCurrencyOptionClass(
                      currency === Currency.TEST,
                    )}
                    role="menuitem"
                    onClick={() => {
                      setCurrency(Currency.TEST);
                      setDropdownOpen(false);
                    }}
                  >
                    TEST
                  </span>
                  <span
                    className={getCurrencyOptionClass(
                      currency === Currency.USDC,
                    )}
                    role="menuitem"
                    onClick={() => {
                      setCurrency(Currency.USDC);
                      setDropdownOpen(false);
                    }}
                  >
                    USDC
                  </span>
                  <span
                    className={getCurrencyOptionClass(
                      currency === Currency.DAI,
                    )}
                    role="menuitem"
                    onClick={() => {
                      setCurrency(Currency.DAI);
                      setDropdownOpen(false);
                    }}
                  >
                    DAI
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-start">
        <label
          htmlFor="to_email"
          className="mr-2 flex items-center justify-center px-2 py-5 text-sm font-bold text-primary"
        >
          To:
        </label>
        <input
          id="to_email"
          type="email"
          className="h-15 block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary"
          placeholder="recipient@... OR 0x..."
          onChange={(e) => {
            setToEmail(e.target.value);
          }}
          onBlur={(e) => {
            setToEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full items-center justify-center ">
        <ToolTip text="This will send an email to confirm the transaction.">
          <ClickButton
            className="h-[48px] text-primary"
            onClick={() => {
              setAwaitingSend(true);
              const email = toEmail;
              const amountToSend = (amount || 0).toString();
              const tokenId = Currency[currency]; // Using enum name instead of index
              const recipientAddr = email; // Since we're sending to an email, recipient address is the email itself

              sendAsset(amountToSend, tokenId.toString(), recipientAddr)
                .then((result) => {
                  setStatus("Send queued, confirm transfer in your email.");
                  setAwaitingSend(false);
                })
                .catch((error) => {
                  console.error("Failed to send asset:", error);
                  setStatus("Failed to send asset. Please try again.");
                  setAwaitingSend(false);
                });
              // Logic to handle sending email to confirm the transaction
            }}
            disabled={awaitingSend}
          >
            Send Confirmation Email
          </ClickButton>
        </ToolTip>
      </div>
      <div className="flex w-full items-center justify-center ">{status}</div>
    </div>
  );
};

export default Send;
