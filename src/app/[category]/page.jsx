import axios from "axios";
import CategoryClient from "@/app/[category]/CategoryClient";

export async function generateMetadata({ params }) {
  const { category } = params;

  // 🧩 Categories you want to block from indexing
  const noIndexCategories = ["suits", "ethnic-wear"];

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/slug/${category}`
    );

    const catData = res.data?.data;

    if (!catData) {
      return {
        title: "Category Not Found | Trendikalait",
        description: "The requested category could not be found.",
        keywords: "category, not found, Trendikalait",
        alternates: {
          canonical: "https://www.trendikalait.com/categories",
        },
        robots: "noindex, nofollow",
        
      };
    }

    return {
      title: catData.metaTitle || `${catData.name} | Trendikalait`,
      description:
        catData.metaDescription ||
        `Explore our latest ${catData.name} collection at Trendikalait.`,
      keywords:
        catData.metaKeywords ||
        `${catData.name}, buy ${catData.name}, Trendikalait`,
      alternates: {
        canonical:
          catData.canonicalUrl ||
          `https://www.trendikalait.com/${catData.slug}`,
      },
      // 👇 Add dynamic robots tag here
      robots: noIndexCategories.includes(catData.slug)
        ? "noindex, nofollow"
        : "index, follow",
      
    };
  } catch (err) {
    console.error("Metadata fetch error:", err.message);
    return {
      title: "Categories | Trendikalait",
      description:
        "Explore all product categories at Trendikalait. Discover the best deals and styles.",
      keywords: "fashion, categories, Trendikalait",
      alternates: {
        canonical: "https://www.trendikalait.com/categories",
      },
      robots: "index, follow",
    };
  }
}

export default async function CategoryPage({ params }) {
  return <CategoryClient category={params.category} />;
}
