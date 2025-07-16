'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { useCasesData, UseCase } from '../data/useCases';
import { UseCaseCardStack } from "../components/UseCaseCardStack";

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

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <div className="w-full p-2 sm:p-4">
        <UseCaseCardStack 
          items={allUseCases} 
          activeIndex={activeIndex} 
          onTabChange={setActiveIndex} 
        />
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