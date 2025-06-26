import React from "react";
import { GridBackground } from '@/app/onemoney/components/ui/grid-background';
import { useCasesData, UseCase } from '../data/useCases';
import { UseCaseCardStack } from "../components/UseCaseCardStack";

export default function SolutionsPage() {
  const orderedUseCaseIds = [
    'hrms',
    'gig-economy',
    'bfsi',
    'staffing',
    // 'platform-trust', // This seems to be missing from useCasesData
    // 'tech-sme' // This seems to be missing from useCasesData
  ];
  
  const allUseCases = orderedUseCaseIds
    .map(id => useCasesData.find(uc => uc.id === id))
    .filter((uc): uc is UseCase => !!uc);


  return (
    <div className="relative">
      <GridBackground />
      <UseCaseCardStack items={allUseCases} />
    </div>
  );
} 