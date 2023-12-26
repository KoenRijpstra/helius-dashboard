import { useMemo } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletAdapterProvider } from "@/components/wallet-adapter-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

// If loading a variable font, you don't need to specify the font weight
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Helius",
  description: "",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/favicon-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon/favicon-512x512.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html
        lang="en"
        className={`h-full ${outfit.className}`}
        suppressHydrationWarning
      >
        <head />
        <body className="h-full">
          <ThemeProvider attribute="class" defaultTheme="dark">
            <SessionProvider>
              <WalletAdapterProvider>{children}</WalletAdapterProvider>
            </SessionProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
