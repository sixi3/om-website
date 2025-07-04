"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  METALLIC_BLACK_TEXT_CLASSES, 
  ANIMATION_CONFIG
} from "../constants";

const Team = React.memo(() => {
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
            OUR LEADERSHIP
          </span>
          <h2 className={`text-4xl md:text-5xl lg:text-5xl leading-tight  ${METALLIC_BLACK_TEXT_CLASSES} max-w-6xl mt-8 mx-auto`}>
            Meet the{" "}
            <span className="inline-block bg-[#baff29] px-2 text-black font-bold">
              visionaries
            </span>{" "}
            behind our success
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Our diverse team of experts brings together decades of experience in fintech, identity verification, and data analytics to drive innovation.
          </p>
        </motion.div>

        {/* Team grid content will be added here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.duration,
            delay: 0.2
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Team member cards will be added here */}
          <div className="text-center text-slate-500 col-span-full py-12">
            Team member content coming soon...
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';

export { Team }; 