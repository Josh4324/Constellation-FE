import Link from "next/link";
import { marketingConfig } from "@/config/marketing";
import Nav from "@/components/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: LayoutProps) {
  return (
    <div>
      <div className="flex min-h-screen flex-col">
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <Nav items={marketingConfig.mainNav} />
            <nav>
              {/*  <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link> */}
              <ConnectButton />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
