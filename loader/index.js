const frontmatter = require("remark-frontmatter");
const gfm = require("remark-gfm");

module.exports = (nextConfig = {}) => {
  const extension = /\_app.tsx$/;

  const loader = {
    loader: require.resolve("./corndocs.loader.js"),
  };

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // config.module.rules.push({
      //   test: extension,
      //   use: [options.defaultLoaders.babel, loader].filter(Boolean),
      // });

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
