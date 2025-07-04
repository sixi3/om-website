"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

const BoardOfDirectors = React.memo(() => {
  return (
    <section className="relative w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            ease: "easeOut"
          }}
          className="text-center space-y-6 mb-16"
        >
          <span className="text-sm font-semibold text-[#00b140] tracking-widest uppercase">
            BOARD OF DIRECTORS
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-5xl leading-tight ${METALLIC_BLACK_TEXT_CLASSES} max-w-6xl mt-8 mx-auto`}>
            Strategic{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              governance
            </span>{" "}
            from industry leaders
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our board comprises seasoned executives and thought leaders who provide strategic guidance and oversight to drive sustainable growth and innovation.
          </p>
        </motion.div>

        {/* Board members grid content will be added here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.2
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Board member cards will be added here */}
          <div className="text-center text-slate-500 col-span-full py-12">
            Board member content coming soon...
          </div>
        </motion.div>
      </div>
    </section>
  );
});

BoardOfDirectors.displayName = 'BoardOfDirectors';

export { BoardOfDirectors }; 