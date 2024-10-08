import { useEffect, useMemo, useState } from "react";
import { getWalletAddress } from "@/lib/callRelayerAPI";
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { getWallet, isValidAddress } from "@/lib/send";
import ExportedImage from "next-image-export-optimizer";
import {
  NFTOption,
  TokenOption,
  getNftsForAddress,
  getTokenBalancesForAddress,
} from "@/lib/chain";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

export type AssetsFetchingStatus = {
  nftsFetched: boolean;
  erc20TokensFetched: boolean;
};

const ViewAssets: React.FC<{
  setSelectedTab: (
    tab: "login" | "view" | "deposit" | "create" | "send",
  ) => void;
}> = ({ setSelectedTab }) => {
  // const [email, setEmail] = useState<string | null>(null);
  // const [accountKey, setAccountKey] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [nfts, setNfts] = useState<NFTOption[]>([]);
  const [erc20s, setErc20s] = useState<TokenOption[]>([]);
  const [nftsVisible, setNftsVisible] = useState<boolean>(true);
  const [erc20sVisible, setErc20sVisible] = useState<boolean>(true);
  const [isFetchAssetsLoading, setIsFetchAssetsLoading] =
    useState<boolean>(false);
  const [assetsFetchingStatus, setAssetsFetchingStatus] =
    useState<AssetsFetchingStatus>({
      nftsFetched: false,
      erc20TokensFetched: false,
    });

  useEffect(() => {
    setIsFetchAssetsLoading(true);

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

  useEffect(() => {
    if (
      assetsFetchingStatus.erc20TokensFetched &&
      assetsFetchingStatus.nftsFetched
    ) {
      setIsFetchAssetsLoading(false);
    }
  }, [assetsFetchingStatus]);

  // TODO: Make these calls to chain.ts
  useEffect(() => {
    if (isValidAddress(address)) {
      getNftsForAddress(address)
        .then((nfts) => {
          const updatedNfts = nfts.map((nft) => ({
            id: nft.id,
            contractAddress: nft.contractAddress,
            tokenId: nft.tokenId,
            name: nft.name, // Assuming metadata contains a name property
            description: nft.description, // Assuming metadata contains a description property
            url: nft.url,
          }));
          console.log("NFTs for owner:", updatedNfts);
          setNfts(updatedNfts);
        })
        .catch((error) => {
          console.log(error);
          toast("Could not fetch NFTs for the owner. Please try again");
        })
        .finally(() => {
          setAssetsFetchingStatus((prevAssetsFetchingStatus) => ({
            ...prevAssetsFetchingStatus,
            nftsFetched: true,
          }));
        });
      getTokenBalancesForAddress(address)
        .then((tokens) => {
          const enrichedTokens: TokenOption[] = tokens.map(
            (token: TokenOption) => {
              console.log("Token:", token);
              return {
                contractAddress: token.contractAddress,
                balance: token.balance,
                id: token.id, // Abbreviated name
                decimals: token.decimals,
                symbol: token.symbol,
              };
            },
          );
          console.log("All tokens for owner with details:", enrichedTokens);
          setErc20s(enrichedTokens);
        })
        .catch((error) => {
          console.log(error);
          toast("Could not fetch ERC20 token for the owner. Please try again");
        })
        .finally(() => {
          setAssetsFetchingStatus((prevAssetsFetchingStatus) => ({
            ...prevAssetsFetchingStatus,
            erc20TokensFetched: true,
          }));
        });
    }
  }, [address]);

  return (
    <div className="flex w-full flex-col rounded-[calc(var(--radius)_+_10px)] border border-white bg-black text-white px-4 py-8 md:w-2/3">
      <h3 className={`text-center text-[1.625rem] font-bold text-white`}>
        Your Assets
      </h3>
      {isFetchAssetsLoading ? (
        <Loader />
      ) : (
        <>
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
                        src={nft.url}
                        alt={nft.name || "NFT Image"}
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
                      <span className="opacity-60">{token.balance}</span>
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
        </>
      )}
    </div>
  );
};

export default ViewAssets;
