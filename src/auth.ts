import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"

import type { NextAuthConfig } from "next-auth"

export const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub,
    Google,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname !== "/login") return !!auth
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)