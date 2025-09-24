export interface IndustryHighlight {
  stat: string;
  label: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  highlights: IndustryHighlight[];
  productCategory: 'consumer' | 'employee' | 'business';
  relatedProducts?: string[]; // Product IDs that are relevant for this industry
}

export const industryContent: Industry[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Automate residential purchase and commercial entry workflows from start to finish. Partner with Equal to transform your real estate firm into a digital native company.",
    highlights: [
      { stat: "75%", label: "reduced manual efforts" },
      { stat: "55%", label: "improved data quality" },
      { stat: "18+", label: "workflows" }
    ],
    productCategory: "consumer",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "co-working",
    name: "Co-Working",
    description: "Build complex co-working workflows easily with our native journeys. Partner with Equal to elevate your co-working experience.",
    highlights: [
      { stat: "50%", label: "improvement in time spent" },
      { stat: "4x", label: "better customer experience" },
      { stat: "8+", label: "workflows" }
    ],
    productCategory: "consumer",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Develop healthcare specific workflows for patients, beneficiaries, attendants and doctors dynamically with our advanced platform. Partner with Equal to ensure overall improvement in your end-to-end processes.",
    highlights: [
      { stat: "25%", label: "better conversions" },
      { stat: "4X", label: "better customer experience" },
      { stat: "15+", label: "workflows" }
    ],
    productCategory: "consumer",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    description: "Use our globally-compliant workflows to power your pharmaceutical employees and participants. Partner with Equal to ensure highest compliance.",
    highlights: [
      { stat: "100%", label: "reduced drop offs" },
      { stat: "3x", label: "better employee experience" },
      { stat: "5+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "education",
    name: "Education",
    description: "Streamline student and teacher onboarding and compliance with the most advanced solution. Partner with Equal for enabling an enhanced experience.",
    highlights: [
      { stat: "35%", label: "reduced fraud" },
      { stat: "45%", label: "increase in efficiency" },
      { stat: "15+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "it-services",
    name: "IT Services",
    description: "Digitize your employee base seamlessly using our advanced engines. Partner with Equal for using our pre-created journeys without having to manually build them.",
    highlights: [
      { stat: "25%", label: "reduced fraud" },
      { stat: "30%", label: "faster verifications" },
      { stat: "8+", label: "workflows" }
    ],
    productCategory: "business",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "digital-services",
    name: "Digital Services",
    description: "Achieve the highest success rates for all your journeys with Equal's game changing 1-click experience. Partner with Equal to make your journeys even more seamless.",
    highlights: [
      { stat: "30%", label: "improvement in conversion" },
      { stat: "4x", label: "better consumer experience" },
      { stat: "30+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "banking-financial-services",
    name: "Banking & Financial Services",
    description: "Improve your BFSI purchase conversions while staying compliant to the regulations. Partner with Equal for all your KYC requirements to grow your business exponentially.",
    highlights: [
      { stat: "55%", label: "reduced drop offs" },
      { stat: "100%", label: "compliant to RBI" },
      { stat: "25+", label: "workflows" }
    ],
    productCategory: "business",
    relatedProducts: ["gateway", "console", "finpro", "onemoney-aa"]
  },
  {
    id: "broking",
    name: "Broking",
    description: "Achieve the best onboarding journeys for your investors. Partner with Equal for all your KYC requirements to grow your customer base in the best manner possible.",
    highlights: [
      { stat: "2x", label: "better customer experience" },
      { stat: "100%", label: "compliant to SEBI" },
      { stat: "12+", label: "workflows" }
    ],
    productCategory: "consumer",
    relatedProducts: ["gateway", "console", "finpro", "onemoney-aa"]
  },
  {
    id: "manufacturing-construction",
    name: "Manufacturing & Construction",
    description: "Digitize your labor force using digital workflows like never before. Partner with Equal to ensure speed and compliance for your workforce.",
    highlights: [
      { stat: "35%", label: "improvement in time" },
      { stat: "20%", label: "reduced fraud" },
      { stat: "14+", label: "workflows" }
    ],
    productCategory: "business",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "housing-finance",
    name: "Housing Finance",
    description: "Build digital workflows for all your housing finance requirements in compliance with RBI. Partner with Equal to reduce the time spent to verify, and make more informed decisions.",
    highlights: [
      { stat: "100%", label: "end-to-end digitised" },
      { stat: "100%", label: "compliant to RBI" },
      { stat: "6+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console", "finpro", "onemoney-aa"]
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Build the most compliant insurance solution with numerous conditional flows. Partner with Equal for leapfrogging all the manual work to build end-to-end automation.",
    highlights: [
      { stat: "35%", label: "improved conversions" },
      { stat: "100%", label: "compliant to IRDAI" },
      { stat: "10+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console", "finpro", "onemoney-aa"]
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Digitize your vehicle purchase and maintenance journeys to make it seamless. Partner with Equal for building a digital native experience.",
    highlights: [
      { stat: "25%", label: "improved retention" },
      { stat: "1st", label: "of its kind cross-platform experience" },
      { stat: "8+", label: "workflows" }
    ],
    productCategory: "business",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "retail-ecommerce",
    name: "Retail & Ecommerce",
    description: "Improve your customer experience with 1-click journeys for purchase and loyalty. Partner with Equal for all your identity touch points in store or online.",
    highlights: [
      { stat: "25%", label: "improved retention" },
      { stat: "1st", label: "of its kind cross platform experience" },
      { stat: "8+", label: "workflows" }
    ],
    productCategory: "consumer",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description: "Speed up customer experience with a 1-click check in platform. Partner with Equal to digitize your end-to-end experience.",
    highlights: [
      { stat: "4X", label: "better customer experience" },
      { stat: "1st", label: "of its kind cross platform experience" },
      { stat: "10+", label: "workflows" }
    ],
    productCategory: "business",
    relatedProducts: ["gateway", "console"]
  },
  {
    id: "travel-transportation",
    name: "Travel & Transportation",
    description: "Empower travellers with a new disruptive experience. Partner with Equal to enable seamless flows in the end-to-end travel journey.",
    highlights: [
      { stat: "4X", label: "better CX" },
      { stat: "1st", label: "of its kind cross platform experience" },
      { stat: "15+", label: "workflows" }
    ],
    productCategory: "employee",
    relatedProducts: ["gateway", "console"]
  }
]; 