'use client';

import React from 'react';
import { CheckCircle2, ChevronRight, ChevronDown, Phone, MapPin, Briefcase, GraduationCap, Building, CreditCard, ShieldQuestion, Fingerprint, Landmark, FileText, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VerificationItemProps {
  icon: 'phone' | 'aadhaar' | 'pan' | 'pf-uan' | 'address' | 'employment' | 'education' | 'landmark' | 'credit-report' | 'payslip';
  title: string;
  description: string;
  isExpanded?: boolean;
  phone?: string;
}

// Using Lucide icons as placeholders for brand icons for now
const iconMap = {
    phone: Phone,
    aadhaar: Fingerprint,
    pan: CreditCard,
    'pf-uan': ShieldQuestion,
    address: MapPin,
    employment: Briefcase,
    education: GraduationCap,
    landmark: Landmark,
    'credit-report': FileText,
    payslip: Receipt,
};

export const VerificationItem: React.FC<VerificationItemProps & { iconColor: string; iconBackgroundColor: string; }> = ({ 
    icon, 
    title, 
    description, 
    isExpanded = false, 
    phone,
    iconColor,
    iconBackgroundColor
}) => {
    const IconComponent = iconMap[icon];
    return (
        <div className="py-1.5 px-2">
            <div className="flex items-center">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mr-3", iconBackgroundColor)}>
                    <IconComponent className={cn("h-3 w-3", iconColor)} />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-[10px] text-gray-800">{title}</p>
                    {isExpanded && phone ? (
                        <p className="text-[8px] text-gray-500">{phone}</p>
                    ) : (
                        <p className="text-[8px] text-gray-500">{description}</p>
                    )}
                </div>
                <div className="flex items-center ml-auto pl-2">
                    <img src="/verified.svg" alt="verified" className="h-5 w-5 mr-1" />
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                </div>
            </div>
        </div>
    );
}; 