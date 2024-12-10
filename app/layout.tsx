import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppHeader from "../components/Header/Header";
import AppFooter from "../components/Footer";
import "../styles/globals.css"; // Import global styles
import Chat from "@/components/Chat";
import BackToTop from "@/components/BackToTop";
import NextTopLoader from '../components/Header/NextTopLoader';
import TopNavigation from "@/components/Header/TopNavigation";

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
          <NextTopLoader />

          <header className="bg-[#1E3A8A] py-2 sticky top-0 z-50">
            <div className="container mx-auto  sm:px-6 lg:px-8">
              <TopNavigation />
              <AppHeader />
            </div>
          </header>

          <main className="flex-grow pt-0 bg-gray-100 max-w-full overflow-scroll">
            <div className="max-w-full h-auto flex justify-center">
              <div className="w-full max-w-[1280px] h-100% border-red-800">
                {children}
              </div>
            </div>
            <AppFooter />
          </main>

          <BackToTop />
          <Chat />
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
