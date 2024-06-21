import dotenv from "dotenv";
dotenv.config();

let RELAYER_API_URL = process.env.RELAYER_API_URL || "";
if (!RELAYER_API_URL) {
  const hostname = window.location.hostname;
  if (hostname.endsWith("2fa.emailwallet.org")) {
    RELAYER_API_URL = "https://2fa-api.emailwallet.org";
  } else if (hostname.endsWith("staging.emailwallet.org")) {
    RELAYER_API_URL = "https://staging-api.emailwallet.org";
  } else if (hostname.endsWith("emailwallet.org")) {
    RELAYER_API_URL = "https://relayerapi.emailwallet.org";
  }
}
interface ApiResponse {
  success?: boolean;
  address?: string;
}

async function createAccount(email: string): Promise<string> {
  try {
    const response = await fetch(`${RELAYER_API_URL}/api/createAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_addr: email }),
    });
    console.log(response);
    const textResponse = await response.text();
    console.log("Parsed response:", textResponse);
    return textResponse != "0x" ? textResponse : "";
  } catch (error) {
    console.error("Error creating account:", error);
    return "Account creation failed due to an error";
  }
}

async function isAccountCreated(email: string): Promise<string> {
  try {
    const response = await fetch(`${RELAYER_API_URL}/api/isAccountCreated`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_addr: email }),
    });
    const text = await response.text();
    return text == "true" ? "Account exists" : "Account does not exist";
  } catch (error) {
    console.error("Error checking account existence:", error);
    return "Failed to check if account exists";
  }
}

async function sendAsset(
  amountString: string,
  tokenId: string,
  recipientAddr: string,
): Promise<string> {
  try {
    const email = localStorage.getItem("loggedInUser") || "";
    const isRecipientEmail = recipientAddr.includes("@");
    const amount = parseFloat(amountString);

    console.log("body", {
      email_addr: email,
      amount,
      token_id: tokenId,
      recipient_addr: recipientAddr,
      is_recipient_email: isRecipientEmail,
    });

    const response = await fetch(`${RELAYER_API_URL}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_addr: email,
        amount,
        token_id: tokenId,
        recipient_addr: recipientAddr,
        is_recipient_email: isRecipientEmail,
      }),
    });
    const data = await response.text();
    return data ? "Asset sent successfully" : "Failed to send asset";
  } catch (error) {
    console.error("Error sending asset:", error);
    return "Failed to send asset due to an error";
  }
}

export async function recoverAccountKey(email: string): Promise<string> {
  try {
    const response = await fetch(`${RELAYER_API_URL}/api/recoverAccountCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_addr: email }),
    });
    const data = await response.text();
    return data
      ? "Account key recovery email sent"
      : "Failed to send account key recovery email";
  } catch (error) {
    console.error("Error recovering account key:", error);
    return "Failed to recover account key due to an error";
  }
}

async function getWalletAddress(
  email: string,
  accountKey: string,
): Promise<string> {
  let code = accountKey.startsWith("0x") ? accountKey : `0x${accountKey}`;
  try {
    const response = await fetch(`${RELAYER_API_URL}/api/getWalletAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_addr: email, account_key: code }),
    });
    const data = await response.text();
    return data || "Failed to fetch address, no address found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Failed to fetch address";
  }
}

async function transferNFT(
  nftId: string,
  nftAddr: string,
  recipientAddr: string,
): Promise<string> {
  try {
    const email = localStorage.getItem("loggedInUser") || "";
    const isRecipientEmail = recipientAddr.includes("@");

    const response = await fetch(`${RELAYER_API_URL}/api/nftTransfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_addr: email,
        nft_id: Number(nftId),
        nft_addr: nftAddr,
        recipient_addr: recipientAddr,
        is_recipient_email: isRecipientEmail,
      }),
    });
    const data = await response.text();
    return data ? "NFT transferred successfully" : "Failed to transfer NFT";
  } catch (error) {
    console.error("Error transferring NFT:", error);
    return "Failed to transfer NFT due to an error";
  }
}

export {
  createAccount,
  getWalletAddress,
  sendAsset,
  transferNFT,
  isAccountCreated,
};
