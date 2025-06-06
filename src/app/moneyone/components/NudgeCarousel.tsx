'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const nudgeCards = [
  {
    id: 'line',
    icon: <Image src="/surplus.png" alt="Surplus Funds Detected" width={40} height={40} />,
    title: 'SURPLUS FUNDS DETECTED',
    description: 'Gain up to 7.5% returns with our Smart Fixed Deposits',
  },
  {
    id: 'pie',
    icon: <Image src="/rent.png" alt="Upcoming Rent Payment" width={40} height={40} className="scale-125" />,
    title: 'UPCOMING RENT PAYMENT',
    description: 'Your rent is due soon and balance is low. Add funds to avoid issues.',
  },
  {
    id: 'bar',
    icon: <Image src="/homeloan.png" alt="Secure Your Loan" width={40} height={40} className="scale-125" />,
    title: 'SECURE YOUR LOAN',
    description: 'Secure your home loan. Protect your family with a Loan Protection Cover.',
  },
];

const variants = {
  enter: {
    opacity: 0,
    y: 10,
    scale: 0.98,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
};

interface NudgeCarouselProps {
    activeCardId: 'line' | 'pie' | 'bar';
}

export const NudgeCarousel = ({ activeCardId }: NudgeCarouselProps) => {
  const page = nudgeCards.findIndex(card => card.id === activeCardId);
  const card = nudgeCards[page];

  return (
    <div className="flex flex-col items-center justify-center w-[270px] h-[100px]">
      <div className="relative w-full h-[90px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={page}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full p-2 bg-white/80 shadow-lg backdrop-blur-sm rounded-xl border border-[#E1E7F2]/50 flex items-center"
          >
            <div className="flex-shrink-0 mr-2">
              {card.icon}
            </div>
            <div className="flex-grow">
              <h3 className="text-[12px] font-semibold text-blue-900 flex items-center">
                {card.title}
              </h3>
              <p className="text-[11px] text-slate-600 mt-.5">{card.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex space-x-2 mt-4">
        {nudgeCards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full`}
            animate={{
              width: i === page ? 12 : 8,
              backgroundColor: i === page ? '#02497D' : '#D1D5DB'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}; 