import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import { auth } from "@/auth";
import { EditUserName } from "../profile/EditUserName";

interface SideBarHeaderProps {
  heading: string;
  text?: string;
}

export async function SideBarHeader({ heading, text }: SideBarHeaderProps) {
  const session = await auth();
  const profileImage = session?.user?.image || "/profile.png";
  const userName = session?.user?.name || "User";

  return (
    <div className="flex items-center justify-between px-4 mb-6">
      <div className="grid gap-1">
        <EditUserName 
          initialValue={userName} 
          className="text-3xl font-bold tracking-wide text-primary"
        />
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Image 
          src={profileImage} 
          alt="Profile" 
          width={40} 
          height={40} 
          className="rounded-full object-cover" 
        />
      </div>
    </div>
  );
}