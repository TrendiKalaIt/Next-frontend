"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, LayoutGrid, Grid } from "lucide-react";
import { useRouter } from "next/navigation";


const CategoriesPage = () => {
  const router = useRouter();
  const [dbCategories, setDbCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("editorial");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setDbCategories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, [API_URL]);

  /* ---------------- STATIC META ---------------- */
  const staticMeta = {
    suits: {
      image: "suit img.webp",
      count: "New Collection",
      span: "large",
      tag: "Bestseller",
    },
    anarkali: {
      image: "anarkali img.webp",
      count: "40+ Styles",
      span: "tall",
      tag: "Trending",
    },
    "ethnic-wear": {
      image: "Ethnic-Wear img.webp",
      count: "Festive Ready",
      span: "wide",
      tag: "Wedding",
    },
    "long-kurti": {
      image: "long-suit.webp",
      count: "Daily Wear",
      span: "standard",
    },
    "short-kurti": {
      image: "Short-Kurti img.webp",
      count: "Casual Edit",
      span: "standard",
      tag: "New",
    },
    dress: {
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      count: "Trending Now",
      span: "standard",
      tag: "Viral",
    },
  };

  /* ---------------- MERGED DATA ---------------- */
  const categories = dbCategories.map((cat) => ({
    _id: cat._id,
    title: cat.name,
    slug: cat.slug,
    ...staticMeta[cat.slug],
  }));

  const filters = ["All", ...dbCategories.map((c) => c.name)];

  const visibleCategories =
    activeFilter === "All"
      ? categories
      : categories.filter((c) => c.title === activeFilter);

  const isSingleCategory = activeFilter !== "All";

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-slate-900">
      {/* HEADER */}
      <header className="pt-12 pb-6 px-6 md:mt-8 max-w-[1400px] mx-auto">
        <h1 className="text-5xl md:text-8xl font-heading italic">
          Shop by Style
        </h1>
      </header>

      {/* FILTER BAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[10px] uppercase tracking-widest ${activeFilter === filter
                ? "text-black border-b-2 border-black"
                : "text-slate-400"
                }`}
            >
              {filter}
            </button>
          ))}

          {!isSingleCategory && (
            <div className="ml-auto flex gap-2">
              <button onClick={() => setViewMode("editorial")}>
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setViewMode("compact")}>
                <Grid size={16} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* GRID */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-8 py-12">
        <div
          className={`grid gap-4 md:gap-2 ${isSingleCategory
            ? "grid-cols-1 sm:grid-cols-3 md:auto-rows-[570px] auto-rows-[370px]"
            : viewMode === "editorial"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-[350px] md:auto-rows-[300px]"
              : "grid-cols-2 lg:grid-cols-6 auto-rows-[320px]"
            }`}
        >
          {visibleCategories.map((cat) => {
            const spanClass =
              !isSingleCategory && viewMode === "editorial"
                ? cat.span === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : cat.span === "wide"
                    ? "md:col-span-1"
                    : ""
                : "";

            return (
              <div
                key={cat._id}
                onClick={() => router.push(`/${cat.slug}`)}
                className={`group relative border bg-white overflow-hidden cursor-pointer ${spanClass}`}
              >

                {/* IMAGE */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                </div>

                {/* TAG */}
                {cat.tag && (
                  <span className="absolute top-3 left-3 bg-white px-3 py-1 text-[9px] uppercase font-bold z-10">
                    {cat.tag}
                  </span>
                )}

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-end p-4 z-20">
                  <div className="bg-white/70 backdrop-blur p-3 w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">{cat.title}</h3>
                        <p className="text-[10px] uppercase text-slate-400">
                          {cat.count}
                        </p>
                      </div>
                      <ArrowRight size={16} />
                    </div>
                  </div>


                </div>
              </div>
            );
          })}
          {/* CTA CARD */}
          {!isSingleCategory && (
            <div className="border-2 border-black bg-black text-white p-8 flex flex-col justify-center items-center text-center group">
              <h4 className="text-3xl font-black uppercase mb-4 leading-none">
                Custom <br /> Fit?
              </h4>

              <p className="text-gray-400 mb-6 text-sm max-w-[220px]">
                We offer customization on all premium suits and lehengas.
              </p>
              <a href="/enquiry-us" className="w-full py-3 bg-white text-black font-bold uppercase hover:bg-gray-200 transition-colors">
                  Book Appt
              </a>
            </div>
          )}

        </div>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoriesPage;
