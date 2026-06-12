import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/admin/Providers";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <Providers>
      <div className="min-h-screen bg-slate-50">
        <AdminHeader username={session.user?.name ?? "admin"} />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      </div>
    </Providers>
  );
}
