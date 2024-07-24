import React, { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin = "-50px",
  blur = "6px",
}) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <div className="overflow-y-hidden">
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={`${className} blur-fade-container`} // Add the internal CSS class here
      >
        {children}
      </motion.div>
      <style jsx>{`
        .blur-fade-container {
          overflow: hidden; /* Prevent scrollbars */
          position: relative; /* Ensure correct positioning */
          width: 100%; /* Ensure full width */
          height: auto; /* Adjust height automatically */
        }

        /* Optional: Add specific styling for overflow */
        .blur-fade-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar in WebKit browsers */
        }

        .blur-fade-container {
          scrollbar-width: none; /* Hide scrollbar in Firefox */
          -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer 10+ */
        }
      `}</style>
    </AnimatePresence>
    </div>
  );
};

export default BlurFade;
