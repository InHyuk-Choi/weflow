import Navigation from "@/components/public/Navigation";
import StickyBottomNav from "@/components/public/StickyBottomNav";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <StickyBottomNav />
    </>
  );
}
