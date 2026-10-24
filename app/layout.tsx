import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "NextShop" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
