import { Metadata } from "next";
import Link from "next/link";
import { AuthGithub } from "@/components/auth-github";
import { AuthGoogle } from "@/components/auth-google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Tweet } from "react-tweet";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function AuthenticationPage() {
  return (
    <div className="container min-h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full bg-muted p-10 text-white dark:border-r lg:flex bg-zinc-900">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center">
            <Image
              src="/favicon.png"
              alt="Helius logo"
              width={64}
              height={64}
            />
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to Helius
            </h1>
          </div>
          <Button variant="outline" type="button">
            <Icons.solana className="mr-2 h-4 w-4" />
            Sign In with Solana
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <AuthGoogle />
          <AuthGithub />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 scale-[0.75]">
          <Tweet id="1683887652192530435" />
        </div>
      </div>
    </div>
  );
}
