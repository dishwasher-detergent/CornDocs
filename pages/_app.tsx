import "../styles/globals.css";
import "../styles/progress.css";
import "../styles/custom.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "../context/SidebarContext";
import { DarkmodeProvider } from "../context/DarkModeContext";
import Layout from "../components/layout/Layout";
import { CommandProvider } from "../context/CommandContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CommandProvider>
        <SidebarProvider>
          <DarkmodeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DarkmodeProvider>
        </SidebarProvider>
      </CommandProvider>
    </>
  );
}

export default MyApp;
