"use client";


// TODO: implement https://github.com/solana-labs/solana/blob/master/docs/src/proposals/off-chain-message-signing.md
const DOMAIN = '(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n';
const ADDRESS = '(?<address>[^\\n]+)(?:\\n|$)';
const STATEMENT = '(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))??';
const URI = '(?:\\nURI: (?<uri>[^\\n]+))?';
const VERSION = '(?:\\nVersion: (?<version>[^\\n]+))?';
const CHAIN_ID = '(?:\\nChain ID: (?<chainId>[^\\n]+))?';
const NONCE = '(?:\\nNonce: (?<nonce>[^\\n]+))?';
const ISSUED_AT = '(?:\\nIssued At: (?<issuedAt>[^\\n]+))?';
const EXPIRATION_TIME = '(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?';
const NOT_BEFORE = '(?:\\nNot Before: (?<notBefore>[^\\n]+))?';
const REQUEST_ID = '(?:\\nRequest ID: (?<requestId>[^\\n]+))?';
const RESOURCES = '(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?';
const FIELDS = `${URI}${VERSION}${CHAIN_ID}${NONCE}${ISSUED_AT}${EXPIRATION_TIME}${NOT_BEFORE}${REQUEST_ID}${RESOURCES}`;
const MESSAGE = new RegExp(`^${DOMAIN}${ADDRESS}${STATEMENT}${FIELDS}\\n*$`);

/**
 * TODO: docs
 */
function parseSignInMessageText(text: string) {
    const match = MESSAGE.exec(text);
    console.log("match",match);
    if (!match) return null;
    const groups = match.groups;
    console.log("groups",groups);
    if (!groups) return null;

    return {
        domain: groups.domain!,
        address: groups.address!,
        statement: groups.statement,
        uri: groups.uri,
        version: groups.version,
        nonce: groups.nonce,
        chainId: groups.chainId,
        issuedAt: groups.issuedAt,
        expirationTime: groups.expirationTime,
        notBefore: groups.notBefore,
        requestId: groups.requestId,
        resources: groups.resources?.split('\n- ').slice(1),
    };
}

export function Debug() {
  function handleClick() {

    const jsonMessage = '"helius-dashboard-gamma.vercel.app wants you to sign in with your Solana account:\\n9uSTCWGBUYiCv6UsKQvpU3iDjtGtzbW7X634L8fTRRro\\n\\nSign in to Helius\\n\\nURI: https://helius-dashboard-gamma.vercel.app\\nVersion: 1\\nNonce: 42b5ca9dcc75036817d37239aa93f8f20838ffacab675d84265c7e3d201e70d5"';

    const preParsed = JSON.parse((jsonMessage as string) || "{}");

    console.log("preParsed", preParsed);

    const message = parseSignInMessageText(
      preParsed
    );

    console.log("message", message);
  }

  return <div onClick={handleClick}>Test</div>;
}
