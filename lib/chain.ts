import { Alchemy, Network } from "alchemy-sdk";
import { getWalletFromEmail, isSignedIn } from "./send";
import axios from "axios";
// import { CovalentClient } from "@covalenthq/client-sdk";

const MOCK_TOKEN = true;
const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";
const API_KEY = "cqt_rQcDjKg79tVQVd6xKJ3YqrMYjqdx";
const ZKSYNC_CHAIN_ID = "zksync-testnet"; // 300 is zkSync sepolia, 324 is zksync mainnet
export const MOCK_ADDRESS = "0x3C666Cb99F50F2D1D96237248D96bF724b63D9aF"; // 0xAa613c7149d0D9df442ae1eBaab9879A6D870506 on Sepolia
export const MOCK_EMAIL = "aayushgupta5000@gmail.com";
const CHAIN_ID: number = 300; // 300 for zksync testnet, 324 for zksync mainnet

export type NFTOption = {
  contractAddress: string;
  tokenId: string;
  name: string;
  description: string;
  url: string; // Default to jubmoji if nothing exists
  id: string | null;
};

export type TokenOption = {
  contractAddress: string;
  balance: string;
  id: string | null;
  symbol: string;
  decimals: number;
};

export async function getZkSyncNFTsForAddress(
  address: string,
): Promise<NFTOption[]> {
  const endpoint = `${COVALENT_BASE_URL}/${ZKSYNC_CHAIN_ID}/address/${address}/balances_v2/?nft=true&key=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    const nfts = response.data.data.items.filter(
      (item: any) => item.type === "nft",
    );
    return nfts.map((nft: any) => ({
      contractAddress: nft.contract_address,
      tokenId: nft.token_id,
      name: nft.nft_data[0].external_data.name,
      description: nft.nft_data[0].external_data.description,
      url:
        nft.nft_data[0].token_url ||
        "https://www.jubmoji.quest/images/logo.svg",
      id: nft.contract_ticker_symbol || nft.token_id,
    }));
  } catch (error) {
    console.error("Error fetching zkSync NFTs:", error);
    return [];
  }
}

export async function getZkSyncTokensForAddress(
  address: string,
): Promise<TokenOption[]> {
  const endpoint = `${COVALENT_BASE_URL}/${ZKSYNC_CHAIN_ID}/address/${address}/balances_v2/?key=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    const tokens = response.data.data.items.filter(
      (item: any) => item.type === "cryptocurrency",
    );
    console.log("Tokens:", tokens);
    return tokens.map((token: any) => ({
      contractAddress: token.contract_address,
      symbol: token.contract_ticker_symbol,
      id: token.contract_ticker_symbol,
      balance: (
        parseInt(token.balance || "0", 10) /
        Math.pow(10, token.contract_decimals || 18)
      ).toFixed(3),
      decimals: token.contract_decimals || 18,
    }));
  } catch (error) {
    console.error("Error fetching zkSync Tokens:", error);
    return [];
  }
}

export async function getNftsForAddress(address?: string) {
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

  if (CHAIN_ID === 300 || CHAIN_ID === 324) {
    return getZkSyncNFTsForAddress(address);
  }

  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.BASE_SEPOLIA, // Replace with your target network
  };
  const alchemy = new Alchemy(config);
  try {
    const response = await alchemy.nft.getNftsForOwner(address);
    const updatedNfts: NFTOption[] = response.ownedNfts.map((nft) => ({
      contractAddress: nft.contract.address, // Adjust according to your actual data structure
      tokenId: nft.tokenId,
      name: nft.name || "NFT",
      description: nft.description || "",
      url: nft.image?.cachedUrl || "https://www.jubmoji.quest/images/logo.svg",
      id: nft.contract.symbol || nft.tokenId, // Assuming you want to use tokenId as id, adjust if needed
    }));
    console.log("NFTs for owner:", updatedNfts);
    return updatedNfts;
  } catch (error) {
    console.error("Error fetching NFTs for address:", error);
    return [];
  }
}

export async function getTokenBalancesForAddress(
  address?: string,
): Promise<TokenOption[]> {
  if (MOCK_TOKEN) {
    return Promise.resolve([
      {
        contractAddress: "0xA33c06ad440D322c77aa92E0420Acdd1dE2ad6F7",
        balance: "100",
        id: "TEST",
        symbol: "TEST",
        decimals: 18,
      },
    ]);
  }

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

  if (CHAIN_ID === 300 || CHAIN_ID === 324) {
    return getZkSyncTokensForAddress(address);
  }

  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.BASE_SEPOLIA, // Replace with your target network
  };
  const alchemy = new Alchemy(config);

  try {
    const response = await alchemy.core.getTokenBalances(address);
    const tokenDetailsPromises = response.tokenBalances.map((token) =>
      alchemy.core.getTokenMetadata(token.contractAddress).then((metadata) => ({
        contractAddress: token.contractAddress,
        balance: (
          parseInt(token.tokenBalance || "0", 16) /
          Math.pow(10, metadata.decimals || 18)
        ).toFixed(3),
        id: metadata.symbol, // Abbreviated name
        decimals: metadata.decimals || 18,
        url: metadata.logo,
        symbol: metadata.symbol || "ERC20",
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

// Test zksync functions
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
