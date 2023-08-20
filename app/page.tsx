"use client";
import { useEffect, useRef, useState } from "react";

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

enum Currency {
  USDC,
  DAI,
  TEST,
}

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);

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
    <div>
      <nav className="flex justify-between py-4 px-6">
        <div className="text-lg font-bold">Sendeth</div>
        <div className="flex gap-4">
          <a
            href="https://docs.sendeth.org"
            className="text-blue-500 hover:underline"
          >
            Docs
          </a>
          <a
            href="https://github.com/zkemail/sendeth"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </div>
      </nav>
      <div className="flex flex-col text-center py-8 sm:py-24">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-4xl font-medium">Send money</h1>
            <h2 className="text-slate-500">
              All you need to do is email the relayer!
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-lg w-full p-2.5 bg-slate-200 flex justify-between">
              <input
                type="number"
                placeholder="Amount to send"
                // onChange={(e) => {
                //   setAmount(Math.round(Number(e.target.value)));
                // }}
                onChange={handleAmountChange}
                onBlur={handleAmountChange}
                className="text-sm bg-slate-200 focus:outline-none"
                value={amount || ""}
              />

              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
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
                          currency === Currency.USDC
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
                          currency === Currency.DAI
                        )}
                        role="menuitem"
                        onClick={() => {
                          setCurrency(Currency.DAI);
                          setDropdownOpen(false);
                        }}
                      >
                        DAI
                      </span>
                      <span
                        className={getCurrencyOptionClass(
                          currency === Currency.TEST
                        )}
                        role="menuitem"
                        onClick={() => {
                          setCurrency(Currency.TEST);
                          setDropdownOpen(false);
                        }}
                      >
                        TEST
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <input
              type="email"
              className="text-sm rounded-lg block w-full p-2.5 
            bg-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="friend@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => {
                setEmail(e.target.value);
              }}
            />

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=relayer@sendeth.org&su=Send%20${amount}%20${Currency[currency]}%20to%20${email}`}
              target="_blank"
              className={
                amount && amount > 0 && isValidEmail(email)
                  ? "bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg h-12 flex border border-blue-500 text-white px-4 py-2 gap-4 items-center justify-center ease-in-out hover:transition-all hover:scale-105"
                  : "bg-gray-300 px-4 py-2 gap-4 items-center rounded-lg h-12 flex text-gray-500 justify-center pointer-events-none"
              }
            >
              Send via Gmail
            </a>
            {amount && amount > 0 && isValidEmail(email) && (
              <div className="flex flex-col gap-2 mt-4 p-4 bg-slate-100 rounded-md items-start">
                <div className="flex">
                  <span className="text-slate-500">To:</span>
                  <span className="ml-2 text-left">relayer@sendeth.org</span>
                </div>
                <div className="flex">
                  <span className="text-slate-500">Subject:</span>
                  <span className="ml-2 text-left">{`Send ${amount} ${Currency[currency]} to ${email}`}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
