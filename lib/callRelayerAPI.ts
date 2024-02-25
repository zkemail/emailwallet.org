interface ApiResponse {
  success?: boolean;
  address?: string;
}

async function createAccount(email: string): Promise<string> {
  try {
    const response = await fetch("https://api.emailwallet.org/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.success
      ? "Account creation successful"
      : "Account creation failed";
  } catch (error) {
    console.error("Error creating account:", error);
    return "Account creation failed due to an error";
  }
}

async function getAddress(email: string, accountKey: string): Promise<string> {
  try {
    const response = await fetch("https://api.emailwallet.org/getAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, accountKey }),
    });
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.address || "No address found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Failed to fetch address";
  }
}
async function sendAsset(
  email: string,
  accountKey: string,
  amount: number,
  tokenName: string,
  recipient: string,
): Promise<string> {
  try {
    const response = await fetch("https://api.emailwallet.org/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        accountKey,
        amount,
        tokenName,
        recipient,
      }),
    });
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.success ? "Asset sent successfully" : "Failed to send asset";
  } catch (error) {
    console.error("Error sending asset:", error);
    return "Failed to send asset due to an error";
  }
}
async function transferNFT(
  email: string,
  accountKey: string,
  nftAddress: string,
  nftId: string,
  recipient: string,
): Promise<string> {
  try {
    const response = await fetch("https://api.emailwallet.org/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        accountKey,
        nftAddress,
        nftId,
        recipient,
      }),
    });
    const data: ApiResponse = (await response.json()) as ApiResponse;
    return data.success
      ? "NFT transferred successfully"
      : "Failed to transfer NFT";
  } catch (error) {
    console.error("Error transferring NFT:", error);
    return "Failed to transfer NFT due to an error";
  }
}

export { createAccount, getAddress, sendAsset, transferNFT };
