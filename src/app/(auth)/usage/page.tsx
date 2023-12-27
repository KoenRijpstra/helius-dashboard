import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage – Helius",
  description: "",
};

export default function UsagePage() {
  return (
    <div className="px-6 py-3 w-full border-b">
      <h1 className="text-2xl font-bold">Usage</h1>
    </div>
  );
}
