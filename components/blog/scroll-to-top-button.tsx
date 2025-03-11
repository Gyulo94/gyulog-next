"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icons } from "../ui/icons";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: 0, y: -250 }}
          animate={{ opacity: 1, x: -20, y: -250 }}
          exit={{ opacity: 0, x: 0, y: -250 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 bg-secondary text-white rounded-full shadow-lg"
        >
          <Icons.scrollToTop className="w-8 h-8" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
