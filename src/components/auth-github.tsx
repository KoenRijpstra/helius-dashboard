"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signInGitHub } from "@/actions/signin";
import { useSearchParams } from "next/navigation";

export function AuthGithub() {
  const searchParams = useSearchParams();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInGitHub(searchParams.get("callbackUrl"));
      }}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Sign In with Github
    </Button>
  );
}
