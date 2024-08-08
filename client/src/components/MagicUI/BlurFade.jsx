import React, { useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import moment from "moment";

const BlurFade = ({
    children,
    className,
    variant,
    duration = 0.4,
    delay = 0,
    yOffset = 14,
    inView = true,
    inViewMargin = "50px",
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
                    className={`${className} blur-fade-container`}
                >
                    {children}
                </motion.div>
                <style jsx>{`
        .blur-fade-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: auto;
        }
        .blur-fade-container::-webkit-scrollbar {
          display: none;
        }
        .blur-fade-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
            </AnimatePresence>
        </div>
    );
};

export default BlurFade;
