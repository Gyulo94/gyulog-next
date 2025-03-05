"use client";
import { motion, useScroll } from "framer-motion";

export default function Processbar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 origin-[0%] z-10"
      style={{ scaleX: scrollYProgress }}
    ></motion.div>
  );
}
