import { MobileMenu } from "@/components/MobileMenu";
import { Sidebar } from "@/components/Sidebar";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar className="hidden md:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center p-4 border-b md:hidden">
          <MobileMenu />
          <h1 className="text-xl font-semibold ml-4">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto md:p-4">{children}</main>
      </div>
    </div>
  );
}
