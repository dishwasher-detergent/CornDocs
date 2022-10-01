const seoConfig = {
  openGraph: {
    type: "Documentation",
    locale: "en_IE",
    url: process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL,
    site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
  },
  twitter: {
    handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default seoConfig;
