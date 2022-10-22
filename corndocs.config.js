const colors = require("tailwindcss/colors");
import Image from "next/image";

const customLoader = ({ src }) => {
  return src;
};

export default {
  darkMode: true,
  googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY,
  project: {
    name: "CornDocs",
    url: "https://www.corndocs.com",
    github: {
      repo: "https://github.com/dishwasher-detergent/CornDocs",
      usesMain: false,
    },
    logo: (
      <Image
        loader={customLoader}
        src={`/static/logo.svg`}
        alt="CornDocs Logo"
        width="100%"
        height="100%"
        layout="fill"
      />
    ),
  },
  color: colors.amber,
};
