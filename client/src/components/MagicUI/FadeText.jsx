import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function FadeText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 10 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={displayText} // Use displayText as key to force animation
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        className={className}
        style={{ overflow: 'hidden', position: 'relative' }} // Ensure overflow is hidden and position is relative
      >
        {displayText}
      </motion.div>
    </AnimatePresence>
  );
}
