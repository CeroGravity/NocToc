"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isLogin) await signIn(email, password);
    else await signUp(email, password);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-base px-4">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-112 w-112 -translate-x-1/2 rounded-full bg-brand-glow blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 w-full max-w-md animate-fade-up rounded-2xl border border-white/10 bg-surface-raised/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand font-display text-lg font-extrabold text-black">
            N
          </span>
          <span className="font-display text-2xl font-bold text-brand">NocToc</span>
        </div>

        <h1 className="mt-7 text-2xl font-semibold text-white">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {isLogin
            ? "Sign in to continue to your streaming universe."
            : "Start your personal streaming universe — it’s free."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/70">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-white/10 bg-surface-overlay text-white placeholder:text-white/30"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-white/70">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-white/10 bg-surface-overlay text-white placeholder:text-white/30"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand font-semibold text-black transition-colors hover:bg-brand-dim disabled:opacity-60"
          >
            {loading ? "Please wait…" : isLogin ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-white/50">
          {isLogin ? "New to NocToc? " : "Already have an account? "}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className="font-medium text-brand hover:underline"
          >
            {isLogin ? "Sign up now" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
