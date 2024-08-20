"use client";

import ExportedImage from "next-image-export-optimizer";
import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";
import { sendAsset, transferNFT } from "@/lib/callRelayerAPI";
import { getEmailLink, isValidAddress, isValidEmail } from "@/lib/send";
import { useEffect, useRef, useState } from "react";
import { getTokenBalancesForAddress, getNftsForAddress } from "@/lib/chain";
import ClickButton from "./BlueButton";
import TabButton from "./TabButtons";
import SmallTabButton from "./SmallTabButtons";
import { NFTOption, TokenOption } from "@/lib/chain";
import Loader from "./Loader";
import Image from "next/image";

const Send = () => {
  const [fromEmail, setFromEmail] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [selectedAssetString, setSelectedAssetString] = useState<
    string | null
  >(); // Selected ERC20
  const [selectedNFT, setSelectedNFT] = useState<NFTOption>(); // Selected NFT
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [awaitingSend, setAwaitingSend] = useState<boolean>(false);
  const [tokenOptions, setTokenOptions] = useState<TokenOption[]>([]);
  const [nftOptions, setNftOptions] = useState<NFTOption[]>([]);
  const [assetType, setAssetType] = useState("ERC20");
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [isAssetLoading, setIsAssetLoading] = useState<boolean>(false);

  const dropdownRef = useRef(null);
  const countdownMax = 120;

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
    if (Number(value) > 100 && selectedAssetString === "TEST") {
      setAmount(100);
    }
  }

  useEffect(() => {
    setIsAssetLoading(true);

    const fetchTokenOptions = async () => {
      const tokens = await getTokenBalancesForAddress();
      // Assuming getTokenBalancesForAddress returns an array of { key, text, value }
      setTokenOptions(tokens);
      return tokens;
    };

    const fetchNftOptions = async () => {
      const formattedNfts = await getNftsForAddress();
      console.log(formattedNfts);
      setNftOptions(formattedNfts);
      return formattedNfts;
    };

    if (assetType === "ERC20") {
      fetchTokenOptions().then((tokens) => {
        setIsAssetLoading(false);
        if (!tokens.length) {
          setSelectedAssetString(null);
          return;
        }
        setSelectedAssetString(tokens[0]?.id || "");
        setMaxAmount(Number(tokens[0]?.balance || 0));
      });
    } else if (assetType === "NFT") {
      fetchNftOptions().then((nfts) => {
        setIsAssetLoading(false);
        if (!nfts.length) {
          setSelectedAssetString(null);
          return;
        }
        setSelectedAssetString(
          nfts[0]?.id
            ? `${nfts[0]?.id} - #${nfts[0]?.tokenId}`
            : `#${nfts[0]?.tokenId}`,
        );
        setMaxAmount(1);
      });
    }
  }, [assetType]); // This effect depends on assetType, it runs when assetType changes

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
    <div className="z-50 flex w-full flex-col rounded-[calc(var(--radius)_+_10px)] border border-white bg-black md:w-2/3">
      <div
        className="flex w-full justify-between text-[1rem] font-medium text-primary"
        // style={{ borderRadius: "0.5625rem 0.5625rem 0 0" }}
      >
        <div className="flex w-full justify-between">
          <SmallTabButton
            selected={assetType === "ERC20"}
            onClick={() => setAssetType("ERC20")}
          >
            ERC20s
          </SmallTabButton>
          <SmallTabButton
            selected={assetType === "NFT"}
            onClick={() => setAssetType("NFT")}
          >
            NFTs
          </SmallTabButton>
        </div>
      </div>
      <div className="flex flex-col gap-4   px-4">
        {isAssetLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="flex w-full items-start px-3 pr-4 pt-4">
              <input
                id="to_email"
                type="text"
                className={`h-${
                  assetType == "NFT" ? "15" : "20"
                } block w-full rounded-lg bg-secondary p-5 text-sm text-slate-700 ${
                  isValidEmail(recipient) || isValidAddress(recipient)
                    ? "border-green-500 text-green-600"
                    : "border-pink-500 text-pink-600"
                } focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary`}
                placeholder="To: recipient@... OR 0x..."
                onChange={(e) => {
                  const value = e.target.value;
                  const isEmail =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/.test(
                      value,
                    );
                  const isAddress = /^0x[a-fA-F0-9]{40}$/.test(value);
                  if (isEmail || isAddress) {
                    setRecipient(value);
                  } else {
                    setRecipient("");
                    // Optionally, show some error feedback here
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  const isEmail =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/.test(
                      value,
                    );
                  const isAddress = /^0x[a-fA-F0-9]{40}$/.test(value);
                  if (isEmail || isAddress) {
                    setRecipient(value);
                  } else {
                    setRecipient("");
                    // Optionally, show some error feedback here
                  }
                }}
              />
            </div>
            <div className="flex w-full items-start px-3 pr-4 pt-4">
              <div className="relative flex w-full items-center rounded-md">
                <input
                  type="number"
                  placeholder="Amount to send"
                  onChange={handleAmountChange}
                  onBlur={handleAmountChange}
                  value={amount || ""}
                  className={`w-full rounded-lg border-gray-300 bg-secondary p-5 text-sm text-slate-700 shadow-sm ${
                    isValidEmail(recipient) || isValidAddress(recipient)
                      ? "border-green-500 text-green-600"
                      : "border-pink-500 text-pink-600"
                  } focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none dark:text-primary`}
                />

                <button
                  type="button"
                  className="absolute bottom-0 right-0 top-0 m-2 flex items-center justify-center rounded-lg border-gray-300 bg-gray-200 bg-opacity-10 p-2 shadow-sm"
                  id="menu-button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  disabled={!selectedAssetString}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row">
                      {selectedAssetString ??
                        `No ${assetType === "ERC20" ? "tokens" : "NFTs"} available`}
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
                    </div>
                    {assetType === "ERC20" && (
                      <span className="text-xs text-gray-500">
                        (Max: {maxAmount.toFixed(2)})
                      </span>
                    )}
                  </div>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-full z-10 mt-1 max-h-60 min-w-40 overflow-y-auto rounded-b-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1">
                      {assetType === "NFT"
                        ? nftOptions.map((nft) => (
                            <div
                              key={
                                nft.id
                                  ? `${nft.id} - #${nft.tokenId}`
                                  : `#${nft.tokenId}`
                              }
                              className={`flex cursor-pointer items-center p-3 hover:bg-gray-100 ${
                                selectedAssetString ===
                                (nft.id
                                  ? `${nft.id} - #${nft.tokenId}`
                                  : `#${nft.tokenId}`)
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              role="menuitem"
                              onClick={() => {
                                setSelectedAssetString(
                                  nft.id
                                    ? `${nft.id} - #${nft.tokenId}`
                                    : `#${nft.tokenId}`,
                                );
                                setSelectedNFT(nft);
                                setDropdownOpen(false);
                              }}
                            >
                              <Image
                                src={
                                  nft.url
                                    ? nft.url
                                    : "https://www.jubmoji.quest/images/logo.svg"
                                }
                                alt="NFT icon"
                                className="mr-3 h-8 w-8"
                              />
                              <span className="text-sm font-medium">
                                {nft.id
                                  ? `${nft.id} - #${nft.tokenId}`
                                  : `Unknown NFT - #${nft.tokenId}`}
                              </span>
                            </div>
                          ))
                        : tokenOptions.map((token) => (
                            <span
                              key={token.contractAddress}
                              className={`block cursor-pointer px-4 py-3 text-sm hover:bg-gray-100 ${
                                selectedAssetString === token.id
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              role="menuitem"
                              onClick={() => {
                                setSelectedAssetString(
                                  token.id || token.contractAddress,
                                );
                                setMaxAmount(Number(token.balance));
                                setDropdownOpen(false);
                              }}
                            >
                              {token.id}
                            </span>
                          ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full items-center justify-center py-3">
              <ToolTip text="This will send an email to confirm the transaction.">
                <ClickButton
                  className="h-[48px] text-primary"
                  onClick={() => {
                    setAwaitingSend(true);
                    const sendInfo =
                      assetType === "ERC20"
                        ? (amount || 0).toString()
                        : selectedNFT?.tokenId || "";
                    const assetID: string =
                      assetType === "ERC20"
                        ? (selectedAssetString ?? "").toString()
                        : selectedNFT?.contractAddress || ""; // Using enum name instead of index
                    const recipientAddr = recipient; // Since we're sending to an email, recipient address is the email itself
                    const sendFunction =
                      assetType === "ERC20" ? sendAsset : transferNFT;

                    sendFunction(sendInfo, assetID, recipientAddr)
                      .then((result) => {
                        setStatus(
                          "Send queued, confirm transfer in your email.",
                        );
                        setAwaitingSend(false);
                      })
                      .catch((error) => {
                        console.error(`Failed to send ${assetType}:`, error);
                        setStatus(
                          `Failed to send ${assetType}. Please try again.`,
                        );
                        setAwaitingSend(false);
                      });
                    // Logic to handle sending email to confirm the transaction
                  }}
                  disabled={
                    !selectedAssetString ||
                    awaitingSend ||
                    (!isValidEmail(recipient) && !isValidAddress(recipient))
                  }
                >
                  Send Confirmation Email
                </ClickButton>
              </ToolTip>
            </div>
            <div className="flex w-full items-center justify-center pb-3">
              {status}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Send;
