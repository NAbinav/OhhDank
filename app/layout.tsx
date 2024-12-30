import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import App from "./App";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/admin/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <App>
            {children}
          </App>
        </AuthProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
