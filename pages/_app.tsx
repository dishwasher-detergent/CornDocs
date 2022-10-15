import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../context/SidebarContext";
import { DarkmodeProvider } from "../context/DarkModeContext";
import Layout from "../components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_PROJECT_NAME}`}</title>
        <meta
          name="title"
          content={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        />
        <meta
          name="description"
          content={"CornDocs - Documentation made easy."}
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`}
        />
        <meta
          property="og:title"
          content={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        />
        <meta
          property="og:description"
          content={"CornDocs - Documentation made easy."}
        />
        <meta property="og:image" content={"/static/logo.svg"} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`}
        />
        <meta
          property="twitter:title"
          content={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        />
        <meta
          property="twitter:description"
          content={"CornDocs - Documentation made easy."}
        />
        <meta property="twitter:image" content={"/static/logo.svg"}></meta>
      </Head>
      <SidebarProvider>
        <DarkmodeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DarkmodeProvider>
      </SidebarProvider>
    </>
  );
}

export default MyApp;
