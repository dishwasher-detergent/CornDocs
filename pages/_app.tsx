import "../styles/globals.css";
import "../styles/prism-dracula.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Wrapper, Content } from "../components/layout/Content";
import Sidebar from "../components/layout/sidebar";
import Nav from "../components/layout/nav";
import { DefaultSeo } from "next-seo";
import seoConfig from "../next-seo.config";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "../context/SidebarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <ThemeProvider attribute="class">
        <SidebarProvider>
          <Layout>
            <Nav />
            <Wrapper>
              <Sidebar />
              <Content>
                <Component {...pageProps} />
              </Content>
            </Wrapper>
          </Layout>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
