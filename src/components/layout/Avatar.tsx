"use client";

import { useAuthStore } from "@/store/useAuthStore";

// Swap STYLE for any DiceBear style: miniavs, fun-emoji, adventurer, bottts, avataaars, lorelei…
const STYLE = "miniavs";

export function Avatar({ size = 32 }: { size?: number }) {
  const user = useAuthStore((s) => s.user);
  const seed = encodeURIComponent(user?.email ?? user?.uid ?? "guest");
  const src = `https://api.dicebear.com/10.x/${STYLE}/svg?seed=${seed}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Your avatar"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="rounded-md bg-surface-overlay"
    />
  );
}
