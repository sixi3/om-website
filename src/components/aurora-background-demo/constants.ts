import { AnimationConfig } from './types';

// CSS Classes
export const METALLIC_GREEN_TEXT_CLASSES = "font-extrabold bg-gradient-to-br from-[#008000] to-[#00b140] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
export const METALLIC_BLACK_TEXT_CLASSES = "font-extrabold bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Animation Configuration
export const ANIMATION_CONFIG: AnimationConfig = {
  duration: 0.6,
  ease: "easeInOut" // approximate easeInOut cubic-bezier
};

// Client Logos - Most popular clients from employment and BFSI sectors
export const CLIENT_LOGOS = [
  // Major Banks (BFSI)
  "/om-list/HDFC Bank.png",
  "/om-list/ICICI Bank.png",
  "/om-list/SBI.png",
  "/om-list/Kotak Mahindra Bank.png",

  // Financial Services & Brokerages
  "/om-list/Zerodha.png",
  "/om-list/Motilal Oswal.png",
  "/mo-clients/Paisabazaar.png",
  "/om-list/AngelOne.png",

  // Additional mo-clients logos
  "/mo-clients/RBL Bank.png",
  "/mo-clients/IDBI Bank.png",
  "/mo-clients/Home Credit.png",
  "/mo-clients/Kotak Securities.png",
  "/mo-clients/Motilal Oswal MF.png",
  "/mo-clients/Jio Insurance.png",
  "/mo-clients/Epifi Wealth (FI).png",

  // Major Corporations (Employment)
  "/kye-clients/L&T.png",
  "/kye-clients/JSW.png",
  "/kye-clients/Airtel.png",
  "/kye-clients/EY.png",

  // Healthcare & Pharma (Employment)
  "/kye-clients/Glenmark.png",
  "/kye-clients/Hetero Labs.png",
  "/kye-clients/Wellness Forever.png",
  "/kye-clients/Honour Labs.png"
];

// Specialized logo arrays for different solutions
export const LENDING_LOGOS = [
  "/mo-clients/HDFC Bank.png",
  "/mo-clients/SBI.png",
  "/mo-clients/RBL Bank.png",
  "/mo-clients/IDBI Bank.png",
  "/mo-clients/Home Credit.png",
  "/mo-clients/Bajaj Finserv 2.png",
  "/mo-clients/Poonawalla Fincorp.png",
  "/mo-clients/Snapmint.png",
  "/mo-clients/MPokket.png",
  "/mo-clients/Early Salary (Fibe).png"
];

export const WEALTH_MANAGEMENT_LOGOS = [
  "/mo-clients/Motilal Oswal MF.png",
  "/mo-clients/Kotak Securities.png",
  "/mo-clients/Epifi Wealth (FI).png",
  "/mo-clients/HDFC Bank.png",
  "/mo-clients/SBI.png",
  "/mo-clients/Jio Insurance.png"
];

export const BROKERAGE_LOGOS = [
  "/mo-clients/Kotak Securities.png",
  "/mo-clients/Motilal Oswal MF.png",
  "/mo-clients/HDFC Bank.png",
  "/mo-clients/SBI.png",
  "/mo-clients/Paisabazaar.png"
];

export const ADVISORY_LOGOS = [
  "/mo-clients/Paisabazaar.png",
  "/mo-clients/Motilal Oswal MF.png",
  "/mo-clients/Kotak Securities.png",
  "/mo-clients/Jio Insurance.png",
  "/mo-clients/HDFC Bank.png",
  "/mo-clients/Epifi Wealth (FI).png"
]; 