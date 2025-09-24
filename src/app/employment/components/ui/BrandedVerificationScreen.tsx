'use client';

import React from 'react';
import { VerificationScreenHeader } from './VerificationScreenHeader';
import { VerificationList } from './VerificationList';
import { VerificationScreenFooter } from './VerificationScreenFooter';
import { BrandData } from '../../data/brandData';

interface BrandedVerificationScreenProps {
  brand: BrandData;
}

export const BrandedVerificationScreen: React.FC<BrandedVerificationScreenProps> = ({ brand }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 text-gray-800">
      <VerificationScreenHeader 
        logoSrc={brand.logoSrc}
        title={brand.headerTitle}
        subtitle={brand.headerSubtitle}
        backgroundColor={brand.headerBackgroundColor}
      />
      <div className="flex-grow overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden">
        <VerificationList 
          items={brand.verificationItems}
          iconColor={brand.iconColor}
          iconBackgroundColor={brand.iconBackgroundColor}
        />
      </div>
      <VerificationScreenFooter 
        buttonColor={brand.buttonColor}
        itemsCompleted={brand.verificationItems.length}
        itemsTotal={brand.verificationItems.length}
      />
    </div>
  );
}; 