export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,16}$/;
  return regex.test(email);
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
        "relayer@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      ``,
    ];
  }

  if (fromEmail.endsWith("@gmail.com")) {
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
        "relayer@sendeth.org",
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
        "relayer@sendeth.org",
      )}?subject=${encodedSubject}&body=${encodedBody}`,
      `https://outlook.live.com/mail/0/sentitems`,
    ];
  } else if (fromEmail.endsWith("@yahoo.com")) {
    return [
      "Yahoo Mail",
      `https://mail.yahoo.com/d/compose-message?cc=${encodeURIComponent(
        "relayer@sendeth.org",
      )}&subject=${encodedSubject}&body=${encodedBody}`,
      `https://mail.yahoo.com/d/search/keyword=relayer@sendeth.org`,
    ];
  } else if (
    fromEmail.endsWith("@protonmail.com") ||
    fromEmail.endsWith("@proton.me") ||
    fromEmail.endsWith("@pm.me")
  ) {
    return [
      "Protonmail [copy over details below!]",
      `https://mail.proton.me/u/0/`,
      `https://mail.proton.me/u/0/almost-all-mail#keyword=relayer@sendeth.org`,
    ];
  } else {
    // Default to Gmail? (not mailto:) if the domain is not recognized, since most orgs are on gmail
    return [
      "Gmail",
      `https://mail.google.com/mail/?view=cm&fs=1&cc=${encodeURIComponent(
        "relayer@sendeth.org",
      )}&su=${encodedSubject}&body=${encodedBody}`,
      `https://mail.google.com/mail/u/0/#search/to%3Arelayer%40sendeth.org`,
    ];
  }
}
