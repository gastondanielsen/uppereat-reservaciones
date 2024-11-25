import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { ReactQueryProvider } from "@/utils/provider";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/sidebar";

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

export const metadata: Metadata = {
  title: "RETO UPPEREAT",
  description: "RETO UPPEREAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <main className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-64">
              <Header />
              {children}
            </div>
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
