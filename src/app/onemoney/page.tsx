import dynamic from 'next/dynamic';
import { Hero } from "./sections/Hero";
// import { WhatIsOneMoney } from "./sections/WhatIsOneMoney"; // Commented out static import
// import { UIFeatures } from "./sections/UIFeatures"; // Commented out static import
// import { Stats } from "./sections/Stats"; // Commented out static import
// import { Solutions } from "./sections/Solutions"; // Commented out static import
// import { SecurityCompliance } from "./sections/SecurityCompliance"; // Commented out static import
// import { ContactUs } from "./sections/ContactUs"; // Commented out static import
// import { Leadership } from "./sections/Leadership"; // Commented out static import
// import { TrustedBy } from "@/sections/TrustedBy";

// Dynamically import the Stats component
const Stats = dynamic(() => 
  import('./sections/Stats').then(mod => mod.Stats),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Stats...</p></div>,
  }
);

// Dynamically import the WhatIsOneMoney component
const WhatIsOneMoney = dynamic(() => 
  import('./sections/WhatIsOneMoney').then(mod => mod.WhatIsOneMoney),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading What is OneMoney...</p></div>,
    // Assuming WhatIsOneMoney.tsx has a named export 'WhatIsOneMoney'
  }
);

// Dynamically import the UIFeatures component
const UIFeatures = dynamic(() => 
  import('./sections/UIFeatures').then(mod => mod.UIFeatures),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading UI Features...</p></div>,
    // Assuming UIFeatures.tsx has a named export 'UIFeatures'
  }
);

// Dynamically import the Solutions component
const Solutions = dynamic(() => 
  import('./sections/Solutions').then(mod => mod.Solutions),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Solutions...</p></div>,
    // Assuming Solutions.tsx has a named export 'Solutions'
  }
);

// Dynamically import the SecurityCompliance component
const SecurityCompliance = dynamic(() => 
  import('./sections/SecurityCompliance').then(mod => mod.SecurityCompliance),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Security & Compliance...</p></div>,
    // Assuming SecurityCompliance.tsx has a named export 'SecurityCompliance'
  }
);

// Dynamically import the Leadership component
const Leadership = dynamic(() => 
  import('./sections/Leadership').then(mod => mod.Leadership),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Leadership...</p></div>,
    // Assuming Leadership.tsx has a named export 'Leadership'
  }
);

// Dynamically import the ContactUs component
const ContactUs = dynamic(() => 
  import('./sections/ContactUs').then(mod => mod.ContactUs),
  { 
    loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading Contact Us...</p></div>,
    // Assuming ContactUs.tsx has a named export 'ContactUs'
  }
);

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhatIsOneMoney />
      <UIFeatures />
      <Solutions />
      <SecurityCompliance />
      <Leadership />
      <ContactUs />
    </>
  );
} 