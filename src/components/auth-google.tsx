"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { signInGoogle } from "@/actions/signin";
import { useSearchParams } from "next/navigation";

export function AuthGoogle() {
  const searchParams = useSearchParams();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => {
        signInGoogle(searchParams.get("callbackUrl"));
      }}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Sign In with Google
    </Button>
  );
}
