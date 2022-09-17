import Head from "next/head";
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import GoogleAnalytics from "../analytics/GoogleAnalytics";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactElement;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <>
      <GoogleAnalytics />
      <div className="w-screen h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="h-full w-full flex flex-col overflow-y-auto">
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full h-full max-w-7xl p-6">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Layout;
