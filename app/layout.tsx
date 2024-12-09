import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppHeader from "../components/Header/Header";
import AppFooter from "../components/Footer";
import "../styles/globals.css"; // Import global styles
import Chat from "@/components/Chat";
import BackToTop from "@/components/BackToTop";
import NextTopLoader from '../components/Header/NextTopLoader';
export const metadata = {
  title: "NextRoom",
  description:
    "NextRoom - Your ultimate platform for finding and renting rooms with ease.",
};
// change
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <AntdRegistry>
          <AppHeader />
          <NextTopLoader />
          {/* Remove padding from the main content */}
          <main className="flex-grow pt-0 bg-gray-100">{children}</main>
          <AppFooter />
          <BackToTop />
          <Chat />
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
