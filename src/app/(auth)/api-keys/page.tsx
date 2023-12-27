import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API keys – Helius",
  description: "",
};

export default function APIkeysPage() {
  return (
    <div className="px-6 py-3 w-full border-b">
      <h1 className="text-2xl font-bold">API keys</h1>
    </div>
  );
}
