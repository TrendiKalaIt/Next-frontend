//  Server Component: only for SEO & wrapper
import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Shop by Categories | Trendikala Kurtis and Dresses",
  description:
    "Explore all product categories at Trendikala including Anarkali, Long Kurti, Short Kurti, and Dresses. Shop by your favorite style today.",
  keywords:
    "Trendikala Categories, Anarkali Kurtis, Long Kurtis, Short Kurtis, Ethnic Dresses, Indian Wear, Women’s Fashion, Online Shopping",
  alternates: {
    canonical: "https://www.trendikala.com/categories",
  },
  robots: {
    index: true,
    follow: true,
  },
  

};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
