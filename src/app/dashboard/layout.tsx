import type { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-200">
      <DashboardHeader />
      <main className="pb-28">{children}</main>
      <DashboardFooter />
    </div>
  );
}
