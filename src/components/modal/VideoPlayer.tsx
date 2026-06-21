"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type VjsPlayer = ReturnType<typeof videojs>;

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VjsPlayer | null>(null);

  useEffect(() => {
    if (!playerRef.current && containerRef.current) {
      const videoEl = document.createElement("video-js");
      videoEl.classList.add("vjs-big-play-centered");
      containerRef.current.appendChild(videoEl);

      playerRef.current = videojs(videoEl, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        preload: "auto",
        poster: poster ?? undefined,
        sources: [{ src, type: "video/mp4" }],
      });
    } else if (playerRef.current) {
      playerRef.current.poster(poster ?? "");
      playerRef.current.src([{ src, type: "video/mp4" }]);
    }
  }, [src, poster]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
