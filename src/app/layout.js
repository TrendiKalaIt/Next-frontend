
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import RootProvider from "./RootProvider";
import NewUpdatesMsg from "@/components/NewUpdatesMsg";
import ClientToaster from "./ClientToaster";
import OfferModal from "@/components/OfferModal";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "TrendiKala",
  description: "Best online store for fashion products",
  icons: {
    icon: "/trendikala_logo_bg.webp",
    shortcut: "/trendikala_logo_bg.webp",
    apple: "/trendikala_logo_bg.webp",
  },
  other: {
    "google-site-verification": "aNV_TcSg2PToCYYUGiF0TuyvMbq-P9S9JFivu-kbDuU",
    author: "Trendikala",
  },
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

      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">

        {/* Dark Mode Provider (Auto System Based) */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <RootProvider>
            <ClientToaster />
            <NewUpdatesMsg />
            <Navbar links={navLinks} />
            <OfferModal />
            <main>{children}</main>
            <Footer />
          </RootProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
