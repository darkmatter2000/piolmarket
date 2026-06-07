"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserCircle2, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";

export interface SessionUser {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

export default function UserMenu({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user.fullName || user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full border border-dark-border bg-dark-card hover:border-emerald/40 transition-colors"
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-emerald/15 border border-emerald/20 flex items-center justify-center text-emerald text-xs font-semibold">
            {initial}
          </div>
        )}
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 card p-2 shadow-xl shadow-black/30 z-50">
          <div className="px-3 py-2.5 border-b border-dark-border">
            {user.fullName && (
              <p className="text-sm font-medium text-white truncate">{user.fullName}</p>
            )}
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-surface transition-colors"
            >
              <UserCircle2 size={16} />
              Mon profil
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-surface transition-colors"
            >
              <LayoutDashboard size={16} />
              Mon dashboard
            </Link>
          </div>

          <div className="pt-1 border-t border-dark-border">
            <form action="/logout" method="post">
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
