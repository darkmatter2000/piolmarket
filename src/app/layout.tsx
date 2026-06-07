import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "MoneyPiol — Observatoire de l'Immobilier Camerounais",
  description:
    "Intelligence marché immobilier pour Douala, Yaoundé et Kribi. Indices de prix, annonces vérifiées et analyses de tendances.",
  keywords: "immobilier cameroun, prix immobilier douala, prix immobilier yaoundé, annonces immobilières cameroun",
  openGraph: {
    title: "MoneyPiol",
    description: "L'observatoire de l'immobilier camerounais",
    url: "https://moneypiol.vercel.app",
    siteName: "MoneyPiol",
    locale: "fr_CM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark-bg text-white font-outfit antialiased">
        <Header />
        <main>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111F35",
              color: "#fff",
              border: "1px solid #1E3050",
              fontFamily: "Outfit, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
