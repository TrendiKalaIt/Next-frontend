// ✅ This file must NOT have "use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import RootProvider from "./RootProvider";
import NewUpdatesMsg from "@/components/NewUpdatesMsg";
import ClientToaster from "./ClientToaster";

export const metadata = {
  title: "TrendiKala",
  description: "Best online store for fashion products",
  icons: {
    icon: "/trendikala_logo_bg.webp",
    shortcut: "/trendikala_logo_bg.webp",
    apple: "/trendikala_logo_bg.webp",
  },
  other: {
    // ✅ Google Site Verification Tag
    "google-site-verification": "aNV_TcSg2PToCYYUGiF0TuyvMbq-P9S9JFivu-kbDuU",
  },
  author: "Trendikala",
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about-us" },
  { name: "Manufacturing", path: "/manufacturing" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Script (Visible in Ctrl+U) */}




        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5PVN410KDV"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5PVN410KDV');
            `,
          }}
        />
      </head>

      <body>
        <RootProvider>
          <ClientToaster />
          <NewUpdatesMsg />
          <Navbar links={navLinks} />
          <main>{children}</main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
