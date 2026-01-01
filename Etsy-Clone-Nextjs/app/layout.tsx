import type { Metadata } from "next";
import "./globals.css";
import { Graphik, GuardianEgyp } from "./fonts";

import ClientFooterWrapper from "@/components/layout/ClientFooterWrapper";
import ClientHeaderWrapper from "@/components/layout/ClientHeaderWrapper";
import { Toaster } from "sonner";
import { useAppStore } from "@/store/store";

export const metadata: Metadata = {
  title: "DYNAMITE",
  description:
    "Dynamite Ethiopia - Shop for handmade, vintage, custom, and unique gifts for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-gray-800 ${Graphik.variable} ${Graphik.className} ${GuardianEgyp.variable}`}
        data-rm-theme="dark"
      >
        <ClientHeaderWrapper />
        {children}
        <ClientFooterWrapper />
        <Toaster />
      </body>
    </html>
  );
}
