'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { useCasesData, UseCase } from '../data/useCases';
import { UseCaseCardStack } from "../components/UseCaseCardStack";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SolutionsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const orderedUseCaseIds = [
    'hrms',
    'gig-economy',
    'bfsi',
    'staffing',
  ];
  
  const allUseCases = orderedUseCaseIds
    .map(id => useCasesData.find(uc => uc.id === id))
    .filter((uc): uc is UseCase => !!uc);

  // Set initial active index based on URL parameter
  const getInitialActiveIndex = () => {
    if (tabParam) {
      const index = orderedUseCaseIds.indexOf(tabParam);
      return index !== -1 ? index : 0;
    }
    return 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex);

  // Update active index when URL parameter changes
  useEffect(() => {
    if (tabParam) {
      const index = orderedUseCaseIds.indexOf(tabParam);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [tabParam]);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? allUseCases.length - 1 : activeIndex - 1;
    const selectedItem = allUseCases[newIndex];
    if (selectedItem) {
      const params = new URLSearchParams();
      params.set('tab', selectedItem.id);
      window.history.pushState(null, '', `/equal/solutions?${params.toString()}`);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = activeIndex === allUseCases.length - 1 ? 0 : activeIndex + 1;
    const selectedItem = allUseCases[newIndex];
    if (selectedItem) {
      const params = new URLSearchParams();
      params.set('tab', selectedItem.id);
      window.history.pushState(null, '', `/equal/solutions?${params.toString()}`);
      setActiveIndex(newIndex);
    }
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

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div className="w-full h-96 flex justify-center items-center"><p>Loading...</p></div>}>
      <SolutionsContent />
    </Suspense>
  );
} 