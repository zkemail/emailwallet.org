import { useEffect, useMemo, useState } from "react";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import { Alchemy, Network } from "alchemy-sdk";

const ViewAssets: React.FC<{
  setSelectedTab: (tab: "login" | "view" | "deposit") => void;
}> = ({ setSelectedTab }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [accountKey, setAccountKey] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [nfts, setNfts] = useState<any[]>([]);
  const [erc20s, setErc20s] = useState<any[]>([]);
  const [nftsVisible, setNftsVisible] = useState<boolean>(true);
  const [erc20sVisible, setErc20sVisible] = useState<boolean>(true);

  // OOWUrxHDTRyPmbYOSGyq7izHNQB1QYOv
  const alchemy = useMemo(() => {
    const config = {
      apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
      network: Network.ETH_SEPOLIA, // Replace with your target network
    };
    return new Alchemy(config);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const storedData = JSON.parse(
          localStorage.getItem(loggedInUser) || "{}",
        );
        setEmail(loggedInUser);
        setAccountKey(storedData.code);
      }
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

  useEffect(() => {
    if (email && accountKey) {
      getWalletAddress(email, accountKey).then(setAddress);
    }
  }, [email, accountKey]);
  useEffect(() => {
    if (address) {
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
    <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-16">
      <h2 className="text-3xl font-medium text-gray-800">Your Assets</h2>
      <section className="mt-6">
        <h3
          className="flex cursor-pointer items-center justify-between text-2xl font-light text-gray-700"
          onClick={() => setNftsVisible(!nftsVisible)}
        >
          NFTs&nbsp;&nbsp;<span>{nftsVisible ? "▲" : "▼"}</span>
        </h3>
        {nftsVisible && (
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-gray-100 p-6 shadow"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md">
                  <img
                    src={nft.image}
                    alt={nft.title || "NFT Image"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-light">
                    {nft.name + " #" + nft.tokenId}
                  </p>
                  <button className="mt-3 rounded-md bg-indigo-500 px-6 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-indigo-600">
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-6">
        <h3
          className="flex cursor-pointer items-center justify-between text-2xl font-light text-gray-700"
          onClick={() => setErc20sVisible(!erc20sVisible)}
        >
          ERC20 Tokens&nbsp;&nbsp;<span>{erc20sVisible ? "▲" : "▼"}</span>
        </h3>
        {erc20sVisible && (
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {erc20s.map((token, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-gray-100 p-6 shadow"
              >
                <div className="mt-4 text-center">
                  <h4 className="text-xl font-semibold">{token.id}</h4>
                  <p className="mt-2 text-lg font-medium text-gray-700">
                    Balance: {token.tokenBalance}
                  </p>
                  <button className="mt-4 rounded-md bg-green-500 px-6 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-green-600">
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewAssets;
