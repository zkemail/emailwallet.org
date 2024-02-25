import { getAddress } from "./callRelayerAPI";

export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
  return regex.test(email);
}

export function generateNewKey() {
  return (
    "0x000" +
    Array.from({ length: 61 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("")
  );
}

function setLoggedInUser(email: string) {
  localStorage.setItem("loggedInUser", email);
}

export async function isSignedIn(): Promise<boolean> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) return false;

  const storedData = JSON.parse(localStorage.getItem(loggedInUser) || "{}");
  if (!storedData.code) return false;

  const address = await getAddress(loggedInUser, storedData.code);
  return !!address;
}

export async function getCreateEmailLink(
  fromEmail: string,
  provider: string,
): Promise<[string, string, string, string]> {
  let code;
  setLoggedInUser(fromEmail); // Set the current user as logged in
  let storedData = JSON.parse(localStorage.getItem(fromEmail) || "{}");

  if (storedData && storedData.code && storedData.chain == "sepolia") {
    code = storedData.code; // If code is in localstorage for this email, use it
  } else {
    code = generateNewKey();
    storedData = { ...storedData, code, provider, chain: "sepolia" }; // Add the code to the stored data for this email
    localStorage.setItem(fromEmail, JSON.stringify(storedData)); // Cache the data in localstorage for this email
  }

  const accountRegistrationRequest = {
    email_address: `${fromEmail}`, // replace with actual email address
    account_key: `${code}`,
  };

  let subject = "Create my email wallet! CODE:" + code;
  // let test_message = "🧪 Each new account starts with 100 TEST tokens.";
  return [
    ...(await getEmailLink(
      fromEmail,
      subject,
      `You are creating your Email Wallet.\n
❗ You must send this email without editing the to: or subject: fields, or else it will fail!\n
📤 sendeth.org privately relays your email on Sepolia testnet to create your account. Expect a confirmation email in a minute.\n
🤫 Your unique secret code hides your email on-chain.\n
📖 Read more on our docs at http://docs.emailwallet.org`,
      true,
    )),
    subject,
  ];
}

// TODO: Dynamically look up the DKIM and depending on what's enabled,
// change the default client
export async function getEmailLink(
  fromEmail: string,
  subject: string,
  body: string,
  send_to_instead_of_cc = false,
  force_mailto = false,
): Promise<[string, string, string]> {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const selectedProvider = JSON.parse(localStorage.getItem(fromEmail) || "{}");

  if (!fromEmail) {
    fromEmail = localStorage.getItem("loggedInUser") || "";
  }
  console.log("From email: ", fromEmail);

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return [
      "Mail App",
      `mailto:${encodeURIComponent(
        "sepolia@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      ``,
    ];
  }

  switch (selectedProvider.provider) {
    case "yahoo":
      return [
        "Yahoo Mail",
        `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
          "sepolia@sendeth.org",
        )}&subject=${encodedSubject}&body=${encodedBody}`,
        `https://mail.yahoo.com/d/search/keyword=sendeth.org`,
      ];

    case "gmail":
      return [
        "Gmail",
        `https://mail.google.com/mail/?authuser=${fromEmail}&view=cm&fs=1&${
          send_to_instead_of_cc ? "to" : "cc"
        }=${encodeURIComponent(
          "sepolia@sendeth.org",
        )}&su=${encodedSubject}&body=${encodedBody}`,
        `https://mail.google.com/mail?authuser=${fromEmail}#search/sendeth.org`,
      ];

    case "icloud":
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "sepolia@sendeth.org",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
        ``,
      ];

    case "outlook":
      return [
        "Mail App",
        `mailto:${encodeURIComponent(
          "sepolia@sendeth.org",
        )}?subject=${encodedSubject}&body=${encodedBody}`,
        `https://outlook.live.com/mail/${fromEmail}/sentitems`,
      ];

    case "proton":
      return [
        "Protonmail [manually copy details!]",
        `https://mail.proton.me/u/0/`,
        `https://mail.proton.me/u/0/almost-all-mail#keyword=sendeth.org`,
      ];

    default:
      if (fromEmail.endsWith("@me.com") || fromEmail.endsWith("@icloud.com")) {
        return [
          "Mail App",
          `mailto:${encodeURIComponent(
            "sepolia@sendeth.org",
          )}?subject=${encodedSubject}&body=${encodedBody}`,
          ``,
        ];
      }

      if (fromEmail.endsWith("@gmail.com")) {
        return [
          "Gmail",
          `https://mail.google.com/mail/?authuser=${fromEmail}&view=cm&fs=1&${
            send_to_instead_of_cc ? "to" : "cc"
          }=${encodeURIComponent(
            "sepolia@sendeth.org",
          )}&su=${encodedSubject}&body=${encodedBody}`,
          `https://mail.google.com/mail?authuser=${fromEmail}#search/sendeth.org`,
        ];
      } else if (
        fromEmail.endsWith("@outlook.com") ||
        fromEmail.endsWith("@hotmail.com")
      ) {
        return [
          "Mail App",
          `mailto:${encodeURIComponent(
            "sepolia@sendeth.org",
          )}?subject=${encodedSubject}&body=${encodedBody}`,
          `https://outlook.live.com/mail/${fromEmail}/sentitems`,
        ];
      } else if (fromEmail.endsWith("@yahoo.com")) {
        return [
          "Yahoo Mail",
          `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
            "sepolia@sendeth.org",
          )}&subject=${encodedSubject}&body=${encodedBody}`,
          `https://mail.yahoo.com/d/search/keyword=sendeth.org`,
        ];
      } else if (
        fromEmail.endsWith("@protonmail.com") ||
        fromEmail.endsWith("@proton.me") ||
        fromEmail.endsWith("@pm.me")
      ) {
        return [
          "Protonmail [manually copy details!]",
          `https://mail.proton.me/u/0/`,
          `https://mail.proton.me/u/0/almost-all-mail#keyword=sendeth.org`,
        ];
      } else if (
        await checkForGoogleSelector(fromEmail.split("@").pop() || "")
      ) {
        return [
          "Gmail",
          `https://mail.google.com/mail/?authuser=${fromEmail}&view=cm&fs=1&${
            send_to_instead_of_cc ? "to" : "cc"
          }=${encodeURIComponent(
            "sepolia@sendeth.org",
          )}&su=${encodedSubject}&body=${encodedBody}`,
          `https://mail.google.com/mail?authuser=${fromEmail}#search/sendeth.org`,
        ];
      } else {
        // Default to Gmail? (not mailto:) if the domain is not recognized, since most orgs are on gmail
        return [
          "Mail App",
          `mailto:${encodeURIComponent(
            "sepolia@sendeth.org",
          )}?subject=${encodedSubject}&body=${encodedBody}`,
          ``,
        ];
      }
  }
}

async function checkForGoogleSelector(domain: string) {
  try {
    const response = await fetch(
      `https://registry.prove.email/api/domains/${domain}`,
    );
    const data = await response.json();
    return data.some(
      (entry: { selector: string }) => entry.selector === "google",
    );
  } catch (error: any) {
    console.error("Error fetching domain data:", error);
    return false;
  }
}
