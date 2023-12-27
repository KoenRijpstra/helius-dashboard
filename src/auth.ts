import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { createSignInMessage } from "@solana/wallet-standard-util";
import { parseSignInMessageText } from "@/utils/parse-sign-in-message-text";
import { ed25519 } from "@noble/curves/ed25519";
import { decode } from "bs58";
import parseUrl from "@/utils/parse-url";
import { cookies } from "next/headers";

export const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          const message = parseSignInMessageText(
            JSON.parse((credentials?.message as string) || "{}")
          );

          const nextAuthUrl = parseUrl(
            process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL
          );

          console.log("nextAuthUrl", nextAuthUrl);
          console.log("message?.domain", message?.domain);

          // Verify the domain
          if (message?.domain !== nextAuthUrl.host) {
            throw new Error(
              "Domain does not match provided domain for verification."
            );
          }

          // TODO Use getCsrfToken instead of cookies when fixed NextAuth V5: https://github.com/nextauthjs/next-auth/discussions/8487#discussioncomment-7901079
          const csrfToken = cookies()
            .get("authjs.csrf-token")
            ?.value.split("|")[0];

          // Verify the nonce
          if (message.nonce !== csrfToken) {
            throw new Error(
              "Nonce does not match provided nonce for verification."
            );
          }

          // Check time or now
          const checkTime = new Date(new Date());

          // Verify the expiration time
          if (message?.expirationTime) {
            const expirationDate = new Date(message?.expirationTime);
            if (checkTime.getTime() >= expirationDate.getTime()) {
              throw new Error("Expired message.");
            }
          }

          // Verify the signature
          const verified = ed25519.verify(
            decode(credentials?.signature as string),
            createSignInMessage(message),
            decode(message.address)
          );

          if (!verified) {
            throw new Error("Signature does not match address of the message.");
          }

          return Promise.resolve({
            id: message.address,
            name: message.address,
          });
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    GitHub,
    Google,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname !== "/login") return !!auth;
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
