"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signInGitHub } from "@/lib/actions";

export function AuthGithub() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInGitHub();
      }}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
}
