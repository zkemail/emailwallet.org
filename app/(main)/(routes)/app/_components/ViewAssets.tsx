import { useEffect, useMemo, useState } from "react";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import { Alchemy, Network } from "alchemy-sdk";
import { getWallet, isValidAddress } from "@/lib/send";
import ExportedImage from "next-image-export-optimizer";

const ViewAssets: React.FC<{
  setSelectedTab: (
    tab: "login" | "view" | "deposit" | "create" | "send",
  ) => void;
}> = ({ setSelectedTab }) => {
  // const [email, setEmail] = useState<string | null>(null);
  // const [accountKey, setAccountKey] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [nfts, setNfts] = useState<any[]>([]);
  const [erc20s, setErc20s] = useState<any[]>([]);
  const [nftsVisible, setNftsVisible] = useState<boolean>(true);
  const [erc20sVisible, setErc20sVisible] = useState<boolean>(true);

  // OOWUrxHDTRyPmbYOSGyq7izHNQB1QYOv
  const alchemy = useMemo(() => {
    const config = {
      apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
      network: Network.BASE_SEPOLIA, // Replace with your target network
    };
    return new Alchemy(config);
  }, []);

  useEffect(() => {
    const handleStorageChange = async () => {
      setAddress(await getWallet());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    // Initial fetch
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, []);

  // TODO: Make these calls to chain.ts
  useEffect(() => {
    if (isValidAddress(address)) {
      alchemy.nft.getNftsForOwner(address).then((res) => {
        const updatedNfts = res.ownedNfts.map((nft) => ({
          ...nft,
          image:
            nft.image?.cachedUrl || "https://www.jubmoji.quest/images/logo.svg",
        }));
        console.log("NFTs for owner:", updatedNfts);
        setNfts(updatedNfts);
      });
      alchemy.core.getTokenBalances(address).then((res) => {
        const tokenDetailsPromises = res.tokenBalances.map((token) =>
          alchemy.core
            .getTokenMetadata(token.contractAddress)
            .then((metadata) => ({
              contractAddress: token.contractAddress,
              tokenBalance: (
                parseInt(token.tokenBalance || "0", 16) /
                Math.pow(10, metadata.decimals || 18)
              ).toFixed(3),
              id: metadata.symbol, // Abbreviated name
              decimals: metadata.decimals || 18,
            })),
        );
        Promise.all(tokenDetailsPromises).then((enrichedTokens) => {
          console.log("All tokens for owner with details:", enrichedTokens);
          setErc20s(enrichedTokens);
        });
      });
    }
  }, [address, alchemy]);
  return (
    <div className="flex w-full flex-col px-4 py-8 md:w-2/3">
      <h2 className="text-3xl font-medium text-gray-800 dark:text-white">
        Your Assets
      </h2>
      <section className="mt-6 w-full">
        <div
          className="space-between flex cursor-pointer items-center gap-2"
          onClick={() => setNftsVisible(!nftsVisible)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 opacity-60"
            transform={nftsVisible ? "rotate(0)" : "rotate(270)"}
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-medium opacity-60">NFTs</span>
        </div>
        {nftsVisible && (
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {nfts.map((nft, index) => (
              <div key={index} className="relative flex flex-col">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.title || "NFT Image"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute bottom-0 flex w-full flex-col gap-2 rounded-b-md bg-gradient-to-t from-neutral-950/100 via-neutral-950/75 to-neutral-950/0  p-4">
                  <p className="font-medium text-white">
                    {nft.name + " #" + nft.tokenId}
                  </p>
                  <button
                    onClick={() => setSelectedTab("send")}
                    className="w-full rounded-md bg-indigo-500 px-6 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-indigo-600"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-6 w-full">
        <div
          className="space-between flex cursor-pointer items-center gap-2"
          onClick={() => setErc20sVisible(!erc20sVisible)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 opacity-60"
            transform={erc20sVisible ? "rotate(0)" : "rotate(270)"}
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-medium opacity-60">ERC20 Tokens</span>
        </div>
        {erc20sVisible && (
          <div className="mt-4 flex w-full flex-col gap-4">
            {erc20s.map((token, index) => (
              <div
                key={index}
                className="flex w-full items-center rounded-xl p-4 transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <div className="flex w-full flex-col gap-1">
                  <span className="font-semibold">{token.id}</span>
                  <span className="opacity-60">{token.tokenBalance}</span>
                </div>
                <button
                  onClick={() => setSelectedTab("send")}
                  className="rounded-md bg-green-500 px-6 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-green-600 dark:bg-neutral-600 hover:dark:bg-neutral-500"
                >
                  Transfer
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewAssets;
