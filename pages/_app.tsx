import "#/styles/globals.css";
import "#/styles/progress.css";
import "#/styles/prism.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "#/context/sidebarContext";
import { DarkmodeProvider } from "#/context/darkmodeContext";
import { CommandProvider } from "#/context/commandContext";
import Layout from "#/ui/layout/Layout";

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
