import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => { 
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-gradient relative">
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-[1.5rem] w-[1.5rem]" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;