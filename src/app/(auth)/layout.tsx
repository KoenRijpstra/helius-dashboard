import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex flex-row items-stretch h-full">
        <Sidebar />
        <div className="flex flex-col flex-1 h-full pl-[200px]">{children}</div>
      </div>
    )
  }