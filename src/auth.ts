import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          // For demo
          const user = {
            id: "1",
            name: "Koen Rijpstra",
            email: "my@email.com",
          };

          return user;
        }

        return null;
      },
    }),
  ],
});
