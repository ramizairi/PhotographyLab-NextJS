"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../utils/cn";
import Loading from "../common/Loading";
export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const characters = "▷✧✿";
    let interval: NodeJS.Timeout;

    // Matrix text effect
    const matrixInterval = setInterval(() => {
      const randomText = Array(8)
        .fill(0)
        .map(() =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        )
        .join("");
      setMatrixText(randomText);
    }, 50);

    // Progress bar animation
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(matrixInterval);
          setTimeout(() => setIsComplete(true), 500); // Delay before hiding splash screen
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-dark-900 fixed inset-0 z-[60] flex flex-col items-center justify-center transition-opacity duration-500",
        isComplete ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center relative h-48 w-48 mb-4">
        <Image
          src="/logo/logo-white.png"
          alt="SDFM 2520"
          fill
          className="object-contain"
          priority
        />
        <Image
          src="/loading/loading.gif"
          alt="Loading"
          width={200}
          unoptimized
          height={200}
        />
      </div>

      {/* Matrix-style loading text 
      <div className="mb-4 h-6 font-mono text-white">{`LOADING_SYSTEM: ${matrixText}`}</div>
*/}

      {/* Progress bar container */}
      <div className="bg-dark-400 h-1 w-64 overflow-hidden rounded-full">
        <div
          className="h-full bg-white transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <div className="mt-2 font-mono text-sm text-white">{`${progress}%`}</div>
    </div>
  );
}
