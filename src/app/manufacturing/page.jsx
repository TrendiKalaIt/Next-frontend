// ✅ Server Component: only for SEO & wrapper
import ManufacturingClient from "./ManufacturingClient";

export const metadata = {
  title: "Trendikala Manufacturing | Quality Ethnic Wear Maker",
  description:
    "Trendikala is a leading manufacturer of women’s ethnic wear. We design, stitch, and deliver premium quality Kurtis and Dresses across India.",
  keywords:
    "Trendikala Manufacturing, Kurtis Manufacturer, Dress Maker, Ethnic Wear Factory, Indian Garment Industry, Women’s Clothing Production, Bulk Orders",
  alternates: {
    canonical: "https://www.trendikala.com/manufacturing",
  },
  robots: {
    index: true,
    follow: true,
  },
  

};

export default function ManufacturingPage() {
  return <ManufacturingClient />;
}
