import axios from "axios";
import ProductClient from "@/app/[category]/[product]/ProductDetailsClient";

export async function generateMetadata({ params }) {
  const { product, category } = params;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/slug/${product}`
    );
    const data = res.data?.data;

    if (!data) {
      return {
        title: "Product Not Found | Trendikala",
        description: "The requested product could not be found.",
        keywords: "Trendikala, Product Not Found",
        alternates: {
          canonical: "https://www.trendikala.com/products",
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }

    return {
      title: data.metaTitle || `${data.productName} | Trendikala`,
      description:
        data.metaDescription ||
        data.description?.slice(0, 150) ||
        "Explore stylish ethnic wear at Trendikala.",
      keywords:
        data.metaKeywords ||
        `${data.productName}, buy ${data.productName}, Trendikala`,
      alternates: {
        canonical:
          data.canonicalUrl ||
          `https://www.trendikala.com/${category}/${data.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Trendikala – Latest Women's Fashion",
      description:
        "Discover beautiful kurtis and dresses at Trendikala, designed with elegance and comfort.",
      keywords: "Trendikala, Women's Kurtis, Ethnic Wear, Online Shopping",
      alternates: {
        canonical: "https://www.trendikala.com",
      },
    };
  }
}

export default function ProductPage({ params }) {
  return <ProductClient productSlug={params.product} />;
}
