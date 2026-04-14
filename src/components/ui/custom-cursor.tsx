"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 250,
        mass: 0.5,
      }}
    />
  );
};
