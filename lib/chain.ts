import { Alchemy, Network } from "alchemy-sdk";
import { getWalletFromEmail, isSignedIn } from "./send";

export async function getNftsForAddress(address?: string) {
  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.ETH_SEPOLIA, // Replace with your target network
  };
  const alchemy = new Alchemy(config);

  if (!address) {
    console.log(
      "No address provided, attempting to fetch address for current user...",
    );
    address = (await isSignedIn())
      ? await getWalletFromEmail(localStorage.getItem("loggedInUser") || "")
      : undefined;
    if (!address) {
      console.error("Failed to fetch address for current user.");
      return [];
    }
    console.log(`Fetched address for current user: ${address}`);
  }

  try {
    const response = await alchemy.nft.getNftsForOwner(address);
    const updatedNfts = response.ownedNfts.map((nft) => ({
      ...nft,
      image:
        nft.image?.cachedUrl || "https://www.jubmoji.quest/images/logo.svg",
    }));
    console.log("NFTs for owner:", updatedNfts);
    return updatedNfts;
  } catch (error) {
    console.error("Error fetching NFTs for address:", error);
    return [];
  }
}

export async function getTokenBalancesForAddress(address?: string) {
  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.ETH_SEPOLIA, // Replace with your target network
  };
  const alchemy = new Alchemy(config);

  if (!address) {
    console.log(
      "No address provided, attempting to fetch address for current user...",
    );
    address = (await isSignedIn())
      ? await getWalletFromEmail(localStorage.getItem("loggedInUser") || "")
      : undefined;
    if (!address) {
      console.error("Failed to fetch address for current user.");
      return [];
    }
    console.log(`Fetched address for current user: ${address}`);
  }

  try {
    const response = await alchemy.core.getTokenBalances(address);
    const tokenDetailsPromises = response.tokenBalances.map((token) =>
      alchemy.core.getTokenMetadata(token.contractAddress).then((metadata) => ({
        contractAddress: token.contractAddress,
        tokenBalance: (
          parseInt(token.tokenBalance || "0", 16) /
          Math.pow(10, metadata.decimals || 18)
        ).toFixed(3),
        id: metadata.symbol, // Abbreviated name
        decimals: metadata.decimals || 18,
      })),
    );
    const enrichedTokens = await Promise.all(tokenDetailsPromises);
    console.log("All tokens for owner with details:", enrichedTokens);
    return enrichedTokens;
  } catch (error) {
    console.error("Error fetching token balances for address:", error);
    return [];
  }
}
