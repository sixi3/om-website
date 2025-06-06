'use client';

import React from 'react';
import Image from 'next/image';
import { ClayPhoneMockup } from '@/app/onemoney/components/ui/ClayPhoneMockup';
import { NudgeCarousel } from './NudgeCarousel';

interface NudgeUIAnimationProps {
    activeCardId: 'line' | 'pie' | 'bar';
}

export const NudgeUIAnimation = ({ activeCardId }: NudgeUIAnimationProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
        <ClayPhoneMockup className="h-[650px] w-[310px]">
            <div className="relative w-full h-full bg-white dark:bg-neutral-900">
                {/* Base Image Layer */}
                <Image
                src="/nudgeUI.png" 
                alt="Nudges and Insights UI"
                layout="fill"
                objectFit="cover"
                className="rounded-[2rem]"
                priority
                />
                {/* Overlay to enhance contrast */}
                <div className="absolute inset-0 bg-black/30 rounded-[2rem]"></div>
                
                {/* Overlay Carousel Layer */}
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2">
                    <NudgeCarousel activeCardId={activeCardId} />
                </div>
            </div>
        </ClayPhoneMockup>
    </div>
  );
}; 