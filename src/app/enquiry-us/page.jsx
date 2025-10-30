import EnquiryUsPage from "@/app/enquiry-us/EnquiryForm";

// ✅ SEO Meta Tags
export const metadata = {
  title: "Enquiry Form | Connect with Trendikala Team",
  description:
    "Have bulk orders or business queries? Fill out the Trendikala Enquiry Form to connect with our support and sales team for quick assistance.",
  keywords:
    "Trendikala Enquiry, Business Query, Bulk Order, Wholesale Kurtis, Contact Trendikala, Partnership, Fashion Enquiry, Support",
    alternates: {
    canonical: "https://www.trendikala.com/enquiry-us",
  },
  robots: {
    index: true,  
    follow: true,  
  },
};

export default function Page() {
  return <EnquiryUsPage />;
}
