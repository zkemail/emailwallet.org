"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

enum Currency {
  USDC,
  DAI,
  TEST,
}

const TabButton: React.FC<{
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = (props) => {
  return (
    <div
      style={{
        background: props.selected
          ? `linear-gradient(179deg, rgba(255, 255, 255, 0.20) 0.8%, rgba(255, 255, 255, 0.00) 144.46%)`
          : "",
      }}
      className={`cursor-pointer rounded-md px-[1rem] py-[0.625rem]`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const Tabs: React.FC<{
  selectedTab: string;
  setSelectedTab: (tab: "create" | "send" | "deposit") => void;
}> = ({ setSelectedTab, selectedTab }) => {
  return (
    <div className={"flex flex-col items-center gap-[1.5rem]"}>
      <div
        className={
          "font- flex items-center gap-5 p-[0.625rem] text-[1rem] font-medium"
        }
        style={{ borderRadius: "0.5625rem", background: "#000" }}
      >
        <TabButton
          selected={selectedTab === "create"}
          onClick={() => {
            setSelectedTab("create");
          }}
        >
          Create
        </TabButton>
        <TabButton
          selected={selectedTab === "send"}
          onClick={() => {
            setSelectedTab("send");
          }}
        >
          Send
        </TabButton>
        <TabButton
          selected={selectedTab === "deposit"}
          onClick={() => {
            setSelectedTab("deposit");
          }}
        >
          Deposit
        </TabButton>
      </div>
      {selectedTab === "create" && <CreateAccount />}
      {selectedTab === "send" && <CreateAccount />}
      {selectedTab === "deposit" && <Deposit />}
    </div>
  );
};

const BlueButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = (props) => {
  return (
    <button
      style={{
        background: `linear-gradient(180deg, #4D94FF 0%, #1766DC 100%)`,
      }}
      className={`rounded-[0.5625rem] px-[1.1875rem] py-2.5 font-medium ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const Deposit: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-50 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-gray-700`
      : `${baseClasses} hover:bg-gray-700`;
  }

  return (
    <div
      className={
        "flex w-[27rem] flex-col items-stretch gap-[1.25rem] rounded-[2rem] bg-black p-[2rem]"
      }
    >
      <h3 className={`text-center text-[1.625rem] font-bold`}>Deposit Money</h3>
      <div className={"grid grid-cols-4 grid-rows-2 gap-2.5"}>
        <input
          className={`col-span-3 rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center placeholder-[#5C5E71]`}
          placeholder={"Amount to Deposit"}
          type="number"
        />
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex h-full w-full items-center justify-center rounded-md border-[1px] border-solid border-[#515364]"
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
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1
               ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <span
                  className={getCurrencyOptionClass(currency === Currency.TEST)}
                  role="menuitem"
                  onClick={() => {
                    setCurrency(Currency.TEST);
                    setDropdownOpen(false);
                  }}
                >
                  TEST
                </span>
                <span
                  className={getCurrencyOptionClass(currency === Currency.USDC)}
                  role="menuitem"
                  onClick={() => {
                    setCurrency(Currency.USDC);
                    setDropdownOpen(false);
                  }}
                >
                  USDC
                </span>
                <span
                  className={getCurrencyOptionClass(currency === Currency.DAI)}
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
        <input
          className={`col-span-4 rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center placeholder-[#5C5E71]`}
          placeholder={"Your Email Address"}
          type="email"
        />
      </div>
      <BlueButton className={`w-full`} onClick={() => {}}>
        Create Account
      </BlueButton>
    </div>
  );
};

const CreateAccount: React.FC = () => {
  return (
    <div
      className={
        "flex flex-col items-center gap-[1.25rem]  rounded-[2rem] bg-black p-[2rem]"
      }
    >
      <h3 className={`text-[1.625rem] font-bold`}>Create Account</h3>
      <div className={"leading-5 text-[#878AA1]"}>
        Simply email a relayer to create your account.
      </div>
      <div className={"flex gap-2.5"}>
        <input
          className={`rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center placeholder-[#5C5E71]`}
          placeholder={"Your Email Address"}
          type="email"
        />
        <BlueButton
          onClick={() => {
            window.location.href = "mailto:relayer@sendeth.org";
          }}
        >
          Create Account
        </BlueButton>
      </div>
    </div>
  );
};

const Form = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-700 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-slate-100`
      : `${baseClasses} hover:bg-slate-100`;
  }
  const countdownMax = 120;

  function isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
    return regex.test(email);
  }

  function getEmailLink(
    email: string,
    subject: string,
    body: string,
  ): [string, string, string] {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "relayer@sendeth.org",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
        ``,
      ];
    }

    if (fromEmail.endsWith("@gmail.com")) {
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&su=${encodedSubject}&body=${encodedBody}`,
        `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
      ];
    } else if (
      fromEmail.endsWith("@outlook.com") ||
      fromEmail.endsWith("@hotmail.com")
    ) {
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "relayer@sendeth.org",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
        `https://outlook.live.com/mail/0/sentitems`,
      ];
    } else if (fromEmail.endsWith("@yahoo.com")) {
      return [
        "Yahoo Mail",
        `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
        `https://mail.yahoo.com/d/search/keyword=relayer@sendeth.org`,
      ];
    } else if (
      fromEmail.endsWith("@protonmail.com") ||
      fromEmail.endsWith("@proton.me") ||
      fromEmail.endsWith("@pm.me")
    ) {
      return [
        "Protonmail [copy over details below!]",
        `https://mail.proton.me/u/0/`,
        `https://mail.proton.me/u/0/almost-all-mail#keyword=relayer@sendeth.org`,
      ];
    } else {
      // Default to Gmail? (not mailto:) if the domain is not recognized, since most orgs are on gmail
      return [
        "Gmail",
        `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
          "relayer@sendeth.org",
        )}&su=${encodedSubject}&body=${encodedBody}`,
        `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
      ];
    }
  }

  const [emailProviderName, emailLink, emailSearchLink] = getEmailLink(
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

  const [selectedTab, setSelectedTab] = useState<"create" | "send" | "deposit">(
    "create",
  );

  return (
    <>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full items-start sm:w-1/2">
          <label
            htmlFor="from_email"
            className="mr-2 flex items-center justify-center py-5 text-sm font-bold text-primary"
          >
            From:
          </label>
          <input
            id="from_email"
            type="email"
            className="h-15 block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary"
            placeholder="from@your.email.address"
            onChange={(e) => {
              setFromEmail(e.target.value);
            }}
            onBlur={(e) => {
              setFromEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex w-full items-start sm:w-1/2">
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
            placeholder="to@recipient.email.address"
            onChange={(e) => {
              setToEmail(e.target.value);
            }}
            onBlur={(e) => {
              setToEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full items-start sm:w-1/2">
          {/* <label
          htmlFor="subject_email"
          className="mr-2 flex items-center justify-center px-2 py-5 text-sm font-bold text-primary"
        >
          Subject:
        </label> */}
          <div className="h-15 flex w-1/2 w-full justify-between rounded-lg bg-secondary p-2.5 px-5">
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
          </div>
        </div>

        {
          <>
            <p className="mt-2 text-lg font-bold">Email Template</p>
            <div className="flex flex-col items-start gap-2 rounded-md bg-slate-100 p-4">
              <div className="flex">
                <span className="text-slate-500">Cc:</span>
                <span className="ml-2 text-left text-slate-700">
                  relayer@sendeth.org
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("relayer@sendeth.org");
                    document
                      .getElementById("copyIcon1")
                      ?.setAttribute("src", "/checkmark.png");
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
                <span className="ml-2 text-left text-slate-700">
                  {amount && amount > 0 && isValidEmail(toEmail)
                    ? `Send ${amount} ${Currency[currency]} to ${toEmail}`
                    : `...`}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Send ${amount} ${Currency[currency]} to ${toEmail}`,
                    );
                    document
                      .getElementById("copyIcon2")
                      ?.setAttribute("src", "/checkmark.png");
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
          </>
        }

        {emailSent ? (
          <>
            <div className="my-4 text-center">
              <p className="text-lg font-bold">
                {countdown
                  ? `Expect a response in ${countdown} seconds...`
                  : "Done processing!"}
              </p>
            </div>
            <p className="text-md mt-2">or...</p>
          </>
        ) : (
          <p className="text-md mt-2">or...</p>
        )}

        {
          <>
            <p className="text-lg font-bold">Auto-Format Email</p>
            <p className="text-md w-2/3">
              This will format the email for you to send money from a new tab
              (desktop) or your default mail app (mobile)!
            </p>
          </>
        }

        {emailSent && (
          <div className="flex w-full items-start sm:w-1/2">
            <a
              href={emailSearchLink}
              target="_blank"
              className={
                emailSearchLink
                  ? "flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-t from-tertiary to-tertiary-foreground px-4 py-2 text-primary drop-shadow transition ease-in-out hover:scale-105 hover:transition-all dark:text-primary-foreground"
                  : "pointer-events-none flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-50"
              }
            >
              {emailSearchLink
                ? `View Sent Email in ${emailProviderName} ➜`
                : `View your sent email for updates!`}
            </a>
          </div>
        )}

        {/* Default hidden on large screens. Small screen div; default to mailto regardless. */}
        <a
          href={
            countdown == 0 || countdown == null || countdownMax - countdown < 2
              ? `mailto:relayer@sendeth.org?subject=Send%20${amount}%20${Currency[currency]}%20to%20${toEmail}`
              : emailLink
          }
          target="_blank"
          onClick={() => {
            setEmailSent(true);
            setCountdown(countdownMax);
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
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "flex h-12 w-full items-center justify-center gap-4 rounded-lg border border-blue-500 bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white ease-in-out hover:scale-105 hover:transition-all sm:hidden sm:w-1/2"
              : "pointer-events-none flex h-12 w-full items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-500 sm:hidden sm:w-1/2"
          }
        >
          {emailSent
            ? `Failed? Re-send via ${emailProviderName}`
            : `Send via default mail app`}
        </a>

        {/* // Default hidden in small screens */}
        <a
          href={
            countdown == 0 || countdown == null || countdownMax - countdown < 2
              ? emailLink
              : `mailto:relayer@sendeth.org?subject=Send%20${amount}%20${Currency[currency]}%20to%20${toEmail}`
          }
          target="_blank"
          onClick={() => {
            setEmailSent(true);
            setCountdown(countdownMax);
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
          className={
            amount && amount > 0 && isValidEmail(toEmail)
              ? "hidden h-12 w-full items-center justify-center gap-4 rounded-lg bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white drop-shadow transition ease-in-out hover:scale-105 hover:transition-all sm:flex sm:w-1/2"
              : "pointer-events-none hidden h-12 w-full items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-500 sm:flex sm:w-1/2"
          }
        >
          {!emailSent
            ? `Send via ${emailProviderName}`
            : `Failed? Re-send via default mail app`}
        </a>
      </div>
    </>
  );
};

export default Form;
