// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    disableStaticImages: true,
  },
  webpack: function (config, { isServer }) {
    if (isServer) {
      require("./scripts/sitemap-generator");
    }
    return config;
  },
};
module.exports = nextConfig;

const frontmatter = require("remark-frontmatter");
const gfm = require("remark-gfm");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontmatter, gfm],
    providerImportSource: "@mdx-js/react",
  },
});
module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
