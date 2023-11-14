"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

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

  function getEmailLink(
    email: string,
    subject: string,
    body: string,
  ): [string, string] {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "zkewtest@gmail.com",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
      ];
    }

    if (fromEmail.endsWith("@gmail.com")) {
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          "zkewtest@gmail.com",
        )}&su=${encodedSubject}&body=${encodedBody}`,
      ];
    } else if (
      fromEmail.endsWith("@outlook.com") ||
      fromEmail.endsWith("@hotmail.com")
    ) {
      return [
        "Outlook",
        `https://outlook.live.com/mail/0/compose?to=${encodeURIComponent(
          "zkewtest@gmail.com",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
      ];
    } else if (
      fromEmail.endsWith("@protonmail.com") ||
      fromEmail.endsWith("@proton.me") ||
      fromEmail.endsWith("@pm.me")
    ) {
      return [
        "Protonmail (manually copy-paste from below)",
        `https://mail.protonmail.com/compose?to=${encodeURIComponent(
          "zkewtest@gmail.com",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
      ];
    } else {
      // Default to mailto: if the domain is not recognized
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          "zkewtest@gmail.com",
        )}&su=${encodedSubject}&body=${encodedBody}`,
      ];
    }
  }

  const [emailProviderName, emailLink] = getEmailLink(
    fromEmail,
    `Send ${amount} ${Currency[currency]} to ${toEmail}`,
    "",
  );

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
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-1/2">
        <div className="h-15 mb-2 flex w-full justify-between rounded-lg bg-secondary p-2.5 px-5 ">
          <input
            type="number"
            placeholder="Amount to withdraw"
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

        <div className="mt-2 flex w-full items-start ">
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

        <div className="mb-4 mt-2 flex w-full items-start">
          <input
            id="to_email"
            type="email"
            className="h-15 block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary"
            placeholder="Wallet address"
            onChange={(e) => {
              setToEmail(e.target.value);
            }}
            onBlur={(e) => {
              setToEmail(e.target.value);
            }}
          />
        </div>

        {countdown ? (
          <div className="my-4 text-center">
            <p className="text-lg font-bold">
              Expect a response in {countdown} seconds...
            </p>
          </div>
        ) : null}

        <a
          href={emailLink}
          target="_blank"
          onClick={() => {
            setEmailSent(true);
            setCountdown(60);
            const intervalId = setInterval(() => {
              setCountdown((prevCountdown) =>
                prevCountdown ? prevCountdown - 1 : null,
              );
            }, 1000);
            setTimeout(() => {
              clearInterval(intervalId);
              setCountdown(null);
            }, 60000);
          }}
          // Default hidden on large screens
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "flex h-12 w-full items-center justify-center gap-4 rounded-lg border border-blue-500 bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white ease-in-out hover:scale-105 hover:transition-all sm:hidden sm:w-1/2"
              : "rounded-1/2 mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-4 rounded-lg border-[1px] border-[#3d4f7c] bg-gray-300 p-2 px-4 py-2 text-slate-50 hover:bg-[#3d4f7c] sm:hidden"
          }
        >
          {countdown ? `Failed? Re-send via Gmail` : `Send via Mail App`}
        </a>
        <a
          href={
            !countdown
              ? emailLink
              : `mailto:zkewtest@gmail.com?subject=Send%20${amount}%20${Currency[currency]}%20to%20${toEmail}`
          }
          target="_blank"
          onClick={() => {
            setEmailSent(true);
            setCountdown(60);
            const intervalId = setInterval(() => {
              setCountdown((prevCountdown) =>
                prevCountdown ? prevCountdown - 1 : null,
              );
            }, 1000);
            setTimeout(() => {
              clearInterval(intervalId);
              setCountdown(null);
            }, 60000);
          }}
          // Default hidden in small screens
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "hidden h-12 w-full items-center justify-center gap-4 rounded-lg bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white drop-shadow transition ease-in-out hover:scale-105 hover:transition-all sm:flex sm:w-1/2"
              : "rounded-1/2 mt-2 hidden h-12 w-full cursor-pointer items-center  justify-center gap-4 rounded-lg border-[1px] border-[#3d4f7c] p-2 px-4 py-2 text-slate-50 hover:bg-[#3d4f7c] sm:flex"
          }
        >
          {countdown
            ? `Failed? Re-send via default mail app:`
            : `Send via ${
                fromEmail.split("@")[1] ? fromEmail.split("@")[1] : "Gmail"
              }`}
        </a>

        {emailSent && (
          <div className="flex w-full items-start">
            <a
              href="https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org"
              target="_blank"
              className="flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-t from-tertiary to-tertiary-foreground px-4 py-2 text-primary drop-shadow transition ease-in-out hover:scale-105 hover:transition-all dark:text-primary-foreground"
            >
              View Sent Email
            </a>
          </div>
        )}

        {amount && amount > 0 && isValidEmail(toEmail) && (
          <div className="mt-4 flex flex-col items-start gap-2 rounded-md bg-slate-100 p-4">
            <div className="flex">
              <span className="text-slate-500">To:</span>
              <span className="ml-2 text-left text-slate-700">
                zkewtest@gmail.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("zkewtest@gmail.com");
                  document
                    .getElementById("copyIcon1")
                    ?.setAttribute("src", "https://i.imgur.com/17wupld.png");
                }}
              >
                <img
                  id="copyIcon1"
                  src="/copy.png"
                  alt="Copy to clipboard"
                  style={{ height: "1em", marginLeft: "0.5em" }}
                />
              </button>
            </div>
            <div className="flex">
              <span className="text-slate-500">Subject:</span>
              <span className="ml-2 text-left text-slate-700">{`Send ${amount} ${Currency[currency]} to ${toEmail}`}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Send ${amount} ${Currency[currency]} to ${toEmail}`,
                  );
                  document
                    .getElementById("copyIcon2")
                    ?.setAttribute("src", "https://i.imgur.com/17wupld.png");
                }}
              >
                <img
                  id="copyIcon2"
                  src="/copy.png"
                  alt="Copy to clipboard"
                  style={{ height: "1em", marginLeft: "0.5em" }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
