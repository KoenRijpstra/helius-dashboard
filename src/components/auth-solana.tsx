"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useSession, getCsrfToken } from "next-auth/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createSignInMessageText } from "@solana/wallet-standard-util";
import { encode } from "bs58";
import { signInSolana } from "@/actions/signin";
import { toast } from "sonner";
import { WalletSignMessageError } from "@solana/wallet-adapter-base";

// TODO Remove NextAuth V5 fix: https://github.com/nextauthjs/next-auth/discussions/8487#discussioncomment-7901079
declare module "next-auth/react" {
  function getCsrfToken(): Promise<string>;
}

export function AuthSolana() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const searchParams = useSearchParams();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = createSignInMessageText({
        domain: window.location.host,
        address: wallet.publicKey?.toBase58(),
        statement: "Sign in to Helius",
        uri: window.location.origin,
        version: "1",
        nonce: csrf,
      });

      const signature = await wallet.signMessage(
        new TextEncoder().encode(message)
      );

      signInSolana(
        JSON.stringify(message),
        encode(signature),
        searchParams.get("callbackUrl")
      );
    } catch (error) {
      console.log("error", error);
      if (error instanceof WalletSignMessageError) {
        toast.error("Message signing failed");
      }
    }
  };

  useEffect(() => {
    if (wallet.connected && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected]);

  return (
    <Button variant="outline" type="button" onClick={handleSignIn}>
      <Icons.solana className="mr-2 h-4 w-4" />
      Sign In with Solana
    </Button>
  );
}
