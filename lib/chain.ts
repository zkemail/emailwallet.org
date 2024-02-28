import { Alchemy, Network } from "alchemy-sdk";
import { getWalletFromEmail, isSignedIn } from "./send";
// const { ethers } = require("ethers");

// export async function getERC20sforAddressZksync(ownerAddress?: string) {
//   const provider = new ethers.providers.JsonRpcProvider("https://sepolia.era.zksync.dev");

//   const erc20Abi = [
//       "function balanceOf(address owner) view returns (uint256)",
//       "function decimals() view returns (uint8)",
//       "function symbol() view returns (string)"
//   ];

//   const contractAddress = "0xFBE4Cb75C57c7552D5d392807c10697Df12587dC";

//   const contract = new ethers.Contract(contractAddress, erc20Abi, provider);
//     const balance = await contract.balanceOf(ownerAddress);
//     const decimals = await contract.decimals();
//     const symbol = await contract.symbol();

//     const formattedBalance = ethers.utils.formatUnits(balance, decimals);

//     return {
//         contractAddress,
//         balance: formattedBalance,
//         symbol,
//         decimals
//     };
// }

// export async function getNftsForAddressZksync(ownerAddress?: string) {
//   // Ethereum provider URL (e.g., Infura, Alchemy, or your own Ethereum node)
//   const provider = new ethers.providers.JsonRpcProvider("https://sepolia.era.zksync.dev");

//   const erc721Abi = [
//       "function balanceOf(address owner) external view returns (uint256 balance)",
//       "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)",
//       "function tokenURI(uint256 tokenId) external view returns (string memory)"
//   ];
//   const contractAddress = 0xc989c0431feBb3557CCf4e59919D15305D591668;
//   const contract = new ethers.Contract(contractAddress, erc721Abi, provider);
//   const balance = await contract.balanceOf(ownerAddress);
//   const nfts = [];

//   for (let i = 0; i < balance; i++) {
//       const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
//       const tokenURI = await contract.tokenURI(tokenId);
//       // Here, you would fetch the metadata from the tokenURI if it's an HTTP URL
//       // For simplicity, we're just returning the URI and token ID
//       nfts.push({ tokenId: tokenId.toString(), tokenURI });
//   }

//   return nfts;
// }

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
  const config = {
    apiKey: "euSwyu6Yf-VQ3NJ32KHxDhHmTta7OvIe", // Replace with your Alchemy API Key
    network: Network.BASE_SEPOLIA, // Replace with your target network
  };
  const alchemy = new Alchemy(config);
  const testAddress = "0xYourTestAddressHere"; // Replace with a test address

  try {
    console.log("Fetching NFTs for address:", testAddress);
    const nfts = await alchemy.nft.getNftsForOwner(testAddress);
    console.log("NFTs fetched:", nfts.ownedNfts.length);

    console.log("Fetching ERC20 token balances for address:", testAddress);
    const erc20s = await alchemy.core.getTokenBalances(testAddress);
    console.log("ERC20 token balances fetched:", erc20s.tokenBalances.length);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Check if this file is being run directly by Node.js and is not being imported by another module
if (require.main === module) {
  main();
}
