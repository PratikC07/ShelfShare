import { Footer } from "@/components/shared/Footer";
import { AppNavbar } from "@/components/shared/AppNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <AppNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
