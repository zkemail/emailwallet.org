"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

enum Currency {
  USDC,
  DAI,
}

const Form = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.USDC);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);

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
    if (Number(value) > 100 && currency === Currency.USDC) {
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
    <div className="flex flex-col items-center justify-center gap-4">
      {connected ? (
        <>
          <div className="w-2/3">
            <div className="h-15 flex w-full justify-between rounded-lg bg-secondary p-2.5 px-5">
              <input
                type="number"
                placeholder="Amount to deposit"
                // onChange={(e) => {
                //   setAmount(Math.round(Number(e.target.value)));
                // }}
                onChange={handleAmountChange}
                onBlur={handleAmountChange}
                className="bg-secondary text-sm text-primary focus:outline-none"
                value={amount || ""}
              />

              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
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

            <div className="mt-4 flex w-full items-start sm:w-full">
              <input
                id="from_email"
                type="email"
                className="h-15 block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary"
                placeholder="Your email address"
                onChange={(e) => {
                  setFromEmail(e.target.value);
                }}
                onBlur={(e) => {
                  setFromEmail(e.target.value);
                }}
              />
            </div>

            {approved ? (
              <button
                type="submit"
                className="rounded-1/2 mt-2 w-full cursor-pointer border-[1px] border-[#3d4f7c] p-2 text-white hover:bg-[#3d4f7c]"
              >
                Deposit {amount}{" "}
                {currency === Currency.USDC
                  ? "USDC"
                  : currency === Currency.DAI
                  ? "DAI"
                  : ""}
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-bottom mb-4 mt-2 w-full cursor-pointer border-[1px] border-[#3d4f7c] p-2.5 text-white hover:bg-[#3d4f7c]"
                onClick={() => setApproved(true)}
              >
                Approve
              </button>
            )}
            <p className="mb-2 w-full p-2.5 text-sm text-blue-400 ">
              0x89...fr5e
            </p>
          </div>
        </>
      ) : (
        <button
          type="submit"
          className="rounded-bottom mb-4 mt-8 w-1/2 cursor-pointer border-[1px] border-[#3d4f7c] bg-orange-500 p-2.5 text-white hover:bg-orange-300"
          onClick={() => setConnected(true)}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default Form;
