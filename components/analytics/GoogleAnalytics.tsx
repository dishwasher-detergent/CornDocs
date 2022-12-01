import React from "react";
import Script from "next/script";
import corndocsConfig from "../../corndocs.config.js";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${corndocsConfig.googleAnalyticsId}`}
      />

      <Script
        id="google-analytics-key"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${corndocsConfig.googleAnalyticsId}', {
            page_path: window.location.pathname,
            });
        `,
        }}
      />
    </>
  );
}
