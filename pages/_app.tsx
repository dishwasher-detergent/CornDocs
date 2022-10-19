import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../context/SidebarContext";
import { DarkmodeProvider } from "../context/DarkModeContext";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
