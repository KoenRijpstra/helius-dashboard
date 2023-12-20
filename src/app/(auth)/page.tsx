import Image from "next/image";
import type { Metadata } from "next";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartRequestHealth } from "@/components/chart-request-health";
import { ChartUsageBreakdown } from "@/components/chart-usage-breakdown";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Home - Helius",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <div className="py-3 mt-10 w-full text-center">
        <h1 className="text-4xl font-bold">Good Morning, {session?.user?.name}</h1>
      </div>
      <div className="px-8 mt-3 w-full">
        <h2 className="text-3xl font-bold">My projects</h2>
      </div>
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-12 xl:gap-8 px-8 py-6">
        <div className="space-y-4 lg:col-span-4 xl:col-span-3 xl:space-y-4">
          <Card className="w-full max-w-lg cursor-pointer transition duration-500 ease-in-out hover:shadow-lg hover:bg-accent/70">
            <Link href="#">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle>Lynxgentle</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>42 requests (24h)</span>
                  </CardDescription>
                </div>
                <Badge className="self-start" variant="secondary">
                  Mainnet
                </Badge>
              </CardHeader>
              <CardContent className="border-t pt-4 relative">
                <Button className="ml-auto" size="sm" variant="outline">
                  API Key
                </Button>
                <ArrowRight className="absolute bottom-0 right-0 w-4 h-4 m-4" />
              </CardContent>
            </Link>
          </Card>
        </div>
        <div className="space-y-4 lg:col-span-4 xl:col-span-3 xl:space-y-4">
          <Card className="w-full max-w-lg cursor-pointer transition duration-500 ease-in-out hover:shadow-lg hover:bg-accent/70">
            <Link href="#">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle>Fastpanter</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>12 requests (24h)</span>
                  </CardDescription>
                </div>
                <Badge className="self-start" variant="secondary">
                  Devnet
                </Badge>
              </CardHeader>
              <CardContent className="border-t pt-4 relative">
                <Button className="ml-auto" size="sm" variant="outline">
                  API Key
                </Button>
                <ArrowRight className="absolute bottom-0 right-0 w-4 h-4 m-4" />
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
      <div className="px-8 mt-3 w-full">
        <h2 className="text-3xl font-bold">Analytics overview</h2>
      </div>
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-12 xl:gap-8 px-8 py-6">
        <div className="space-y-4 lg:col-span-4 xl:col-span-12 xl:space-y-4">
          <ChartUsageBreakdown />
        </div>
      </div>
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-12 xl:gap-8 px-8 py-6">
        <div className="space-y-4 lg:col-span-4 xl:col-span-12 xl:space-y-4">
          <ChartRequestHealth />
        </div>
      </div>
    </div>
  );
}
