/** @type {import('./types/ConfigType').Config} */

module.exports = {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  search: {
    algolia_admin_key: "f288edcc3b4ed58d272356da2491b24e",
    algolia_app_id: "8BHM21C3GJ",
    algolia_search_api_key: "e1482b5fe817d3dc218478a448443a7d",
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
