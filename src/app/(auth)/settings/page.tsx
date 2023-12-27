import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Helius",
  description: "",
};

export default function SettingsPage() {
  return (
    <div className="px-6 py-3 w-full border-b">
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  );
}
