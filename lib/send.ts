export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
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

export function getCreateEmailLink(
  fromEmail: string,
  provider: string,
): [string, string, string, string] {
  let code;
  localStorage.setItem("recentEmail", fromEmail);
  let storedData = JSON.parse(localStorage.getItem(fromEmail) || "{}");
  if (storedData && storedData.code) {
    code = storedData.code; // If code is in localstorage for this email, use it
  } else {
    code = generateNewKey();
    storedData = { ...storedData, code: code, provider }; // Add the code to the stored data for this email
    localStorage.setItem(fromEmail, JSON.stringify(storedData)); // Cache the data in localstorage for this email
  }

  const accountRegistrationRequest = {
    email_address: `${fromEmail}`, // replace with actual email address
    account_key: `${code}`,
  };

  let subject = "Create my email wallet! CODE:" + code;
  // let test_message = "🧪 Each new account starts with 100 TEST tokens.";
  return [
    ...getEmailLink(
      fromEmail,
      subject,
      `You are creating your Email Wallet.\n
❗ You must send this email without editing the to: or subject: fields, or else it will fail!\n
📤 sendeth.org privately relays your email on Sepolia testnet to create your account. Expect a confirmation email in a minute.\n
🤫 Your unique secret code hides your email on-chain.\n
📖 Read more on our docs at http://docs.emailwallet.org`,
      true,
    ),
    subject,
  ];
}

// TODO: Dynamically look up the DKIM and depending on what's enabled,
// change the default client
export function getEmailLink(
  fromEmail: string,
  subject: string,
  body: string,
  send_to_instead_of_cc = false,
  force_mailto = false,
): [string, string, string] {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  if (!fromEmail) {
    fromEmail = localStorage.getItem("recentEmail") || "";
  }

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return [
      "Mail App",
      `mailto:${encodeURIComponent(
        "sepolia@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      ``,
    ];
  }

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
  } else if (googleDomainList.includes(fromEmail.split("@").pop() || "")) {
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

// List of domains at ProgCrypto with a 'google' selector
let googleDomainList = [
  "0xparc.org",
  "1kx.capital",
  "a16z.com",
  "albiona.dev",
  "alchemy.com",
  "ethereum.foundation",
  "altresear.ch",
  "antalpha.com",
  "ante.xyz",
  "arpachain.io",
  "arx.org",
  "atomlabs.one",
  "aztecprotocol.com",
  "berkeley.edu",
  "blockchain.capital",
  "blockchaincapital.com",
  "chainsafe.io",
  "cherry.vc",
  "clave.team",
  "coinbase.com",
  "cyber.fund",
  "dalstonlabs.com",
  "dcpos.ch",
  "defi.sucks",
  "dexlabs.xyz",
  "dfinity.org",
  "dodoex.io",
  "essec.edu",
  "ethereal.xyz",
  "ethereum.org",
  "figmentcapital.io",
  "framework.ventures",
  "garillot.net",
  "gizatech.xyz",
  "gnosis.io",
  "hypersphere.ventures",
  "i-globalsociety.com",
  "immutable.com",
  "ingonyama.com",
  "intrinsictech.xyz",
  "iosg.vc",
  "ironfish.network",
  "jonashals.me",
  "kaleido.io",
  "kevincharm.com",
  "kirastudio.xyz",
  "ku.edu.tr",
  "litprotocol.com",
  "maddevs.io",
  "mainstream.so",
  "matterlabs.dev",
  "maya-zk.com",
  "mixbytes.io",
  "monad.xyz",
  "nethermind.io",
  "nil.foundation",
  "nocturnelabs.xyz",
  "nodeguardians.io",
  "nucypher.com",
  "o1labs.org",
  "obol.tech",
  "openblocklabs.com",
  "openzeppelin.com",
  "panteracapital.com",
  "paribu.com",
  "pauldowman.com",
  "polygon.technology",
  "primev.xyz",
  "puffer.fi",
  "puzzle.online",
  "quantstamp.com",
  "risczero.com",
  "scroll.io",
  "semiotic.ai",
  "shamirlabs.org",
  "sigmaprime.io",
  "sinaxyz.io",
  "snu.ac.kr",
  "spacemesh.io",
  "starkware.co",
  "status.im",
  "talentprotocol.com",
  "token.im",
  "tuneinsight.com",
  "ucm.es",
  "ucsb.edu",
  "yacademy.dev",
  "yale.edu",
  "zkonduit.com",
  "fireblocks.com",
  "wharton.upenn.edu",
];
