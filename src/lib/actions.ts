"use server";

import { signIn, signOut } from "@/auth";

export async function signInGitHub(redirectTo: string | null) {
  await signIn("github", { redirectTo: redirectTo || "/" });
}

export async function signOutAll() {
  await signOut({ redirectTo: "/login" });
}
