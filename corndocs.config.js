const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  project: {
    name: "Okie.Design",
    url: "https://www.okie.design",
    github: {
      repo: "https://github.com/dishwasher-detergent/OkieDesignDocs",
      usesMain: true,
    },
  },
  color: colors.purple,
};
