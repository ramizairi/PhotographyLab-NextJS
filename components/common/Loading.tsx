import React from "react";
import Image from "next/image";

interface LoadingProps {
  message: string;
}

function Loading({ message }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
      <div className="relative mb-4 flex h-48 w-48 flex-col items-center">
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
          height={200}
        />
      </div>
    <div className="text-xl text-white">{message}</div>
    </div>
  );
}

export default Loading;
