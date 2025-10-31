import ContactUsPage from "./ContactUsPage";

// ✅ SEO Meta Tags
export const metadata = {
  title: "Contact Trendikala | Get in Touch with Us",
  description:
    "Have questions or need help? Contact Trendikala for order support, business queries, or wholesale partnerships.",
  keywords:
    "Contact Trendikala, Trendikala Support, Customer Care, Order Help, Business Enquiry, Wholesale Kurtis, Fashion Support",
  alternates: {
    canonical: "https://www.trendikala.com/about-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Trendikala", url: "https://www.trendikala.com" }],

};

export default function Page() {
  return <ContactUsPage />;
}
