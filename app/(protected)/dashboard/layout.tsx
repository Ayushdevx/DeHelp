import { auth } from "@/auth";
import { SideBarHeader } from "@/components/sidebar/SidebarHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    let heading = "Hello, Parvathi";
    if (session?.user) {
      heading = "Hello, " + session.user.name;
    }
    
  return (
    <SidebarProvider>
      <SessionProvider session={session}>
        <AppSidebar session={session} />
        <main>
          <SidebarTrigger />
          <SideBarHeader heading="DeHelp" text="Welcome to your DeHelp dashboard" />
          {children}
        </main>
      </SessionProvider>
    </SidebarProvider>
  );
}

export default DashboardLayout;