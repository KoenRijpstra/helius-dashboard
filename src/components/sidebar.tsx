"use client";

import Link from "next/link";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { Home, Webhook, Settings, BarChart2, Lock, Server, Book, LifeBuoy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname();

  const mainItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: <Home className="mr-3 h-4 w-4" />,
    },
    {
      id: "rpcs",
      label: "RPCs",
      href: "/rpcs",
      icon: <Server className="mr-3 h-4 w-4" />,
    },
    {
      id: "webhooks",
      label: "Webhooks",
      href: "/webhooks",
      icon: <Webhook className="mr-3 h-4 w-4" />,
    },
    {
      id: "api-keys",
      label: "API keys",
      href: "/api-keys",
      icon: <Lock className="mr-3 h-4 w-4" />,
    },
    {
      id: "usage",
      label: "Usage",
      href: "/usage",
      icon: <BarChart2 className="mr-3 h-4 w-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
      icon: <Settings className="mr-3 h-4 w-4" />,
    },
  ];

  const footerItems = [
    {
      id: "documentation",
      label: "Documentation",
      href: "https://docs.helius.dev",
      icon: <Book className="mr-3 h-4 w-4" />,
    },
  ];

  return (
    <aside
      className="flex flex-col fixed min-w-[200px] h-full py-4 px-3 z-50 border-r bg-[#010409]"
      aria-label="Sidebar"
    >
      <Link className="mb-6 ml-1" href="/">
        <Image src="/images/helius-logo.png" alt="Helius logo" width={150} height={32} priority={true} />
      </Link>

      <ul className="space-y-1">
        {mainItems.map((item) => (
          <li key={item.id}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start pl-2",
                pathname === item.href ? "text-primary" : "text-foreground/80"
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon} {item.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <ul className="space-y-2">
            {footerItems.map((item) => (
            <li key={item.id}>
                <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "w-full justify-start pl-2",
                    pathname === item.href ? "text-primary" : "text-foreground/80"
                )}
                asChild
                >
                <Link href={item.href} target="_blank">
                    {item.icon} {item.label}
                </Link>
                </Button>
            </li>
            ))}
        </ul>
        <Separator className="mt-2 mb-2" />
        <UserNav />
      </div>
    </aside>
  );
}
