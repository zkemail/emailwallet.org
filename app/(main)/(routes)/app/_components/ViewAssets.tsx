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

  // OOWUrxHDTRyPmbYOSGyq7izHNQB1QYOv
  const alchemy = useMemo(() => {
    const config = {
      apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
      network: Network.ETH_MAINNET, // Replace with your target network
    };
    return new Alchemy(config);
  }, []);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setAccountKey(localStorage.getItem("accountKey"));
  }, []);

  useEffect(() => {
    if (email && accountKey) {
      getWalletAddress(email, accountKey).then(setAddress);
    }
  }, [email, accountKey]);

  useEffect(() => {
    if (address) {
      alchemy.nft
        .getNftsForOwner(address)
        .then((res) => setNfts(res.ownedNfts));
      alchemy.core
        .getTokenBalances(address, [])
        .then((res) =>
          setErc20s(
            res.tokenBalances.filter((token) => token.tokenBalance !== "0"),
          ),
        );
    }
  }, [address, alchemy]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Your Assets</h2>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">NFTs</h3>
        <div className="grid grid-cols-3 gap-4">
          {nfts.map((nft, index) => (
            <div key={index} className="rounded-lg border p-4">
              <img
                src={nft.media.image}
                alt={nft.title}
                className="h-auto w-full"
              />
              <p>{nft.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">ERC20 Tokens</h3>
        <ul>
          {erc20s.map((token, index) => (
            <li key={index} className="flex justify-between border-b p-2">
              <span>{token.contractMetadata.name}</span>
              <span>{token.tokenBalance}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAssets;
