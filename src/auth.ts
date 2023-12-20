import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/rpcs") return !!auth
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)