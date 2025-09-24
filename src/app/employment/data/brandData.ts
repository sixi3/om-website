import { VerificationItemProps } from '../components/ui/VerificationItem';

export interface BrandData {
    id: string;
    logoSrc: string;
    headerTitle: string;
    headerSubtitle: string;
    headerBackgroundColor: string;
    buttonColor: string;
    iconColor: string;
    iconBackgroundColor: string;
    verificationItems: VerificationItemProps[];
}

export const brandData: BrandData[] = [
    {
        id: 'workforce',
        logoSrc: '/workforce.png',
        headerTitle: 'WorkForce Pvt Ltd.',
        headerSubtitle: 'Candidate Verification',
        headerBackgroundColor: 'bg-gradient-to-br from-green-600 to-green-800',
        buttonColor: 'bg-gradient-to-br from-green-600 to-green-800',
        iconColor: 'text-green-600',
        iconBackgroundColor: 'bg-green-100/50',
        verificationItems: [
            {
                icon: 'phone',
                title: 'Mobile Number',
                description: '',
                isExpanded: true,
                phone: '+91 XXXXXX5617'
            },
            {
                icon: 'aadhaar',
                title: 'Aadhaar',
                description: 'XXXXXXXX9283',
                isExpanded: true,
            },
            {
                icon: 'pan',
                title: 'PAN',
                description: 'XXXXXX283L',
                isExpanded: true,
            },
            {
                icon: 'pf-uan',
                title: 'PF UAN',
                description: 'XXXXXXXX8376',
                isExpanded: true,
            },
            {
                icon: 'address',
                title: 'Digital Address',
                description: 'C9JM+W29 THE LOFT, RMZ Nex...',
                isExpanded: true,
            },
            {
                icon: 'employment',
                title: 'Employment',
                description: '3 employment(s) added',
                isExpanded: true,
            },
            {
                icon: 'education',
                title: 'Education',
                description: '1 education(s) added',
                isExpanded: true,
            },
        ]
    },
    {
        id: 'fincorp',
        logoSrc: '/fincorp.png',
        headerTitle: 'FinCorp Inc.',
        headerSubtitle: 'Customer KYC',
        headerBackgroundColor: 'bg-gradient-to-br from-blue-700 to-blue-900',
        buttonColor: 'bg-gradient-to-br from-blue-800 to-blue-900',
        iconColor: 'text-blue-600',
        iconBackgroundColor: 'bg-blue-100',
        verificationItems: [
            {
                icon: 'phone',
                title: 'Mobile Number',
                description: '',
                isExpanded: true,
                phone: '+91 XXXXXX3210'
            },
            {
                icon: 'pan',
                title: 'PAN',
                description: 'Verify using PAN details',
                isExpanded: true,
            },
            {
                icon:'landmark',
                title: 'Bank Account',
                description: 'XXXXXXXX8294',
                isExpanded: true,
            },
            {
                icon: 'address',
                title: 'Digital Address',
                description: 'C9JM+W29 THE LOFT, RMZ Nex...',
                isExpanded: true,
            },
        ]
    },
    {
        id: 'lm-tech',
        logoSrc: '/L&M-tech.png',
        headerTitle: 'L&M Tech',
        headerSubtitle: 'Employee Verification',
        headerBackgroundColor: 'bg-gradient-to-br from-red-600 to-red-800',
        buttonColor: 'bg-gradient-to-br from-red-600 to-red-800',
        iconColor: 'text-red-600',
        iconBackgroundColor: 'bg-red-100/50',
        verificationItems: [
            {
                icon: 'phone',
                title: 'Mobile Number',
                description: 'Verify using Mobile & OTP',
                isExpanded: true,
            },
            {
                icon: 'aadhaar',
                title: 'Aadhaar',
                description: 'Verify using Aadhaar & OTP',
                isExpanded: true,
            },
            {
                icon: 'pan',
                title: 'PAN',
                description: 'Verify using PAN details',
                isExpanded: true,
            },
            {
                icon: 'landmark',
                title: 'Bank Account',
                description: 'Verify bank account details',
                isExpanded: true,
            },
            {
                icon: 'credit-report',
                title: 'Credit Report',
                description: 'Fetch latest credit report',
                isExpanded: true,
            },
            {
                icon: 'payslip',
                title: 'Payslip',
                description: 'Upload latest payslip',
                isExpanded: true,
            },
        ]
    }
]; 