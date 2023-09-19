"use client";

import { useEffect, useRef, useState } from "react";

enum Currency {
  USDC,
  DAI,
  TEST,
}

const Form = () => {
  const [email, setEmail] = useState<string>("");
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
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between rounded-lg bg-slate-200 p-2.5">
        <input
          type="number"
          placeholder="Amount to send"
          // onChange={(e) => {
          //   setAmount(Math.round(Number(e.target.value)));
          // }}
          onChange={handleAmountChange}
          onBlur={handleAmountChange}
          className="bg-slate-200 text-sm text-slate-700 focus:outline-none"
          value={amount || ""}
        />

        <div className="relative inline-block text-left" ref={dropdownRef}>
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
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        type="email"
        className="block w-full rounded-lg bg-slate-200 p-2.5 
  text-sm text-slate-700 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
  focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
  disabled:border-slate-200 disabled:bg-slate-50
  disabled:text-slate-500 disabled:shadow-none"
        placeholder="recipient@email.address"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onBlur={(e) => {
          setEmail(e.target.value);
        }}
      />

      <a
        href={`mailto:relayer@sendeth.org?subject=Send%20${amount}%20${Currency[currency]}%20to%20${email}`}
        target="_blank"
        // Hidden hides it on large screens
        className={
          amount && amount > 0 && isValidEmail(email)
            ? "flex h-12 items-center justify-center gap-4 rounded-lg border border-blue-500 bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white ease-in-out hover:scale-105 hover:transition-all sm:hidden"
            : "pointer-events-none flex h-12 items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-50 sm:hidden"
        }
      >
        Send via Mail App
      </a>
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=relayer@sendeth.org&su=Send%20${amount}%20${Currency[currency]}%20to%20${email}`}
        // Default hidden in small screens
        className={
          amount && amount > 0 && isValidEmail(email)
            ? "hidden h-12 items-center justify-center gap-4 rounded-lg border border-blue-500 bg-green-500 bg-gradient-to-t from-blue-600 to-blue-500 px-4 py-2 text-white ease-in-out hover:scale-105 hover:transition-all sm:flex"
            : "pointer-events-none hidden h-12 items-center justify-center gap-4 rounded-lg bg-gray-300 px-4 py-2 text-slate-50 sm:flex"
        }
      >
        Send via Gmail
      </a>
      {amount && amount > 0 && isValidEmail(email) && (
        <div className="mt-4 flex flex-col items-start gap-2 rounded-md bg-slate-100 p-4">
          <div className="flex">
            <span className="text-slate-500">To:</span>
            <span className="ml-2 text-left text-slate-700">
              relayer@sendeth.org
            </span>
          </div>
          <div className="flex">
            <span className="text-slate-500">Subject:</span>
            <span className="ml-2 text-left text-slate-700">{`Send ${amount} ${Currency[currency]} to ${email}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
