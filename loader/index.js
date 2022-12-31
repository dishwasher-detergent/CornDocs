const frontmatter = require("remark-frontmatter");
const gfm = require("remark-gfm");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mdx/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: require.resolve("@mdx-js/loader"),
            options: {
              remarkPlugins: [frontmatter, gfm],
              providerImportSource: "@mdx-js/react",
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
