---
title: "ZK Email"
date: 2022-12-12T22:12:03.284Z
authors: ["yush_g, sampriti"]
draft: false
type: Post
slug: "zkemail"
category: "30 min read"
tags: ["crypto", "zk"]
description: "A cool way to do server-free, mostly-trustless email subset verification on chain, and what that unlocks"
---

<!-- [TOC] -->

The lack of trustless integration with web2 is one of the leading reasons that blockchains feel siloed from the rest of the world -- there's currently no way of trustlessly interoperating with the exabytes of existing information online, built up over decades by millions of users, that plug into every system we use every day. The resulting isolation of blockchains leads to fully contained apps and ecosystems: a great fit for DeFi or gaming, but a terrible fit for prosocial applications trying to weave themselves into our daily lives.

One of the main causes of this divide is the oracle problem: there's no trustless way to ingest off-chain identities, stock prices, or physical actions onto web3, meaning that we have to trust intermediaries like Chainlink, hardware enclaves, tls-notary MPC networks [^1], or http proxies to do an API request for us to get that data. Giving these centralized organizations control over all data ingestion for blockchains fundamentally undercuts the premise of decentralization.

[Sampriti](https://github.com/sampritipanda/) and [I](https://twitter.com/yush_g) built a trustless alternative web2-web3 integration primitive: zk-email, with invaluable guidance from folks like [Vivek](https://twitter.com/viv_boop) and [Lermchair](https://twitter.com/lermchair). Our repository is MIT-licensed and [open source](https://github.com/zkemail/zk-email-verify/), and has a robust set of [npm packages](https://www.npmjs.com/~yushg) that provide an easy SDK for the circuits, contracts, and the frontend. [Sora](https://twitter.com/SoraSue77) and [I](https://twitter.com/yush_g) built a [halo2 SDK and circuits](https://github.com/zkemail/halo2-zkemail) to allow efficient, private client-side proofs along with an MIT-licensed SDK that anyone can build their own apps on top of. In addition, we open sourced [relayer infrastructure](https://github.com/zkemail/relayer) for people to run their own email servers with fast serverside proof generation using groth16 (less than 5 seconds and under a cent/proof on an autoscaled spot machine). We think that these libraries will lead to an ecosystem of applications that go far beyond helping the oracle problem: there are applications in onramps and offramps, whistleblowing, account recovery, KYC, data privacy and ownership, asset ownership, researcher donations, peer to peer payments, and almost every part of blockchain that aspires to interpret or affect the reality outside its own bubble.

## Trustlessly verified identity on chain

In general, a good way to verify that some data actually came from its purported source is to verify, using the source's public key, a signature produced with the source's private key. How can we use this as an oracle? Well, a huge amount of web2 data flows through email, and conveniently, almost all emails are signed by the sending domain using an algorithm called DKIM.

The core DKIM algorithm fits on one line:

```
rsa_sign(sha256(from:<>, to:<>, subject:<>, <body hash>,...), private key)
```

Every email you've received after 2017 likely has this signature on it. So if you wanted to prove you'd received an email from someone at MIT, you'd just post an email header from someperson@mit.edu to you@yourdomain.com. Then an on-chain verifier can fetch mit.edu's public key (found on its DNS TXT records) and use the key to verify the signature.

Because the header contains a hash of the body of the email, you can also prove what the email says. So for instance, you could verify on-chain that you own a particular Twitter account by posting the DKIM signature from a Twitter verification email you received.

## Problems with a naive implementation

Unfortunately, there are a couple of problems with the approach of using standard public-key cryptography on-chain for this application.

1. Calldata is too expensive. Verifying it on-chain will cost too much gas due to the sheer size of the input (calldata is 16 gas per byte, so even 50 kB of data is unacceptably expensive). This problem is not solved by L2s or sidechains (especially pre-danksharding): no matter what, you pay the cost of (compressed) calldata to be posted on the L1, which is still massive.

2. You want controllable privacy. For instance, you shouldn't have to give your email address if all you want to reveal is your Twitter username; you shouldn't have to provide the entire body of the email if you just want to prove that it contains a particular string. This is not solved by ZK-EVMs, since (as of this writing) no production ZK-EVMs make use of private data, although it's on the long-term roadmap of some.

3. Verification is too expensive. The complexity of the signature verification algorithm itself is gas-intensive because it entails huge field exponentiations in Solidity, in a different field than Ethereum. (Unlike the other two problems, however, this can be mitigated by an L2 built for proof verification.)

How do we solve all of these? Enter zero-knowledge proofs.

## ZK Proof of Email Construction

Zero-knowledge proofs let you prove that you know some information in your email without revealing it. They have two key properties that we rely on here:

1. Constant time and space verification cost (so that we can make the calldata much smaller; we don't have to post the whole email, just the small part we want to make public, e.g. a Twitter username).
2. Controllable privacy: the ability to make some inputs to the computation public and others private.

Here's the fascinating part -- if we do this in ZK, we can design applications so that no one, not even the mailserver or a keystroke tracker, can identify you as the email recipient, since you can keep your proof inputs private and our proof generation scripts and website can be run 100% client-side.

The next few sections will be technical -- if you're just interested in using this technology, skip to the "How Serverless ZK Twitter Verification Works" section.

### ZK Circuit

We're going to do basically the same signature verification from before, but inside a ZK-SNARK and using regular expressions. Here's what that looks like:

Public Inputs to ZK Proof:

- the sender domain
- the RSA modulus
- the masked message

Private Inputs to ZK Proof:

- the DKIM signature from the mailserver
- the length of the raw (unhashed) message data (so we can fix the max size of the circuit)
- the raw message data

ZK Circuit Checks:

- sha256 and RSA both verify
- the message is structured as a valid DKIM-signed email (we use regex to confirm that it has the right signature structure and headers)
- the chosen regex state matches the mask provided

Contract Checks:

- RSA public key claimed to belong to sender == RSA public key fetched from DNS or cached

Note that in the current iteration, each application needs its own regex string, which will need its own verifier function.

## Technical innovations

A couple of properties we need to ensure are that 1) zk-email works on all emails, up to some reasonable length, and 2) it's impossible to hack the system to fudge properties of the email. For these two to be possible, we had to engineer two new circuit types in Circom: arbitrary-length SHA256 and regex.

### Arbitrary length SHA256 hashing

In order to verify all messages with the same verifier circuit, the circuit needs to work on all possible email lengths. So we edited the circomlib SHA256 circuit to make it work on all messages up to any max length. We'll open-source that with a PR to circomlib soon.

Even if we can generate a circuit, the email can be so long that the circuit might be infeasibly large (all the HTML tags are also part of the signed body, and alone can add 8 million constraints!). With a tip from Vivek, we realized that if you want to prove a value near the end of the email, you don't have to do the entire hash computation in the ZK-SNARK. The way sponge-based and Merkle-Damgard based hash functions work is that the preimage string gets split into blocks which get hashed successively, each combined with the result of the last. So you can hash all the blocks up to the one you need _outside_ the snark, and then only run the last few hashing blocks inside the snark. What you're proving is not "I have a string that hashes to this value", but rather, "I have a substring that I can combine with the partially computed hash to yield the correct final hash value." This trick works for any sponge or Merkle-Damgard hash function, and can make knowledge of hash preimage verification faster everywhere!

### Regex with Deterministic Finite Automata

A naive way to confirm that you received a message sent to, say, aayushg@mit.edu would be to check the email header for the string "to: aayushg@mit.edu". But then someone else could fake a valid proof by setting the subject line to "subject: to: aayushg@mit.edu". So inside the ZK-SNARK, we have to parse the fields the exact same way that an email client would -- in particular, \r\n is used as a standard separation character between fields, and efforts to spoof it will result in that text being escaped (i.e., if the user types \r\n, it will appear as \\\\r\\\\n), so this combined with text matching is an effective check for email field validity.

In order to do arbitrary regex checks inside of Circom, the most efficient method is to auto-generate Circom code on the fly. The way regex works is it uses a deterministic finite automaton: a DAG-based data structure consisting of nodes, corresponding to states, and edges, corresponding to each possible character that could come next. Any string input to a regex represents a traversal of the graph, where each successive character tells you which edge to follow. If the DFA ends on a success state, then you know the regex matched. To extract the specific text that matched a regex, you can just isolate a specific DFA state and mask the entire string to only reveal that value. We implemented a short Python program that converts an arbitrary regex into a DFA and then represents that DFA with gate operations in Circom code.

The way this transition to Circom constraints occurs is via elementary gates: at each step, we compare the current character and the current state, and through a series of AND and multi-OR gates, can deduce what the next state should be. We then import this modular constraint into the relevant circuit -- this means that we have to know the structure of the regex prior to deriving the zkey (although the specific characters being matched can be edited on the fly). You can see a deeper dive into DFAs at [Katat's blog](https://katat.me/blog/ZK+Regex) and try out the regex-to-DFA converter yourself with our fork of [cyberzhg's toolbox](https://github.com/CyberZHG/toolbox) at [zkregex.com/min_dfa](https://zkregex.com/min_dfa).

## Trust assumptions

When we say "trustless", we mean that there's no need to trust the claimer of some off-chain fact because we can prove it using zk-email. zk-email itself isn't considered a trusted party either -- in other words, there's no centralized oracle or closed-source code that we'd have to trust to verify the information correctly. But there are a few third parties we still do have to trust.

#### 1. The DNS Public Key

We have to fetch the DNS keys from the DNS records, which may rotate as frequently as every six months to two years. Currently we include these in plaintext in the contracts, and they can be verified by inspection, but in the future we hope to trustlessly verify the DNS keys with [DNSSEC](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) as websites opt into this more secure framework. Because most websites (Twitter included) don't currently use DNSSEC, there is no signature on the DNS response received, which makes it easy for an adversary to man-in-the-middle the DNS request and give back the wrong public key. Hard-coding the public keys into the contracts instead isn't an ideal solution, but it at least mitigates the DNS spoofing risk. This is why we need to do the verification on-chain, since it allows us to put the DNS keys in an immutable data store.

As a contract gains legitimacy and public acceptance, people can verify that the DNS record is in fact accurate, and if it’s ever wrong, fork to the correct record: we expect community consensus to land on the correct key over time. We could find an alternate attestation to DNS other than DNSSEC, but are worried about the unilateral power that attester would have over the protocol. If we outsourced to the client or a server, we'd still have to somehow ensure that the DNS record wasn't being spoofed at the moment the client was verifying the proof. We can enable the contract to be upgraded to reflect a changed public key through a combination of decentralized governance methods and fraud proofs [^2], or by lobbying websites to enable DNSSEC.

#### 2. The Sending Mailserver

As the holder of the domain's private key, the sending mailserver can forge any message it wants. But trusting your mailserver is a core trust assumption of email in general, in that you trust, say, Gmail or your university or your company not to send people fake messages from you signed with their DKIM. A more innocuous issue that's probably more likely to arise is that the sending mailserver might change the format of its emails, which would temporarily disable zk-email verification until a new regex is written and a corresponding zkey compiled to handle the new format.

#### 3. The Receiving Mailserver

This server can read the plaintext and headers of all the emails you receive, and so someone with keys to the receiver mailserver can also generate valid zk-email proofs for anyone in the domain (for instance, Gmail can read all of your mail, so someone at Google could post a proof generated using an email sent to you). If the sender and receiver encrypt and decrypt messages using the [S/MIME](https://en.wikipedia.org/wiki/S/MIME) standard, this issue can be circumvented, but until that becomes more widely adopted, we rely on the assumption that mailservers won't abuse this power, for the same reasons as (2): you already trust that Google won't, say, steal your verification codes.

If you're using zk-email for semi-anonymity (to prove that you're some member of a set, without revealing which member), note that if you post a message on-chain containing a nullifier derived from the email, like a body hash, then the receiving mailserver will be able to associate you with your nullifier, which would link your on-chain message to your identity. For this reason, there's a fundamental tradeoff between being undoxxable to your mailserver and being able to prove the uniqueness of your pseudonymous identity. If you're using an application that uses nullifiers and you're worried about your mailserver reading your mail and de-anonymizing you, you should use an encrypted email provides like Skiff or Protonmail to ensure privacy. We expect existing privacy legislation to be a temporary preventative mechanism until encrypted email providers are more widely adopted, but it shouldn't be relied on for anonymity-critical applications. We'll aim to make the exact privacy guarantees and tradeoffs very transparent for each proof type.

## How Serverless ZK Twitter Verification Works

=======

Sampriti and I have shipped an MVP, https://zkemail.xyz, that allows any user to run the Twitter username verification circuit. You send a password reset email to yourself, download the headers ("Download original email" in Gmail), then paste the contents of the email into the frontend. You can wait for the token to expire if you're worried about us taking it, or use an old reset email -- the thing we're looking for is just any on-demand email from Twitter with your username, so the particular password reset string doesn't matter. Next, you click generate: this creates a ZK proof that verifies the email signature and ensures that only the Ethereum address you specify can use this proof to verify email ownership.

So what exactly is going on in this ZK circuit? Well, as with every other email, we verify that the RSA signature in the DKIM holds. We verify that the escaped "from:" email is in fact `@twitter.com`. And we check the `\r\n` before `from` in the header to make sure no one's trying to stuff a fake `from` address in another field like the subject line.

Then, we check the body hash nested inside the hashed header. We save a ton of constraints by only regex-matching the string that precedes a Twitter username -- `email was meant for @` -- and then extracting the last match. (There is no user-generated text of more than 15 characters within this mask, so we know that the last match must be from Twitter itself.) We make just that username public, and verify that the hash holds by calculating the last three cycles of the Merkle-Damgard hash function, from the username match point onwards.

We also need to deal with [malleability](https://zips.z.cash/protocol/protocol.pdf): there are ways for someone else who views your proof to change some parameters and generate another unique proof that verifies. We do this by requiring the user to embed their Ethereum address in the proof, as described in [this post](https://www.geometryresearch.xyz/notebook/groth16-malleability) -- that way, we don't actually have to prevent anyone from generating new proofs, since if they did, they would still just be asserting that _your_ Ethereum address owns your Twitter account.

Finally, the data gets sent to a smart contract to verify the signature. Recall that we need a smart contract in order to ensure the integrity of the DNS keys.

# Client-Side Privacy

To maximize user privacy, we'd ideally like to generate proofs on the client side so users don't have to send the contents of their emails to an external server. But there are two other properties that trade off against privacy: speed and compression. We'd like to be able to generate proofs fast, and make them small enough to efficiently verify on-chain -- for privacy and data ownership, we want to do as much of the proving locally as is practical. Different users value these properties to different degrees, so our solution is to offer both slower, private clientside options and fast, less private serverside options.

We expect the most privacy-conscious users and applications to utilize client-side proving. But, to maximize user-friendliness, we can default to a permissionless network of relayers (including self-hosted ones) that generate proofs on the user's behalf. In this case, you have to trust your relayer, but in exchange you get speed: since the circom circuits range from one million constraints without body verification to 3-8+ million with body verification, these proofs can take minutes and several CPUs on a user's browser. The same proving on 128-core machines can take less than five seconds. Halo2 proofs of the same circuit in the browser take only 15 seconds but produce proofs that are more expensive to verify on chain, so we are currently innovating on efficient server-side aggregation techniques to drive down the cost.

We can also utilize recursive halo2 proofs to reduce the burden on the client without giving up compression or privacy. We do this by generating a fast but uncompressed proof on the client side, so that the plaintext message doesn't have to leave the client, and then sending that proof to a generic halo2 aggregation machine (or a permissionless network of them) that recursively compresses that proof on a 64+ core computer in a matter of seconds; the result is a proof that's small enough to be verified on-chain efficiently but still costs less than cents per proof and preserves the privacy of the email. This is enabled by the PSE [snark-verifier](https://github.com/privacy-scaling-explorations/snark-verifier) library, and we use Axiom's variant for speed improvements. We expect the initial proof to take around 15 seconds to generate on a user's computer and the compression to take around ~2 minutes on the server. If you're excited to help us improve the recursive prover efficiency or contribute, we have lots of grants available!

## What will you build, anon?

So far, in addition to creating zk-email in circom, Sora and I are improving and shipping a version in halo2 that we're polishing up into an SDK that should make it far easier to write your own proofs. We've also:

- collaborated with [Nozee](https://github.com/sehyunc/nozee) (consisting of [Sehyun](https://github.com/sehyunc), [Kaylee](https://github.com/kayleegeorge), and [Emma](https://github.com/emmaguo13)) to adapt this to JWTs and make the first [email-address-based anonymous message board](https://nozee.xyz) that only reveals your email domain.

- isolated the regex with [Katat](https://katat.me/) and [Jern](https://www.linkedin.com/in/teeramet-jern-kunpittaya) into an independent Circom library and CLI tool, [zk-regex](https://github.com/zkemail/zk-email-verify/tree/main/libs/regex_to_circom), and are working with folks from [Privacy & Scaling Explorations](https://github.com/privacy-scaling-explorations/) for a next-gen version in Halo2 along with various theoretical cryptography and circuit improvements for improved speed and usability.

- co-led the 0xPARC Student Research Program, one of whose teams is shipping decentralized anonymous KYC: a user proves they're a unique person by demonstrating that they've passed KYC checks from multiple sources -- for instance, Coinbase and Airbnb. If your nullifier is both email signatures hashed together, Coinbase and Airbnb would have to collude in order to break your anonymity. Generalizing this construction gives us the ability to generate MPC-style assumptions over any set of email senders and/or companies now, even without their permission!

- enabled the tech behind a [peer to peer Venmo to USDC bridge](https://devfolio.co/projects/zkpp-23ef) hackathon project.

Here are a few more applications you could make using zk-email:

- Anonymity sets: prove you have at least a million dollars in their Chase bank account, or bought a degen call option on Robinhood, or have at least ten million Twitter followers, or are a Spotify Top Fan of some artist.

- A decentralized oracle for price feeds: prove you received an email from Nasdaq telling you a certain price for a stock.

- Edward Snowden-style whistleblowing or leaks: prove you can receive email at an address associated with a particular government organization, like the NSA.

- ZK Glassdoor: prove you work at a particular company and so can provide firsthand information on what it's like to work there.

- On-chain DocuSign: base-64 decode the attachments on a confirmation email from DocuSign to prove you signed a legal document with certain properties: a tax return for a given amount, or a proof of residence in a given city, or a term sheet from a VC. You can use these proofs to add credibility to your anonymous speech.

We have several crazy applications in the works as well -- we'd love to collaborate with builders to build them out. If problems like these excite you and you care about open source public goods, reach out to [me](https://twitter.com/yush_g) to build with us! If you have questions on this as you read it, feel free to open a [Github issue](https://github.com/zkemail/zk-email-verify/issues) on the website repo, or reply, and we will do our best to clarify.

There are lots of interesting constructions you can experiment with, like putting addresses and hashes inside of emails as verification codes (though don't forget the security pitfalls of unencrypted email). At the same time, there are lots of gotchas -- bcc's aren't signed, so you can't prove that you were the only recipient of an email; the "to" email field isn't signed in Hotmail; and some email providers have quirks that are technically allowed by the DKIM RFC but will break most parsers. If you have an idea for a new construction, we recommend you run it by us so we can help you verify your security assumptions. We intend to audit this codebase during 2023 to enable production use.

<!-- Footnotes themselves at the bottom. -->

With initial support from 0xPARC and the Ethereum Foundation's Privacy & Scaling Explorations group, [Sora](https://github.com/SoraSuegami/) and I are leading a new research group called Proof of Email in order to further the applications of trustless web2-web3 integrations with initial support from 0xPARC and EF PSE. In addition, [Vivek](https://twitter.com/viv_boop) and I are working on practical applications of this technology with Ivy Research. There are signatures and emails like this hidden all over the internet, and we want to harness their power to bring all of web2 onto web3 without centralized oracles. Reach out if you want to build with us -- we would love to talk with anyone excited about this tech and support them with the resources to build on it in public.

### Footnotes

[^1] TLS-Notary

You might think that all data online must be signed already, or else how would we trust that a website is who they say they are? Unfortunately, this is not the case -- HTTPS/TLS, the standard used to encrypt all web traffic, surprisingly lacks a signing feature because it uses symmetric encryption instead (meaning there are no private keys). This means that any server data we pull from these sessions can be forged by any client (the client and the server share the same key). TLS-Notary attempts to solve some of these problems, but requires users to communicate with websites not as themselves, but as individual shareholders in a multiparty computation protocol with a decentralized network of verifiers, who will ensure that the client is not forging messages. The compute cost and complexity of this solution (not to mention the non-collusion assumption on the MPC) make us yearn for a more elegant solution, one that is practical today on-chain.

[^2] DKIM Key Rotation

How do we handle the oracle problem of getting rotating DKIM keys on-chain? For the few sites using DNSSEC, we can verify that directly. Unfortunately, only about 200 in the Alexa top 100K sites use DNSSEC.

For the ones not using it, we can use a fraud proving mechanism where if someone claims the key changed, anyone who makes a email with a later timestamp with the old key can kill that proposal. If the secret key was leaked when the key rotated, anyone who submits a raw private key can get a bounty and disable that public key (on the other hand, this also allows organizations to opt-out of zk-email, so we will consider whether or not this is worth implementing).

Thusly the only attack is when the key rotates, someone claims it rotates to a different fake key, (their own) and that disagrees with the consensus. To avoid this, in final release, we intend to have a 3/4 system between the community majority, oracles like Uma/Chainlink, the developers of the protocol and key ecosystem players that use it, and past users who have historically submitted honest proofs. We'll start with a dev multisig for the beta release, and are considering one signer being a server whose instructions are authenticated with risc0 (the network request can obviously be spoofed so it's also imperfect). We are open to proposals on more secure ways to handle key rotation on-chain.
