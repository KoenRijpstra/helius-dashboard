"use client";

import { parseSignInMessageText } from "@/utils/parse-sign-in-message-text"

export function Debug() {
  function handleClick() {
    const message = parseSignInMessageText(
      JSON.parse(
        '"helius-dashboard-gamma.vercel.app wants you to sign in with your Solana account:\\n9uSTCWGBUYiCv6UsKQvpU3iDjtGtzbW7X634L8fTRRro\\n\\nSign in to Helius\\n\\nURI: https://helius-dashboard-gamma.vercel.app\\nVersion: 1\\nNonce: 42b5ca9dcc75036817d37239aa93f8f20838ffacab675d84265c7e3d201e70d5"'
      )
    );

    console.log("message", message);
  }

  return <div onClick={handleClick}>Test</div>;
}
