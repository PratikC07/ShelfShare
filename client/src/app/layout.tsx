import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers"; // Import our new providers

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShelfShare",
  description: "Your modern digital marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // --- THIS IS THE FIX ---
    <html lang="en" className="scroll-smooth">
      {/* --- END FIX --- */}
      <body className={inter.className}>
        {/* Wrap the children in our Providers component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
