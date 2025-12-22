"use client"
import React, { useState } from 'react';
import { ShoppingBag, Heart, Share2, ChevronRight, Star, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

const App = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImage, setActiveImage] = useState(0);

  // Mock product data based on your images
  const product = {
    name: "LINEAR STRUCTURED KNIT CARDIGAN",
    price: 1899,
    mrp: 3299,
    discount: "42% OFF",
    rating: 4.2,
    reviews: 128,
    colors: ["#E5E7EB", "#D1D5DB", "#9CA3AF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium cotton-blend knitted cardigan featuring a structured linear pattern, polo collar, and full-length sleeves. Designed for a modern slim-fit aesthetic with a focus on geometric precision.",
    highlights: [
      { label: "Fabric", value: "80% Cotton, 20% Acrylic" },
      { label: "Fit", value: "Slim Fit" },
      { label: "Pattern", value: "Self-Design / Structured" },
      { label: "Occasion", value: "Casual / Semi-Formal" }
    ],
    // Placeholder images representing the style in your uploads
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614676466623-f1f0e7240212?auto=format&fit=crop&q=80&w=800"
    ]
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* Navigation Dummy */}
      <nav className="border-b border-zinc-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="text-xl font-black tracking-tighter italic">STUDIO_COLLECTIVE</div>
        <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:line-through">Shop</a>
          <a href="#" className="hover:line-through">Collections</a>
          <a href="#" className="hover:line-through">About</a>
        </div>
        <div className="flex space-x-4">
          <ShoppingBag size={20} />
          <Heart size={20} />
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-8">
          <span>Home</span> <ChevronRight size={10} />
          <span>Men</span> <ChevronRight size={10} />
          <span>Knitwear</span> <ChevronRight size={10} />
          <span className="text-zinc-900 font-bold underline underline-offset-4">Cardigans</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: SQUARE IMAGE GRID (The 'Hero' Section) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative aspect-[3/4] overflow-hidden bg-zinc-100 border border-zinc-100 group cursor-zoom-in ${idx === 0 ? 'col-span-2 aspect-[4/5]' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      New Arrival
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS (The 'Fixed' Content) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8">
              
              {/* Header */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold leading-none tracking-tight">
                    {product.name}
                  </h1>
                  <button className="p-2 border border-zinc-200 hover:bg-zinc-50">
                    <Share2 size={18} />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex bg-zinc-900 text-white px-2 py-0.5 text-xs font-bold items-center">
                    {product.rating} <Star size={10} fill="currentColor" className="ml-1" />
                  </div>
                  <span className="text-zinc-400 text-xs border-l border-zinc-200 pl-3 uppercase tracking-wider">
                    {product.reviews} Global Reviews
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-1">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-light tracking-tight">₹{product.price}</span>
                  <span className="text-xl text-zinc-400 line-through font-light">MRP ₹{product.mrp}</span>
                  <span className="text-orange-600 font-bold text-sm tracking-widest uppercase italic">{product.discount}</span>
                </div>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest pt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Size Selector - STRICT SQUARE STYLE */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Select Size</h3>
                  <button className="text-[10px] font-bold underline underline-offset-4 uppercase tracking-wider hover:text-orange-600 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 w-14 border text-sm font-bold transition-all duration-200 flex items-center justify-center 
                        ${selectedSize === size 
                          ? 'border-black bg-black text-white ring-1 ring-black ring-offset-2' 
                          : 'border-zinc-200 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 bg-black text-white h-16 text-sm font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-[0.98]">
                  <div className="flex items-center justify-center space-x-3">
                    <ShoppingBag size={20} />
                    <span>Add to Bag</span>
                  </div>
                </button>
                <button className="sm:w-16 h-16 border border-zinc-200 flex items-center justify-center hover:border-black transition-all group">
                  <Heart size={24} className="group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Delivery Info Box (Square Borders) */}
              <div className="border border-zinc-200 p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Truck size={20} className="text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider">Free Delivery</p>
                    <p className="text-xs text-zinc-500">Order today, receive by Tue, 24 Dec</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 border-t border-zinc-100 pt-4">
                  <RefreshCw size={20} className="text-zinc-400" />
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider">14-Day Easy Exchange</p>
                    <p className="text-xs text-zinc-500">No questions asked return policy</p>
                  </div>
                </div>
              </div>

              {/* Product Specifications Table */}
              <div className="pt-8 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] pb-2 border-b-2 border-black w-fit">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-zinc-100 pt-6">
                  {product.highlights.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-4">
                   <p className="text-sm leading-relaxed text-zinc-600 border-l-2 border-zinc-200 pl-4">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 flex justify-between border-t border-zinc-100">
                <div className="flex flex-col items-center space-y-2">
                  <ShieldCheck size={24} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Star size={24} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Authentic Goods</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <RefreshCw size={24} className="text-zinc-300" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Easy Returns</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Products Placeholder */}
        <section className="mt-24 pt-12 border-t border-zinc-100">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-12 text-center">Complete the look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4 group cursor-pointer">
                <div className="aspect-[3/4] bg-zinc-100 border border-zinc-100 overflow-hidden">
                   <img 
                    src={`https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&sig=${i}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    alt="Related item"
                   />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider truncate">Contrast Trim Cardigan</h4>
                  <p className="text-sm font-light mt-1">₹1,299</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 border-t border-zinc-200 mt-24 px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-lg font-black italic tracking-tighter">STUDIO_COLLECTIVE</div>
            <p className="text-xs text-zinc-500 leading-loose uppercase tracking-tighter">
              Minimalist design. Maximum precision. Based on geometric architecture principles.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Support</h4>
            <ul className="text-xs space-y-3 font-medium uppercase tracking-widest text-zinc-400">
              <li className="hover:text-black cursor-pointer">Shipping Policy</li>
              <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-black cursor-pointer">Privacy</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="EMAIL_ADDRESS" 
                className="bg-transparent border border-zinc-300 px-4 py-3 text-[10px] flex-1 outline-none border-r-0 focus:border-black transition-colors"
              />
              <button className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;