import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "",
};

export default function WebhooksPage() {
  return (
    <div className="px-6 py-3 w-full border-b">
      <h1 className="text-2xl font-bold">Webhooks</h1>
    </div>
  );
}
