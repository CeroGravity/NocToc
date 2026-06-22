"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import type { Movie } from "@/types/tmdb";

interface BannerMediaProps {
  movie: Movie;
  title: string;
  overview: string;
  backdrop: string | null;
  trailer: string | null;
}

export function BannerMedia({
  movie,
  title,
  overview,
  backdrop,
  trailer,
}: BannerMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const openModal = useModalStore((s) => s.openModal);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    }
  }, []);

  return (
    <section className="relative h-[56vw] max-h-[85vh] min-h-[460px] w-full overflow-hidden">
      {trailer ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={trailer}
          poster={backdrop ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : backdrop ? (
        <Image
          src={backdrop}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-raised" />
      )}

      {/* Scrims */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-base to-transparent" />

      {/* Content */}
      <div className="absolute bottom-[18%] left-4 max-w-xl space-y-4 md:left-10">
        <h1 className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
          {title}
        </h1>
        <p className="line-clamp-3 max-w-md text-sm text-white/80 md:text-base">
          {overview}
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={() => openModal(movie)}
            className="gap-2 bg-white font-semibold text-black hover:bg-white/85"
          >
            <Play className="h-5 w-5 fill-black" /> Play
          </Button>
          <Button
            onClick={() => openModal(movie)}
            variant="secondary"
            className="gap-2 bg-white/20 font-semibold text-white backdrop-blur hover:bg-white/30"
          >
            <Info className="h-5 w-5" /> More Info
          </Button>
        </div>
      </div>

      {/* Mute toggle — only when a self-hosted trailer is playing */}
      {trailer && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-[18%] right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/90 transition-colors hover:bg-white/10 md:right-10"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </section>
  );
}
