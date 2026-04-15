"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type DeferredRenderProps = {
  children: ReactNode;
  className?: string;
  minHeight?: string;
  rootMargin?: string;
};

export function DeferredRender({
  children,
  className,
  minHeight,
  rootMargin = "1000px 0px",
}: DeferredRenderProps) {
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!markerRef.current) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(markerRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  if (shouldRender) {
    return <>{children}</>;
  }

  return (
    <div
      ref={markerRef}
      aria-hidden="true"
      className={className}
      style={minHeight ? { minHeight } : undefined}
    />
  );
}
