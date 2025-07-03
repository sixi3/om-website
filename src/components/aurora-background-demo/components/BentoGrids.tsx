"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BentoGrid, BentoGridItem } from "@/app/onemoney/components/ui/bento-grid";
import { ONE_MONEY_BENTO_DATA, MONEY_ONE_BENTO_DATA, EQUAL_BENTO_DATA } from '../data';
import { BentoItem } from '../types';

interface BentoGridButtonProps {
  item: BentoItem;
  index: number;
  textSize?: string;
}

const BentoGridButton = React.memo<BentoGridButtonProps>(({ item, index, textSize = "text-md lg:text-xl" }) => (
  <button 
    key={index} 
    className="group block w-full h-full text-left p-0 border-none bg-transparent cursor-pointer"
  >
    <BentoGridItem
      {...item}
      colSpan={1}
      title={
        <div className="flex items-center">
          <span className={`group-hover:text-[#00b140] transition-colors duration-200 ${textSize} font-semibold`}>
            {item.title}
          </span>
          <ArrowRight className="h-4 w-4 ml-2 text-black group-hover:text-[#00b140] transition-all duration-200 group-hover:translate-x-1" />
        </div>
      }
      className="shadow-md h-full group-hover:shadow-lg group-hover:scale-[1.02] transition-transform duration-200"
      image={item.image}
      imagePosition={item.imagePosition as any}
      imageSize={item.imageSize}
    />
  </button>
));

BentoGridButton.displayName = 'BentoGridButton';

export const OneMoneyBentoGrid = React.memo(() => (
  <div className="space-y-4">
    {/* First Row - 1 card */}
    <BentoGrid className="grid-cols-1 md:grid-cols-1">
      {ONE_MONEY_BENTO_DATA.slice(0, 1).map((item, i) => (
        <BentoGridButton 
          key={i} 
          item={item} 
          index={i} 
          textSize="text-md lg:text-2xl" 
        />
      ))}
    </BentoGrid>
    {/* Second Row - 3 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-3">
      {ONE_MONEY_BENTO_DATA.slice(1, 4).map((item, i) => (
        <BentoGridButton 
          key={i + 1} 
          item={item} 
          index={i + 1} 
          textSize="text-md lg:text-xl" 
        />
      ))}
    </BentoGrid>
  </div>
));

OneMoneyBentoGrid.displayName = 'OneMoneyBentoGrid';

export const MoneyOneBentoGrid = React.memo(() => (
  <div className="space-y-4">
    <BentoGrid className="grid-cols-1 md:grid-cols-2">
      {MONEY_ONE_BENTO_DATA.slice(0, 2).map((item, i) => (
        <BentoGridButton 
          key={i} 
          item={item} 
          index={i} 
          textSize="text-md lg:text-2xl" 
        />
      ))}
    </BentoGrid>
    <BentoGrid className="grid-cols-1 md:grid-cols-3">
      {MONEY_ONE_BENTO_DATA.slice(2, 5).map((item, i) => (
        <BentoGridButton 
          key={i + 2} 
          item={item} 
          index={i + 2} 
          textSize="text-md lg:text-xl" 
        />
      ))}
    </BentoGrid>
  </div>
));

MoneyOneBentoGrid.displayName = 'MoneyOneBentoGrid';

export const EqualBentoGrid = React.memo(() => (
  <div className="space-y-4">
    {/* First Row - 2 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-2">
      {EQUAL_BENTO_DATA.slice(0, 2).map((item, i) => (
        <BentoGridButton 
          key={i} 
          item={item} 
          index={i} 
          textSize="text-md lg:text-2xl" 
        />
      ))}
    </BentoGrid>
    {/* Second Row - 4 cards */}
    <BentoGrid className="grid-cols-1 md:grid-cols-4">
      {EQUAL_BENTO_DATA.slice(2, 6).map((item, i) => (
        <BentoGridButton 
          key={i + 2} 
          item={item} 
          index={i + 2} 
          textSize="text-xl" 
        />
      ))}
    </BentoGrid>
  </div>
));

EqualBentoGrid.displayName = 'EqualBentoGrid'; 