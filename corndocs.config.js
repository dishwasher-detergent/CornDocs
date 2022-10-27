const config = {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  search: {
    enabled: true,
    algolia_admin_key: process.env.ALGOLIA_SEARCH_ADMIN_KEY,
    algolia_app_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    algolia_search_api_key: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    algolia_index: "dev_corndocs",
  },
  project: {
    name: "CornDocs",
    url: "https://www.corndocs.com",
    github: {
      repo: "https://github.com/dishwasher-detergent/CornDocs",
      usesMain: false,
    },
    logo: {
      src: "/static/logo.svg",
      alt: "CornDocs Logo",
      size: [80, 40],
    },
  },
};

module.exports = config;
