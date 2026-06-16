import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/admin/Providers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <Providers>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar username={session.user?.name ?? "admin"} />
        <div className="min-w-0 flex-1">
          <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
