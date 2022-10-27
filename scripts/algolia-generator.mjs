import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import directoryTree from "directory-tree";
import algoliasearch from "algoliasearch/lite.js";
import dotenv from "dotenv";
import corndocsConfig from "../corndocs.config.js";

const postsDirectory = join(process.cwd(), "_posts");

const algoliaPosts = [];

function convertLetterToNumber(a) {
  let encode = "";
  for (let i = 0; i < a.length; i++) {
    let x = a.slice(i, i + 1);
    encode += x.toLowerCase().charCodeAt(0);
  }

  return encode;
}

async function getHeadings(source) {
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###*\s/);
  });

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.split(" ")[0].lastIndexOf("#") + 1;

    return { text, level };
  });
}

const callback = async (item, path) => {
  let refinedPath = item.path.split("/");
  refinedPath = refinedPath
    .splice(refinedPath.indexOf("_posts") + 1, refinedPath.length)
    .join("/");

  if (!refinedPath) return;

  const fullPath = join(postsDirectory, refinedPath);

  if (item.type != "directory") {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    algoliaPosts.push({
      objectID: convertLetterToNumber(refinedPath.replace(".mdx", "")),
      path: refinedPath.replace(/\.mdx$/, ""),
      slug: item.name.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      headings: await getHeadings(content),
    });
  } else {
    let data = { data: { title: item.name } };

    try {
      let temp = fs.readFileSync(`${fullPath}/define.json`, "utf8");
      data = JSON.parse(temp);
    } catch (err) {
      data = {};
    }

    algoliaPosts.push({
      objectID: convertLetterToNumber(refinedPath.replace(".mdx", "")),
      path: refinedPath.replace(/\.mdx$/, ""),
      title: data.title,
    });
  }
};

async function getPostSlugs(path = "") {
  let ext = "";

  if (fs.existsSync(`${postsDirectory}/${path}.mdx`)) {
    ext = ".mdx";
  }

  const dirTree = directoryTree(
    `${postsDirectory}${path.length ? "/" + path : ""}${ext}`,
    { extensions: /\.mdx$/, normalizePath: true, attributes: ["type"] },
    callback,
    callback
  );

  if (path.length) {
    return dirTree;
  }

  return dirTree.children;
}

(async function () {
  try {
    dotenv.config();

    await getPostSlugs();

    const client = algoliasearch(
      corndocsConfig.search.algolia_app_id
        ? corndocsConfig.search.algolia_app_id
        : process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      corndocsConfig.search.algolia_admin_key
        ? corndocsConfig.search.algolia_admin_key
        : process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    const index = client.initIndex(corndocsConfig.search.algolia_index);

    const algoliaResponse = await index.saveObjects(algoliaPosts);

    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.log(error);
  }
})();
