import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile – Helius",
  description: "",
};

export default function ProfilePage() {
  return (
    <div>
      <div className="px-6 py-3 w-full border-b">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="p-8"></div>
    </div>
  );
}
