const withCorndocs = require("./loader");
module.exports = withCorndocs();

// const frontmatter = require("remark-frontmatter");
// const gfm = require("remark-gfm");

// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [frontmatter, gfm],
//     providerImportSource: "@mdx-js/react",
//   },
// });
// module.exports = withMDX(nextConfig, {
//   pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
// });
