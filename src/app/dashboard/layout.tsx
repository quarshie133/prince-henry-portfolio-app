import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopbar from "@/components/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] font-sans flex text-gray-900 dark:text-gray-100 transition-colors">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <DashboardTopbar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
