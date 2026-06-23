"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "./Avatar";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "TV Shows", href: "/tv" },
  { label: "Movies", href: "/movies" },
  { label: "New & Popular", href: "/new" },
  { label: "My List", href: "/my-list" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-3 transition-all duration-300 md:px-10 ${
        scrolled
          ? "border-b border-white/5 bg-surface-base/80 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="font-display text-2xl font-bold text-brand">
          NocToc
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Search"
          className="text-white/80 transition-colors hover:text-white"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          aria-label="Notifications"
          className="text-white/80 transition-colors hover:text-white"
        >
          <Bell className="h-5 w-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md outline-none ring-brand focus-visible:ring-2">
            <Avatar size={32} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 border-white/10 bg-surface-raised text-white"
          >
            <DropdownMenuItem className="flex-col items-start gap-0.5 focus:bg-transparent">
              <span className="text-[10px] uppercase tracking-wide text-white/40">
                Signed in as
              </span>
              <span className="w-full truncate text-sm text-white">
                {user?.email ?? "Account"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer focus:bg-white/10"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
