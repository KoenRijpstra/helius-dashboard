import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import {
  parseSignInMessageText,
  createSignInMessage,
} from "@solana/wallet-standard-util";
import { ed25519 } from "@noble/curves/ed25519";
import { decode } from "bs58";

import parseUrl from "@/utils/parse-url";

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
      async authorize(credentials) {
        try {
          const message = parseSignInMessageText(
            JSON.parse((credentials?.message as string) || "{}")
          );
          
          console.log("message",message);

          const nextAuthUrl = parseUrl(process.env.NEXTAUTH_URL! ?? process.env.VERCEL_URL!);

          console.log("nextAuthUrl",nextAuthUrl);

          if (message?.domain !== nextAuthUrl.host) {
            return null;
          }

          // TODO NextAuth V5 fix: https://github.com/nextauthjs/next-auth/discussions/8487#discussioncomment-7901079
          // const csrfToken = await getCsrfToken();

          // console.log("csrfToken", message.nonce, csrfToken);

          // if (signinMessage.nonce !== csrfToken) {
          //   return null;
          // }

          const verified = ed25519.verify(
            decode(credentials?.signature as string),
            createSignInMessage(message),
            decode(message.address)
          );

          if (!verified)
            throw new Error("Could not validate the signed message");

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
