import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import "../styles/globals.css"; // Import global styles

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
          {/* Remove padding from the main content */}
          <main className="flex-grow pt-0 bg-gray-100">{children}</main>
          <AppFooter />
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
