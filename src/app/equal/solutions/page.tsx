'use client';
import React, { useState } from "react";
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { useCasesData, UseCase } from '../data/useCases';
import { UseCaseCardStack } from "../components/UseCaseCardStack";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SolutionsPage() {
  const orderedUseCaseIds = [
    'hrms',
    'gig-economy',
    'bfsi',
    'staffing',
  ];
  
  const allUseCases = orderedUseCaseIds
    .map(id => useCasesData.find(uc => uc.id === id))
    .filter((uc): uc is UseCase => !!uc);

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? allUseCases.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === allUseCases.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="w-full flex items-center justify-between p-4">
        <button 
          onClick={handlePrev} 
          className="p-3 rounded-full bg-[#00b140]/10 backdrop-blur-sm hover:bg-[#00b140] transition-colors text-[#00b140]/50 hover:text-white z-10 flex-shrink-0"
          aria-label="Previous use case"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 mx-8">
          <UseCaseCardStack 
            items={allUseCases} 
            activeIndex={activeIndex} 
            onTabChange={setActiveIndex} 
          />
        </div>
        <button 
          onClick={handleNext} 
          className="p-3 rounded-full bg-[#00b140]/10 backdrop-blur-sm hover:bg-[#00b140] transition-colors text-[#00b140]/50 hover:text-white z-10 flex-shrink-0"
          aria-label="Next use case"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 