import React from "react";
import { motion } from "framer-motion";

export function BackgroundBoxes() {
  const rows = new Array(7).fill(1);
  const cols = new Array(4).fill(1);

  return (
    <div
      style={{
        transform: "scale(0.5)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.1,
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
          }}
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 0.1,
                scale: 1,
              }}
              transition={{
                duration: 2,
                delay: j * 0.2,
              }}
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "1rem",
                background: "var(--primary)",
              }}
            ></motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
} 