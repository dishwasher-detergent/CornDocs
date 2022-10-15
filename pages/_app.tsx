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
