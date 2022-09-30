import "../styles/globals.css";
import "../styles/prism-dracula.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Wrapper, Content } from "../components/layout/Content";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";
import { DefaultSeo } from "next-seo";
import seoConfig from "../next-seo.config";
import { ThemeProvider } from "next-themes";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

function MyApp({ Component, pageProps }: AppProps) {
  const components = { Breadcrumb };
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <ThemeProvider attribute="class">
        <Layout>
          <Nav />
          <Wrapper>
            <Sidebar />
            <Content>
              <Component {...pageProps} />
            </Content>
          </Wrapper>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
