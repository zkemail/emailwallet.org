import { FaRegCommentAlt } from "react-icons/fa";

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

export async function getCreateEmailLink(
  fromEmail: string,
): Promise<[string, string, string]> {
  let code;
  let storedData = JSON.parse(localStorage.getItem(fromEmail) || "{}");
  if (storedData && storedData.code) {
    code = storedData.code; // If code is in localstorage for this email, use it
  } else {
    code = generateNewKey();
    storedData = { ...storedData, code: code }; // Add the code to the stored data for this email
    localStorage.setItem(fromEmail, JSON.stringify(storedData)); // Cache the data in localstorage for this email
  }

  const accountRegistrationRequest = {
    email_address: `${fromEmail}`, // replace with actual email address
    account_key: `${code}`,
  };

  let subject = "Create my email wallet! CODE:" + code;
  return getEmailLink(
    fromEmail,
    subject,
    "❗ You must send this email without editing the to: or subject: fields, or else it will fail!\n📤 sendeth.org will relay your email on Arbitrum (without publicly revealing it) to initialize your account. Expect a confirmation email when finished.\n🤫 Your unique secret code will conceal your email and email address from being exposed publicly.\n📖 Read more on our docs at https://docs.emailwallet.org",
    true,
  );
}

export function getEmailLink(
  fromEmail: string,
  subject: string,
  body: string,
  send_to_instead_of_cc = false,
  force_mailto = false,
): [string, string, string] {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return [
      "Mail App",
      `mailto:${encodeURIComponent(
        "arbitrum@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      ``,
    ];
  }

  if (fromEmail.endsWith("@gmail.com")) {
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&${
        send_to_instead_of_cc ? "to" : "cc"
      }=${encodeURIComponent(
        "arbitrum@sendeth.org",
      )}&su=${encodedSubject}&body=${encodedBody}`,
      `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
    ];
  } else if (
    fromEmail.endsWith("@outlook.com") ||
    fromEmail.endsWith("@hotmail.com")
  ) {
    return [
      "Mail App",
      `mailto:${encodeURIComponent(
        "arbitrum@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      `https://outlook.live.com/mail/0/sentitems`,
    ];
  } else if (fromEmail.endsWith("@yahoo.com")) {
    return [
      "Yahoo Mail",
      `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
        "arbitrum@sendeth.org",
      )}&subject=${encodedSubject}&body=${encodedBody}`,
      `https://mail.yahoo.com/d/search/keyword=arbitrum@sendeth.org`,
    ];
  } else if (
    fromEmail.endsWith("@protonmail.com") ||
    fromEmail.endsWith("@proton.me") ||
    fromEmail.endsWith("@pm.me")
  ) {
    return [
      "Protonmail [copy over details below!]",
      `https://mail.proton.me/u/0/`,
      `https://mail.proton.me/u/0/almost-all-mail#keyword=arbitrum@sendeth.org`,
    ];
  } else {
    // Default to Gmail? (not mailto:) if the domain is not recognized, since most orgs are on gmail
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&${
        send_to_instead_of_cc ? "to" : "cc"
      }=${encodeURIComponent(
        "arbitrum@sendeth.org",
      )}&su=${encodedSubject}&body=${encodedBody}`,
      `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
    ];
  }
}
