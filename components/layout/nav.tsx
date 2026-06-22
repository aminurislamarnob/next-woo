import Link from "next/link";
import Image from "next/image";
import { User, Headset, Truck } from "lucide-react";

import { MobileNav } from "@/components/nav/mobile-nav";
import { CartDrawer } from "@/components/shop";
import { HeaderSearch } from "@/components/layout/header-search";
import { CategoriesMenu } from "@/components/layout/categories-menu";
import { headerMenu, headerMenuRight, topMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { getAllProductCategories } from "@/lib/woocommerce";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";

interface NavProps {
  className?: string;
  id?: string;
}

const ACCENT = "#80B500";

export async function Nav({ className, id }: NavProps) {
  const categories = await getAllProductCategories();

  return (
    <header
      className={cn("sticky z-50 top-0 bg-background border-b", className)}
      id={id}
    >
      {/* Top utility bar */}
      <div className="hidden md:block border-b bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-10 text-sm text-white">
          <div className="flex items-center gap-3">
            {Object.entries(topMenu).map(([label, href], index) => (
              <span key={href} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="text-primary-foreground/30">|</span>
                )}
                <Link
                  href={href}
                  className="flex items-center gap-1.5 hover:text-primary-foreground transition-colors"
                >
                  {label === "Order Tracking" && (
                    <Truck className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  {label}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Need help? Call Us</span>
            <Headset className="h-4 w-4" strokeWidth={1.5} />
            <a
              href={`tel:${siteConfig.support_phone}`}
              className="font-semibold"
              style={{ color: ACCENT }}
            >
              {siteConfig.support_phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar: logo, search, actions */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center gap-6">
        <div className="flex-1 min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src={Logo}
              alt={siteConfig.site_name}
              loading="eager"
              className="dark:invert"
              width={42}
              height={26.44}
            />
            <span className="font-semibold text-lg hidden sm:inline">
              {siteConfig.site_name}
            </span>
          </Link>
        </div>

        <HeaderSearch
          categories={categories}
          className="hidden md:flex max-w-2xl mx-auto"
        />

        <div className="flex flex-1 items-center justify-end gap-5">
          <div className="hidden sm:block">
            <CartDrawer variant="labeled" />
          </div>
          <div className="sm:hidden">
            <CartDrawer />
          </div>

          <Link
            href="/account"
            className="hidden sm:flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <User className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-sm font-medium">Account</span>
          </Link>

          <MobileNav />
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-6 pb-4">
        <HeaderSearch categories={categories} />
      </div>

      {/* Bottom navigation bar */}
      <div className="hidden lg:block border-t">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-6">
          <nav className="flex items-center gap-8">
            <CategoriesMenu categories={categories} />

            {Object.entries(headerMenu).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold hover:text-[var(--accent-color)] transition-colors"
                style={{ "--accent-color": ACCENT } as React.CSSProperties}
              >
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex items-center gap-8">
            {Object.entries(headerMenuRight).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold hover:text-[var(--accent-color)] transition-colors"
                style={{ "--accent-color": ACCENT } as React.CSSProperties}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
