const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  project: {
    name: "CornDocs",
    url: "https://www.corndocs.com",
    github: {
      repo: "https://github.com/dishwasher-detergent/CornDocs",
      usesMain: false,
    },
  },
  color: colors.amber,
};
