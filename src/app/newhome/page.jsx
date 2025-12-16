"use client"
import React, { useState, useCallback } from 'react';
// Modern Luxury Design Update with In-Card Carousel
// - Added image carousel inside ProductCard.
// - Updated styling to match the "Add to Bag" reference image.
// - Kept the Gemini AI integration intact.

// --- Gemini API Configuration ---
const apiKey = ""; 
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';

// --- API Helper Function ---
const makeApiCall = async (payload, retries = 3) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 429 && i < retries - 1) {
                    const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                throw new Error(`API call failed: ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                return result.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Invalid response from API.");
            }
        } catch (error) {
            if (i === retries - 1) throw error;
        }
    }
};

// --- Updated Data with Multiple Images ---
const featuredProducts = [
  {
    id: 1,
    name: "SAIYARA",
    category: "Long Kurti",
    description: "Black floral Tie knot long kurti with contemporary cuts.",
    price: "₹719",
    oldPrice: "₹799",
    discount: "10% OFF",
    // Array of images for carousel
    images: [
        "https://placehold.co/400x550/F3F4F6/1F2937?text=SAIYARA+Front",
        "https://placehold.co/400x550/E5E7EB/1F2937?text=SAIYARA+Back",
        "https://placehold.co/400x550/D1D5DB/1F2937?text=SAIYARA+Detail"
    ],
    tags: ["Printed", "Comfort Fit"],
    rating: 4.2
  },
  {
    id: 2,
    name: "GULNAAZ",
    category: "Ethnic Set",
    description: "Graceful style statement with intricate embroidery.",
    price: "₹674",
    oldPrice: "₹749",
    discount: "15% OFF",
    images: [
        "https://placehold.co/400x550/E5E7EB/1F2937?text=GULNAAZ+Front",
        "https://placehold.co/400x550/D1D5DB/1F2937?text=GULNAAZ+Side"
    ],
    tags: ["Embroidery", "Festive"],
    rating: 4.8
  },
  {
    id: 3,
    name: "MEHEK",
    category: "Floral Dress",
    description: "Mini dress perfect for day outings and casual brunches.",
    price: "₹1069",
    oldPrice: "₹1199",
    discount: "40% OFF",
    images: [
        "https://placehold.co/400x550/F3F4F6/1F2937?text=MEHEK+Front",
        "https://placehold.co/400x550/E5E7EB/1F2937?text=MEHEK+Back",
        "https://placehold.co/400x550/D1D5DB/1F2937?text=MEHEK+Zoom"
    ],
    tags: ["Floral", "Mini Dress"],
    rating: 4.5
  },
  {
    id: 4,
    name: "ADDA",
    category: "Short Kurti",
    description: "Elevate your daily style with our breathable cotton prints.",
    price: "₹539",
    oldPrice: "₹599",
    discount: "10% OFF",
    images: [
        "https://placehold.co/400x550/E5E7EB/1F2937?text=ADDA+Front",
        "https://placehold.co/400x550/D1D5DB/1F2937?text=ADDA+Back"
    ],
    tags: ["Cotton", "Daily Wear"],
    rating: 4.0
  },
  {
    id: 5,
    name: "ZARA",
    category: "Anarkali Suit",
    description: "Elegant maroon Anarkali for wedding season.",
    price: "₹1599",
    oldPrice: "₹2999",
    discount: "45% OFF",
    images: [
        "https://placehold.co/400x550/E5E7EB/1F2937?text=ZARA+Front",
        "https://placehold.co/400x550/D1D5DB/1F2937?text=ZARA+Dupatta"
    ],
    tags: ["Party Wear", "Silk Blend"],
    rating: 4.9
  },
  {
    id: 6,
    name: "NOOR",
    category: "Palazzo Set",
    description: "Comfortable palazzo set with modern prints.",
    price: "₹899",
    oldPrice: "₹1299",
    discount: "30% OFF",
    images: [
        "https://placehold.co/400x550/F3F4F6/1F2937?text=NOOR+Front",
        "https://placehold.co/400x550/E5E7EB/1F2937?text=NOOR+Detail"
    ],
    tags: ["Casual", "Relaxed Fit"],
    rating: 4.3
  }
];

const reelsData = [
  { id: 1, title: "Styling Hacks", views: "12K", image: "https://placehold.co/350x600/D1D5DB/ffffff?text=Style+Hacks" },
  { id: 2, title: "Wedding Look", views: "45K", image: "https://placehold.co/350x600/9CA3AF/ffffff?text=Wedding+Edit" },
  { id: 3, title: "Drape Tutorial", views: "8.5K", image: "https://placehold.co/350x600/6B7280/ffffff?text=Drape+DIY" },
  { id: 4, title: "GRWM", views: "22K", image: "https://placehold.co/350x600/4B5563/ffffff?text=GRWM+Video" },
];

// --- Components ---

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Helper to handle carousel navigation
  const nextImage = (e) => {
    e.stopPropagation(); // Prevent clicking the card link if we wrapped it
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // AI Functionality
  const getStylingSuggestion = useCallback(async () => {
    if (isLoading) return;
    setSuggestion(null);
    setIsLoading(true);

    const userQuery = `Suggest a chic styling recommendation for "${product.name}" (${product.category}). Description: "${product.description}".`;
    
    const responseSchema = {
      type: "OBJECT",
      properties: {
        tip: { type: "STRING", description: "One sentence fashion tip." },
        pairWith: { type: "STRING", description: "Best item to pair with." }
      }
    };

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: "You are a high-end fashion stylist. Provide a short, trendy styling tip in Hindi (Latin script) mixed with English terms." }]
        },
        generationConfig: { responseMimeType: "application/json", responseSchema: responseSchema }
    };
    
    try {
        const jsonString = await makeApiCall(payload);
        setSuggestion(JSON.parse(jsonString));
        setShowAI(true);
    } catch (e) {
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  }, [product, isLoading]);

  return (
    <div className="flex flex-col group">
        {/* Image Carousel Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
            <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out"
            />
            
            {/* Carousel Arrows (Visible on Hover) */}
            <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:bg-white"
            >
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:bg-white"
            >
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            {/* Rating Badge (Bottom Left) */}
            <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 flex items-center gap-1 shadow-sm">
                 <span className="text-xs font-bold">{product.rating}</span>
                 <svg className="w-3 h-3 text-black fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>

            {/* Carousel Dots (Optional visual indicator) */}
            <div className="absolute bottom-3 right-3 flex gap-1">
                {product.images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-black' : 'bg-white/60'}`}
                    />
                ))}
            </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {product.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 border border-gray-200 text-[10px] uppercase tracking-wide text-gray-600">
                        {tag}
                    </span>
                ))}
            </div>

            <h3 className="text-base font-medium text-gray-900 mb-1">{product.name} <span className="text-gray-500 font-normal ml-1 text-sm">{product.category}</span></h3>
            
            {/* Price Row */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                {product.oldPrice && (
                    <>
                        <span className="text-sm text-gray-400 line-through decoration-1">{product.oldPrice}</span>
                        <span className="text-sm font-bold text-green-600">{product.discount}</span>
                    </>
                )}
            </div>

            {/* Add to Bag Button (Full Width Outline) */}
            <button className="w-full py-2.5 border border-gray-900 text-sm font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors duration-300 mt-auto">
                Add to Bag
            </button>

            {/* AI Stylist Text Link (Below button) */}
            <div className="mt-2 text-center">
                 {!showAI ? (
                    <button 
                        onClick={getStylingSuggestion}
                        disabled={isLoading}
                        className="text-xs text-purple-700 hover:text-purple-900 hover:underline transition-colors"
                    >
                        {isLoading ? "Thinking..." : "✨ View Styling Tip"}
                    </button>
                ) : (
                    <div className="mt-2 p-2 bg-purple-50 text-xs text-left relative group-ai">
                        <button onClick={() => setShowAI(false)} className="absolute top-1 right-1 text-purple-400 hover:text-purple-900">×</button>
                        <p className="font-bold text-purple-900 mb-1">Stylist Tip:</p>
                        <p className="italic text-gray-700 mb-1">{suggestion?.tip}</p>
                        <p className="text-gray-600"><span className="font-semibold">Pair:</span> {suggestion?.pairWith}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

const ReelsSection = () => {
    return (
        <section className="py-20 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-serif mb-4">Trending Now</h2>
                        <p className="text-gray-400 text-lg font-light">
                            Real girls, real style. See how our community styles their favorites.
                        </p>
                    </div>
                    <button className="mt-6 md:mt-0 px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-[0.2em]">
                        View Instagram
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {reelsData.map((reel) => (
                        <div key={reel.id} className="group relative aspect-[9/16] cursor-pointer overflow-hidden bg-gray-900">
                            <img 
                                src={reel.image} 
                                alt={reel.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                <span className="text-xs font-bold bg-red-600 w-fit px-2 py-0.5 rounded text-white mb-2">▶ REEL</span>
                                <h3 className="text-xl font-serif leading-tight mb-1">{reel.title}</h3>
                                <p className="text-xs text-gray-300">{reel.views} views</p>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// 3. Main App Component
export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen selection:bg-purple-100 selection:text-purple-900">
      
      {/* -------------------- Featured Collection -------------------- */}
      <section className="py-24 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Spring / Summer 25</span>
            <h2 className="text-4xl md:text-6xl font-serif text-gray-900">
                The Curated Edit
            </h2>
            <div className="w-24 h-0.5 bg-gray-900 mt-6"></div>
        </div>
        
        {/* Adjusted Grid for better spacing with the new taller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <div className="mt-20 text-center">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                <span className="uppercase tracking-widest">Shop All Arrivals</span>
                <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-gray-900 -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200"></div>
            </button>
        </div>
      </section>

      {/* -------------------- Reels Section -------------------- */}
      <ReelsSection />
      
      {/* -------------------- Editorial Banner -------------------- */}
      <section className="relative h-[60vh] flex items-center bg-[#FDFBF7]">
        <div className="absolute inset-0">
             <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E8E6E1] skew-x-12 translate-x-20 hidden md:block"></div>
        </div>
        
        <div className="relative container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10">
            <div className="max-w-xl md:pr-12">
                <span className="inline-block py-1 px-3 border border-gray-900 text-xs font-bold uppercase tracking-wider mb-6">Exclusive Offer</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-[0.9]">
                    Gift of <br/> <span className="italic text-gray-500">Luxury</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md">
                    First 100 orders receive our signature handcrafted potli bag complimentary. Elevate your unboxing experience.
                </p>
                <button className="border-b border-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-colors">
                    Claim Your Gift &rarr;
                </button>
            </div>
            
            <div className="mt-12 md:mt-0 relative">
                 <div className="w-64 h-64 md:w-80 md:h-80 border border-gray-900 rounded-full flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                    <svg className="w-full h-full p-4 text-gray-300" viewBox="0 0 100 100">
                        <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent"/>
                        <text>
                            <textPath href="#curve" className="text-[10px] uppercase tracking-[0.2em] fill-black">
                                • Limited Time Offer • First 100 Orders Only • Shop Now •
                            </textPath>
                        </text>
                    </svg>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🎁</span>
                 </div>
            </div>
        </div>
      </section>

    </div>
  );
}