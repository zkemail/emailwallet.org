import { Alchemy, Network } from "alchemy-sdk";
import { getWalletFromEmail, isSignedIn } from "./send";
import axios from "axios";
// import { CovalentClient } from "@covalenthq/client-sdk";

const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";
const API_KEY = "cqt_rQcDjKg79tVQVd6xKJ3YqrMYjqdx";
const ZKSYNC_CHAIN_ID = "zksync-testnet"; // 300 is zkSync sepolia, 324 is zksync mainnet
const MOCK_ADDRESS = "0x3edD5105DC14AC16a5ca947f0F273B0E63DE4f94";

export async function getZkSyncNFTsForAddress(address: string) {
  const endpoint = `${COVALENT_BASE_URL}/${ZKSYNC_CHAIN_ID}/address/${address}/balances_v2/?nft=true&key=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    const nfts = response.data.data.items.filter(
      (item: any) => item.type === "nft",
    );
    return nfts.map((nft: any) => ({
      contractAddress: nft.contract_address,
      tokenId: nft.token_id,
      tokenUri: nft.nft_data[0].token_url,
      metadata: nft.nft_data[0].external_data,
    }));
  } catch (error) {
    console.error("Error fetching zkSync NFTs:", error);
    return [];
  }
}

export async function getZkSyncTokensForAddress(address: string) {
  const endpoint = `${COVALENT_BASE_URL}/${ZKSYNC_CHAIN_ID}/address/${address}/balances_v2/?key=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    const tokens = response.data.data.items.filter(
      (item: any) => item.type === "cryptocurrency",
    );
    return tokens.map((token: any) => ({
      contractAddress: token.contract_address,
      symbol: token.contract_ticker_symbol,
      balance: token.balance,
      decimals: token.contract_decimals,
    }));
  } catch (error) {
    console.error("Error fetching zkSync Tokens:", error);
    return [];
  }
}

export async function getNftsForAddress(address?: string) {
  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.BASE_SEPOLIA, // Replace with your target network
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
    network: Network.BASE_SEPOLIA, // Replace with your target network
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
        url: metadata.logo,
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

// TODO: Fix for zksync test
async function main() {
  const testAddress = MOCK_ADDRESS;
  try {
    console.log("Fetching NFTs for address:", testAddress);
    const nfts = await getZkSyncNFTsForAddress(testAddress);
    console.log("NFTs fetched:", nfts.length);

    console.log("Fetching ERC20 token balances for address:", testAddress);
    const erc20s = await getZkSyncTokensForAddress(testAddress);
    console.log("ERC20 token balances fetched:", erc20s.length);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Check if this file is being run directly by Node.js and is not being imported by another module
if (require.main === module) {
  main();
}
