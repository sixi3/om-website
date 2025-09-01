import { AnimationConfig } from './types';
import { easeInOut } from 'framer-motion';

// CSS Classes
export const METALLIC_GREEN_TEXT_CLASSES = "font-extrabold bg-gradient-to-br from-[#008000] to-[#00b140] bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";
export const METALLIC_BLACK_TEXT_CLASSES = "font-extrabold bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-neutral-700 dark:to-neutral-900";

// Animation Configuration
export const ANIMATION_CONFIG: AnimationConfig = {
  duration: 0.6,
  ease: easeInOut
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