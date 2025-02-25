"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Banner({ data }: { data?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="px-5 w-full h-32 md:h-60 flex justify-center items-center">
      <h2
        className={`w-full text-5xl leading-[0.8em] md:text-8xl md:leading-[0.81em] transition-all duration-1000 uppercase ${
          theme === "dark" ? "h2-neon" : "h2-neon-light"
        }`}
      >
        {data}
      </h2>
    </div>
  );
}
