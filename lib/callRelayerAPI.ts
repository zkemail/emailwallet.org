interface ApiResponse {
  success?: boolean;
  address?: string;
}

async function createAccount(email: string): Promise<string> {
  try {
    const response = await fetch("http://35.192.88.157/api/createAccount", {
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
    const response = await fetch(
      "http://relayer.emailwallet.org/api/isAccountCreated",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_addr: email }),
      },
    );
    const text = await response.text();
    const data: ApiResponse = (await response.text()) as ApiResponse;
    return data.success ? "Account exists" : "Account does not exist";
  } catch (error) {
    console.error("Error checking account existence:", error);
    return "Failed to check if account exists";
  }
}

async function sendAsset(
  email: string,
  amount: number,
  tokenId: string,
  recipientAddr: string,
  isRecipientEmail: boolean,
): Promise<string> {
  try {
    const response = await fetch("http://relayer.emailwallet.org/api/send", {
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
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.success ? "Asset sent successfully" : "Failed to send asset";
  } catch (error) {
    console.error("Error sending asset:", error);
    return "Failed to send asset due to an error";
  }
}

async function getWalletAddress(
  email: string,
  accountKey: string,
): Promise<string> {
  try {
    const response = await fetch(
      "http://relayer.emailwallet.org/api/getWalletAddress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_addr: email, account_key: accountKey }),
      },
    );
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.address || "No address found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Failed to fetch address";
  }
}

async function transferNFT(
  email: string,
  nftId: string,
  nftAddr: string,
  recipientAddr: string,
  isRecipientEmail: boolean,
): Promise<string> {
  try {
    const response = await fetch(
      "http://relayer.emailwallet.org/api/nftTransfer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_addr: email,
          nft_id: nftId,
          nft_addr: nftAddr,
          recipient_addr: recipientAddr,
          is_recipient_email: isRecipientEmail,
        }),
      },
    );
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.success
      ? "NFT transferred successfully"
      : "Failed to transfer NFT";
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
