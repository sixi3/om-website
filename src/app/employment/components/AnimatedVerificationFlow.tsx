'use client';

import React, { useState, useEffect } from 'react';
import { brandData } from '../data/brandData';
import { BrandedVerificationScreen } from './ui/BrandedVerificationScreen';

export const AnimatedVerificationFlow: React.FC = () => {
    const [brandIndex, setBrandIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBrandIndex((prevIndex) => (prevIndex + 1) % brandData.length);
        }, 5000); // Change brand every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const currentBrand = brandData[brandIndex];

    return (
        <BrandedVerificationScreen brand={currentBrand} />
    );
};