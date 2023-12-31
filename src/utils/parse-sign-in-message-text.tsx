// I've copied the following from the @solana/wallet-standard due to issues with the nested literal template on Vercel production.
// It appears that the problem may be related to SWC minification
// Hopefully the next release 14.0.5 will fix the issue: https://github.com/vercel/next.js/releases/tag/v14.0.5-canary.2

import { SolanaSignInInputWithRequiredFields } from "@solana/wallet-standard-util";

const DOMAIN =
  "(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n";
const ADDRESS = "(?<address>[^\\n]+)(?:\\n|$)";
const STATEMENT = "(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))?";
const URI = "(?:\\nURI: (?<uri>[^\\n]+))?";
const VERSION = "(?:\\nVersion: (?<version>[^\\n]+))?";
const CHAIN_ID = "(?:\\nChain ID: (?<chainId>[^\\n]+))?";
const NONCE = "(?:\\nNonce: (?<nonce>[^\\n]+))?";
const ISSUED_AT = "(?:\\nIssued At: (?<issuedAt>[^\\n]+))?";
const EXPIRATION_TIME = "(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?";
const NOT_BEFORE = "(?:\\nNot Before: (?<notBefore>[^\\n]+))?";
const REQUEST_ID = "(?:\\nRequest ID: (?<requestId>[^\\n]+))?";
const RESOURCES = "(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?";
const MESSAGE = new RegExp(
  `^${DOMAIN}${ADDRESS}${STATEMENT}${URI}${VERSION}${CHAIN_ID}${NONCE}${ISSUED_AT}${EXPIRATION_TIME}${NOT_BEFORE}${REQUEST_ID}${RESOURCES}\\n*$`
);

/**
 * TODO: docs
 */
export function parseSignInMessageText(
  text: string
): SolanaSignInInputWithRequiredFields | null {
  const match = MESSAGE.exec(text);

  if (!match) return null;
  const groups = match.groups;

  if (!groups) return null;

  // domain and address are required fields
  if (!groups.domain || !groups.address) return null;

  return {
    domain: groups.domain,
    address: groups.address,
    statement: groups.statement,
    uri: groups.uri,
    version: groups.version,
    nonce: groups.nonce,
    chainId: groups.chainId,
    issuedAt: groups.issuedAt,
    expirationTime: groups.expirationTime,
    notBefore: groups.notBefore,
    requestId: groups.requestId,
    resources: groups.resources?.split("\n- ").slice(1),
  };
}
