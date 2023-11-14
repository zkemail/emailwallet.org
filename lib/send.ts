import { FaRegCommentAlt } from "react-icons/fa";

export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
  return regex.test(email);
}

export async function getCreateEmailLink(
  fromEmail: string,
): Promise<[string, string, string]> {
  const accountRegistrationRequest = {
    email_address: `${fromEmail}`, // replace with actual email address
  };
  // I keep getting Onbording token transfer failed, so I removed this code

  // let code = fetch("http://localhost:4500/api/onboard", {
  //   // replace with actual server URL
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(accountRegistrationRequest),
  // })
  // .then((response) => response.text())
  // .then((data) => {
  //   console.log(data);
  //   return (Math.random().toString(16) + "0".repeat(64)).slice(2, 66);
  //   // return data.account_key;
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  //   // "0" trick ensures is exactly 64 chars long
  // });

  let code;
  if (localStorage.getItem("code")) {
    code = localStorage.getItem("code"); // If code is in localstorage, use it
  } else {
    code = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("");
    localStorage.setItem("code", code); // Cache the code in localstorage
  }
  let subject = "Create my email wallet! CODE:" + code;
  return getEmailLink(
    fromEmail,
    subject,
    "The sendeth.org relayer will relay your email on-chain to trigger a transaction! Your unique secret code will conceal your email from appearing on-chain.",
  );
}

export function getEmailLink(
  fromEmail: string,
  subject: string,
  body: string,
): [string, string, string] {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return [
      "Mail App",
      `mailto:${encodeURIComponent(
        "optimism@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      ``,
    ];
  }

  if (fromEmail.endsWith("@gmail.com")) {
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
        "optimism@sendeth.org",
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
        "optimism@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      `https://outlook.live.com/mail/0/sentitems`,
    ];
  } else if (fromEmail.endsWith("@yahoo.com")) {
    return [
      "Yahoo Mail",
      `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
        "optimism@sendeth.org",
      )}&subject=${encodedSubject}&body=${encodedBody}`,
      `https://mail.yahoo.com/d/search/keyword=optimism@sendeth.org`,
    ];
  } else if (
    fromEmail.endsWith("@protonmail.com") ||
    fromEmail.endsWith("@proton.me") ||
    fromEmail.endsWith("@pm.me")
  ) {
    return [
      "Protonmail [copy over details below!]",
      `https://mail.proton.me/u/0/`,
      `https://mail.proton.me/u/0/almost-all-mail#keyword=optimism@sendeth.org`,
    ];
  } else {
    // Default to Gmail? (not mailto:) if the domain is not recognized, since most orgs are on gmail
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
        "optimism@sendeth.org",
      )}&su=${encodedSubject}&body=${encodedBody}`,
      `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
    ];
  }
}
