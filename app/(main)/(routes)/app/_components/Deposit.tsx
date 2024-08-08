import { useEffect, useRef, useState } from "react";
// import CreateButton from "./BlueButton";
import { Currency } from "./Form";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import { getLoggedInEmail, getWalletFromEmail } from "@/lib/send";
import Loader from "./Loader";
import ToolTip from "@/components/ToolTip";

const Deposit: React.FC<{
  setSelectedTab: (tab: "login" | "send" | "deposit" | "view") => void;
}> = ({ setSelectedTab }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.TEST);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [isFetchAddressLoading, setIsFetchAddressLoading] =
    useState<boolean>(false);

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
      const email = getLoggedInEmail();
      if (email) {
        setIsFetchAddressLoading(true);
        const addr = await getWalletFromEmail(email);
        setAddress(addr);
        setIsFetchAddressLoading(false);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div
      className={
        "flex w-full flex-col items-stretch gap-[1.25rem] rounded-[calc(var(--radius)_+_10px)] border border-white bg-black p-[2rem] md:w-2/3"
      }
    >
      <h3 className={`text-center text-[1.625rem] font-bold text-white`}>
        Deposit Assets
      </h3>
      {isFetchAddressLoading ? (
        <Loader />
      ) : (
        <>
          {!address ? (
            <div className="mx-auto w-full self-center text-center text-white md:w-1/2">
              To optionally top-up your wallet address, send additional funds or
              NFTs directly to your address mentioned in your confirmation
              emails.
            </div>
          ) : (
            <div className="mx-auto w-full self-center text-center text-white md:w-1/2">
              <p>
                To send assets to your wallet, send funds or NFTs to this
                address:
              </p>
              <br />
              <div className="flex flex-col items-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`}
                  alt="QR Code"
                />
                <br />
                <div className="flex w-full flex-row items-center">
                  <p
                    className="overflow-hidden text-ellipsis"
                    style={{ height: "fit-content" }}
                  >
                    {address}
                  </p>
                  <ToolTip text="Copy to clipboard">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(address);
                      }}
                      className="pulsetarget mt-2 px-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 text-[#515364]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        />
                      </svg>
                    </button>
                  </ToolTip>
                </div>
              </div>
            </div>
          )}
        </>
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
