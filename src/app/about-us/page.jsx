import AboutClient from "./AboutClient";

// ✅ Basic SEO Meta Tags
export const metadata = {
  title: "About Trendikala | Premium Ethnic Fashion for Women",
  description:
    "Learn about Trendikala’s vision to bring authentic, elegant, and affordable ethnic wear to modern women across India.",
  keywords:
    "About Trendikala, Women’s Clothing Brand, Ethnic Fashion, Indian Boutique, Fashion Story, Designer Kurtis, Stylish Dresses",
    alternates: {
        canonical: "https://www.trendikala.com/about-us",
      },
};

export default function Page() {
  return <AboutClient />;
}
