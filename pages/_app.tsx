import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Content } from "../components/layout/Content";
import Sidebar from "../components/layout/sidebar";
import Nav from "../components/layout/nav";
import { DefaultSeo } from "next-seo";
import seoConfig from "../next-seo.config";
import { SidebarProvider } from "../context/SidebarContext";
import { DarkmodeProvider } from "../context/DarkModeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <SidebarProvider>
        <DarkmodeProvider>
          <Layout>
            <Nav />
            <div className="relative mx-auto h-full w-full max-w-screen-2xl overflow-hidden border-slate-300 dark:border-slate-700 2xl:border-x">
              <Sidebar />
              <Content>
                <Component {...pageProps} />
              </Content>
            </div>
          </Layout>
        </DarkmodeProvider>
      </SidebarProvider>
    </>
  );
}

export default MyApp;
