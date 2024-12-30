import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Ohh!Dank",
  description: "Live Aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
