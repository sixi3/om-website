'use client';

import React from 'react';
import { VerificationItem, VerificationItemProps } from './VerificationItem';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationListProps {
  items: VerificationItemProps[];
  iconColor: string;
  iconBackgroundColor: string;
}

const itemVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const VerificationList: React.FC<VerificationListProps> = ({ items, iconColor, iconBackgroundColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 py-1">
        <AnimatePresence>
            {items.map((item, index) => (
                <motion.div
                    key={item.title} // Assuming title is unique for animations
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                >
                    <VerificationItem 
                      {...item}
                      iconColor={iconColor}
                      iconBackgroundColor={iconBackgroundColor}
                    />
                    {index < items.length - 1 && <div className="border-b border-slate-200 my-1"></div>}
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
}; 