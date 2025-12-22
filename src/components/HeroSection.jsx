
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Sparkles, X, Loader2 } from 'lucide-react';
import Link from "next/link";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // AI State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Slide Data (Fashion Themed)
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "sewing-thread.webp",
      subtitle: "PREMIUM FABRICS",
      title: "Summer Fabric Collection",
      description:
        "Lightweight cotton aur breathable summer blends. Rozana wear ke liye super comfortable.",
      buttonText: "View",
      accentColor: "from-[#CFE7C6] to-[#9CAF88]",
      price: "Starting ₹539",
      link: "https://www.trendikala.com/short-kurti/adda"
    },
    {
      id: 2,
      image: "tailor-sewing-machine.webp",
      subtitle: "DESIGNER CRAFT",
      title: "Custom Tailored Creations",
      description:
        "Intricate stitching aur modern patterns. Premium tailoring jo aapko perfect fit de.",
      buttonText: "View",
      accentColor: "from-[#CFE7C6] to-[#9CAF88]",
      price: "Made-to-Order",
      link: "/enquiry-us"
    },
    {
      id: 3,
      image: "fiber-structure.avif",
      subtitle: "FASHION TREND",
      title: "Modern Ready-to-Wear",
      description:
        "Trendy dresses, daily chic outfits aur bold fashion picks. Style jo har occasion me standout kare.",
      buttonText: "Shop Now",
      accentColor: "from-[#CFE7C6] to-[#9CAF88]",
      price: "New Collection",
      link: "/categories"
    }
  ]);


  // Gemini API Call
  const handleGenerateSlide = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setError('');

    // Environment se key automatically aayegi
    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `
      You are a fashion curator for a high-end women's clothing website. 
      Generate a JSON object for a hero slide based on the user's fashion topic.
      The JSON must strictly follow this format:
      {
        "subtitle": "Short uppercase trend name (e.g. WINTER EDIT)",
        "title": "Fashion headline (max 5 words)",
        "description": "Short appealing description for clothes (max 15 words)",
        "buttonText": "Call to action (e.g. Shop Now)",
        "accentColor": "Tailwind gradient string (e.g. 'from-red-500 to-orange-500')",
        "imageKeyword": "Search term for a female fashion model wearing the style",
        "price": "Price tag or label (e.g. 'New Drop' or '₹2,999')"
      }
      Do not include markdown formatting. Return only valid JSON.
    `;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Fashion Topic: ${aiPrompt}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const generatedContent = JSON.parse(cleanJson);

      // Fix: Removed duplicate 'image' key and unnecessary fallback assignments.
      // We rely solely on the generated image keyword for a dynamic URL (best effort).
      const newSlide = {
        id: Date.now(),
        // Using the imageKeyword in a dynamic Unsplash URL for demonstration
        image: `https://source.unsplash.com/1600x900/?fashion,${generatedContent.imageKeyword},woman`,
        ...generatedContent
      };

      setSlides([...slides, newSlide]);
      setCurrentIndex(slides.length);
      setShowAiModal(false);
      setAiPrompt('');
      setIsAutoPlaying(false);

    } catch (err) {
      console.error(err);
      // Removed specific Unsplash comments for cleaner code
      setError("Fashion AI busy hai. Wapas try karein.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Navigation Logic
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !showAiModal) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, showAiModal, slides.length]);

  return (
    <div className="relative w-full h-screen bg-gray-950 font-sans text-white overflow-hidden flex flex-col lg:flex-row">

      <style>{`
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-content { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-image { animation: slideInRight 1s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* --- RIGHT SIDE: IMAGES (Background on Mobile, Right Split on Desktop) --- */}
      <div className="absolute inset-0 lg:static lg:w-[55%] lg:order-2 h-full w-full ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${index === currentIndex
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-105 translate-x-10'
              }`}
          >
            {/* Mobile Overlay (Only visible on small screens) */}
            <div className="absolute inset-0 bg-black/20  z-10" />

            {/* Desktop Gradient Overlay (Left edge fade) */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r  from-gray-950 to-transparent z-10" />

            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center "
              // Fallback image source if the dynamic link fails
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1986&auto=format&fit=crop"; }}
            />

            {/* Price Tag (Floating) */}
            <div className={`absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-20 bg-[#9caf885b] backdrop-blur-md border border-white/20 px-6 py-3 rounded-none animate-bounce hidden sm:block ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
              <Link href={slides[currentIndex].link}>
                <p className="text-xs uppercase tracking-widest mb-1 font-body text-white">Price</p>
                <p className="text-xl font-bold font-heading text-white">{slide.price}</p>
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* --- LEFT SIDE: CONTENT (Foreground on Mobile, Left Split on Desktop) --- */}
      <div className="relative z-20 lg:static lg:w-[45%] lg:order-1 h-full flex items-center bg-transparent ">
        <div className="w-full max-w-xl mx-auto px-6 lg:px-12 xl:px-20">

          {/* Animated Content Wrapper */}
          <div key={slides[currentIndex].id} className="flex flex-col items-start">

            {/* Badge */}
            <div className="animate-content delay-100 mb-6 flex items-center gap-3">
              <span className={`h-px w-12 bg-gradient-to-r ${slides[currentIndex].accentColor}`}></span>
              <span className={`text-sm font-semibold tracking-[0.2em] uppercase text-transparent font-body bg-clip-text bg-gradient-to-r ${slides[currentIndex].accentColor}`}>
                {slides[currentIndex].subtitle}
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-content delay-200 text-4xl sm:text-5xl lg:text-5xl font-heading leading-tight mb-6 text-white">
              {slides[currentIndex].title}
            </h1>

            {/* Description */}
            <p className="animate-content delay-300 text-gray-300 text-lg leading-relaxed font-body mb-8 max-w-md lg:max-w-sm">
              {slides[currentIndex].description}
            </p>

            {/* Buttons */}
            <div className="animate-content delay-300 flex gap-4 w-full  ">
              <Link href="/categories">
                <button className="flex-1 sm:flex-none bg-[#9CAF88] text-white px-8 py-3 font-medium font-body hover:bg-[#9CAF88]0 transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  {slides[currentIndex].buttonText}
                </button>
              </Link>

              <Link href="/categories">
                <button className="hidden sm:flex px-8 py-3 border border-white/20 hover:bg-white/5 transition-colors font-body items-center justify-center gap-2">
                  Collections
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Controls  */}
      <div className="absolute bottom-6 left-6 lg:left-12 z-30 flex items-center gap-6 mb-5 md:ml-8">

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#9CAF88] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#9CAF88] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="hidden sm:flex gap-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 transition-all duration-500 ${index === currentIndex ? 'w-12 bg-[#9CAF88]' : 'w-4 bg-white'}`}
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default HeroCarousel;







