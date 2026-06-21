"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    if (!email || !password) return;
    if (isLogin) await signIn(email, password);
    else await signUp(email, password);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface-base px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-glow blur-[120px]" />

      <div className="relative z-10 w-full max-w-md animate-fade-up rounded-2xl border border-white/10 bg-surface-raised/80 p-8 backdrop-blur-xl">
        <h1 className="font-display text-3xl font-bold text-brand">NocToc</h1>
        <h2 className="mt-6 text-xl font-semibold text-white">
          {isLogin ? "Sign in" : "Create your account"}
        </h2>

        <div className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface-overlay border-white/10 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-surface-overlay border-white/10 text-white"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-brand text-black hover:bg-brand-dim font-semibold"
          >
            {loading ? "Please wait…" : isLogin ? "Sign in" : "Sign up"}
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/50">
          {isLogin ? "New to NocToc? " : "Already have an account? "}
          <Link href={isLogin ? "/signup" : "/login"} className="text-brand hover:underline">
            {isLogin ? "Sign up now" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
