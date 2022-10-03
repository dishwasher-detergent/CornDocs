import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React, { useContext } from "react";
import { DarkmodeContext } from "../context/DarkModeContext";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    /* @ts-ignore */
    const { darkmode } = useContext(DarkmodeContext);

    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={`${
          darkmode ? "dark" : ""
        }`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
