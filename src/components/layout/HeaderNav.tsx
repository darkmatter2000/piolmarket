"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Building2, BarChart3, Menu, X, TrendingUp, ChevronRight, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu, { type SessionUser } from "./UserMenu";

const NAV_LINKS = [
  { href: "/listings", label: "Annonces", icon: Building2 },
  { href: "/dashboard", label: "Indices", icon: BarChart3 },
  { href: "/simulator", label: "Simulateur ROI", icon: TrendingUp },
];

export default function HeaderNav({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border/60 bg-dark-bg/80 backdrop-blur-xl">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-emerald/20 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald to-emerald-600 flex items-center justify-center">
                <span className="text-dark-bg font-syne font-bold text-xs">MP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-bold text-white text-base leading-none">
                Money<span className="text-gradient-emerald">Piol</span>
              </span>
              <span className="text-[10px] text-gray-500 leading-none tracking-wide uppercase">
                Immo Cameroun
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                  pathname.startsWith(href)
                    ? "bg-dark-card text-white"
                    : "text-gray-400 hover:text-white hover:bg-dark-card/60"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + Auth + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/listings/new"
              className="hidden sm:flex btn-primary text-xs py-2 px-4"
            >
              Publier une annonce
              <ChevronRight size={14} />
            </Link>

            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link href="/login" className="hidden sm:flex btn-secondary text-xs py-2 px-4">
                <LogIn size={14} />
                Se connecter
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-card transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-dark-border/60 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname.startsWith(href)
                    ? "bg-dark-card text-white"
                    : "text-gray-400 hover:text-white hover:bg-dark-card/60"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-card/60 transition-all"
              >
                <LogIn size={18} />
                Se connecter
              </Link>
            )}
            <div className="pt-2 px-4">
              <Link href="/listings/new" className="btn-primary w-full justify-center">
                Publier une annonce
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
