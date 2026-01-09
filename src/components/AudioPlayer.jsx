"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(true);
  const hasInteractedRef = useRef(false);

  const startAudio = useCallback(() => {
    if (!audioRef.current || hasInteractedRef.current) return;

    // Try to play
    audioRef.current
      .play()
      .then(() => {
        hasInteractedRef.current = true;
        setIsPlaying(true);
        setIsBlocked(false);

        // Smooth fade-in
        gsap.to(audioRef.current, {
          volume: 1,
          duration: 4,
          ease: "sine.inOut",
        });
      })
      .catch((err) => {
        // Still blocked or failed attempt
        console.log("Audio play failed/blocked:", err.message);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }

    const onInteraction = () => {
      if (!hasInteractedRef.current) {
        startAudio();
      }

      const events = [
        "click",
        "scroll",
        "touchstart",
        "keydown",
        "wheel",
        "mousedown",
      ];
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };

    // Attempt autoplay immediately
    audioRef.current
      .play()
      .then(() => {
        hasInteractedRef.current = true;
        setIsPlaying(true);
        setIsBlocked(false);
        gsap.to(audioRef.current, { volume: 1, duration: 4 });
      })
      .catch(() => {
        // Blocked, wait for interaction
        setIsBlocked(true);
        const events = [
          "click",
          "scroll",
          "touchstart",
          "keydown",
          "wheel",
          "mousedown",
        ];
        events.forEach((e) =>
          window.addEventListener(e, onInteraction, {
            once: true,
            passive: true,
          })
        );
      });

    return () => {
      const events = [
        "click",
        "scroll",
        "touchstart",
        "keydown",
        "wheel",
        "mousedown",
      ];
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };
  }, [startAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If we haven't successfully started yet, prioritize starting
      if (!hasInteractedRef.current) {
        startAudio();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        gsap.to(audioRef.current, { volume: 1, duration: 2 });
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-row-reverse items-center gap-4">
      <audio
        ref={audioRef}
        src="/minimal piano textures - by Gunther Steudel [Pdsq8P0cAho].opus"
        loop
      />

      <button
        onClick={togglePlay}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 hover:scale-110 active:scale-90 shadow-2xl backdrop-blur-xl border
          ${
            isBlocked && !isPlaying
              ? "animate-pulse bg-amber-900/20 border-amber-900/50 scale-105"
              : "bg-amber-900/10 border-amber-900/20 hover:bg-amber-900/30"
          }
        `}
      >
        <div className="flex items-center justify-center gap-[3px] h-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`w-[3px] bg-amber-900 rounded-full transition-all duration-300 ${
                isPlaying ? "animate-complex-music-bar" : "h-1 opacity-40"
              }`}
              style={{
                animationDelay: `${i * 0.15}s`,
                height: isPlaying ? undefined : "4px",
              }}
            />
          ))}
        </div>
        <div
          className={`absolute inset-0 rounded-full bg-amber-900/20 blur-xl transition-all duration-1000 ${
            isPlaying ? "opacity-100 scale-125" : "opacity-0 scale-100"
          }`}
        />
      </button>

      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-[10px] uppercase tracking-[0.3em] font-bold pointer-events-none select-none drop-shadow-sm transition-colors duration-500
          ${
            isBlocked && !isPlaying
              ? "text-amber-900 animate-bounce"
              : "text-amber-900/60"
          }
        `}
        >
          {isPlaying ? "Stable" : isBlocked ? "Click to play" : "Sound Off"}
        </span>
        <div
          className={`h-px bg-amber-900/30 transition-all duration-700 ${
            isPlaying ? "w-full" : "w-0"
          }`}
        />
      </div>

      <style jsx>{`
        @keyframes complex-music-bar {
          0%,
          100% {
            height: 4px;
            transform: translateY(0);
          }
          25% {
            height: 18px;
            transform: translateY(-2px);
          }
          50% {
            height: 10px;
            transform: translateY(1px);
          }
          75% {
            height: 22px;
            transform: translateY(-1px);
          }
        }
        .animate-complex-music-bar {
          animation: complex-music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
