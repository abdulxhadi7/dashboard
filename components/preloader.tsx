"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 1500); // You can adjust duration

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground transition-opacity duration-300">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;
