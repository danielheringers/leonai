"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Home, LogOut, MessageSquare, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Prompt", href: "/dashboard/prompt", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "border-r bg-sidebar-background dark:bg-sidebar-background",
        className
      )}
      {...props}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            className="flex items-center gap-2 font-semibold"
            href="/dashboard"
          >
            <span className="text-sidebar-foreground">LeonAI</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="flex flex-col gap-2 p-4">
            {sidebarItems.map((item) => (
              <TooltipProvider key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sair</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {session?.user && (
          <div className="border-t p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={session.user.name || "User avatar"}
                />
                <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {session.user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
