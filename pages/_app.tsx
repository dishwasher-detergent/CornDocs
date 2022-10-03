import "../styles/globals.css";
import "../styles/prism-dracula.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Content } from "../components/layout/Content";
import Sidebar from "../components/layout/sidebar";
import Nav from "../components/layout/nav";
import { DefaultSeo } from "next-seo";
import seoConfig from "../next-seo.config";
import { ThemeProvider } from "next-themes";
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
            <div className="w-full h-full overflow-hidden mx-auto relative max-w-screen-2xl 2xl:border-x border-slate-300 dark:border-slate-700">
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
