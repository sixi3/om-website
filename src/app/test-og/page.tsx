import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equal - Test Open Graph",
  description: "Testing Open Graph for WhatsApp",
  openGraph: {
    title: "Equal - India's Largest Data Sharing Platform",
    description: "Equal is India's Most Advanced Data Sharing Platform",
    url: 'https://om-website-ten.vercel.app/test-og',
    siteName: 'Equal',
    images: [
      {
        url: 'https://om-website-ten.vercel.app/Open-Graph-Image.png',
        width: 1200,
        height: 630,
        alt: 'Equal - India\'s Largest Data Sharing Platform',
      },
    ],
  },
  other: {
    'og:image:type': 'image/png',
    'og:image:secure_url': 'https://om-website-ten.vercel.app/Open-Graph-Image.png',
    'og:image:url': 'https://om-website-ten.vercel.app/Open-Graph-Image.png',
  },
};

export default function TestOGPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Equal - Test Page
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is specifically designed to test Open Graph images on WhatsApp
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Open Graph Test</h2>
          <p className="text-gray-600">
            If you can see the green Equal image when sharing this URL on WhatsApp, 
            the Open Graph setup is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}
