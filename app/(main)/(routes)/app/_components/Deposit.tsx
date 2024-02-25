import { useEffect, useRef, useState } from "react";
import CreateButton from "./BlueButton";
import { Currency } from "./Form";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import { getWalletFromEmail } from "@/lib/send";

const Deposit: React.FC<{
  setSelectedTab: (tab: "login" | "send" | "deposit" | "view") => void;
}> = ({ setSelectedTab }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  const dropdownRef = useRef(null);

  function getCurrencyOptionClass(selected: boolean): string {
    const baseClasses =
      "text-gray-50 block px-4 py-2 text-sm m-2 rounded-md cursor-pointer hover:transition-all";
    return selected
      ? `${baseClasses} bg-gray-700`
      : `${baseClasses} hover:bg-gray-700`;
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

  useEffect(() => {
    const fetchAddress = async () => {
      const email = localStorage.getItem("loggedInUser");
      if (email) {
        const addr = await getWalletFromEmail(email);
        setAddress(addr);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div
      className={
        "flex w-[375px] flex-col items-stretch gap-[1.25rem] rounded-[2rem] bg-black p-[2rem] sm:w-full"
      }
    >
      <h3 className={`text-center text-[1.625rem] font-bold text-white`}>
        Deposit Money
      </h3>
      {!address ? (
        <div className="mx-auto w-1/2 self-center text-center text-white">
          To optionally top-up your wallet address, send additional funds
          directly to your address mentioned in your confirmation emails.
        </div>
      ) : (
        <div className="mx-auto w-1/2 self-center text-center text-white">
          <p>To send assets to your wallet, send funds to this address:</p>
          <br />
          <div className="flex flex-col items-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
              alt="QR Code"
            />
            <p>{address}</p>
          </div>
        </div>
      )}
      <div className={"grid grid-cols-4 grid-rows-2 gap-2.5"}>
        {/* <input
          className={`col-span-3 rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center text-white placeholder-[#5C5E71]`}
          placeholder={"Amount to Deposit"}
          type="number"
        />
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex h-full w-full items-center justify-center rounded-md border-[1px] border-solid border-[#515364] text-white"
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
          className={`col-span-4 rounded-md border-[1px] border-solid border-[#515364] bg-transparent px-[1.5rem] py-[0.625rem] text-center text-white placeholder-[#5C5E71]`}
          placeholder={"Your Email Address"}
          type="email"
        />
      </div>
      <BlueButton className={`w-full`} onClick={() => {}}>
        Open Wallet to Deposit Money
      </BlueButton> */}
      </div>
    </div>
  );
};

export default Deposit;
