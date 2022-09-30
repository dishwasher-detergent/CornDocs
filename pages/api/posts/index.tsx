import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TypeDocsMetaData } from "../../../types/TypeDocsMetadata";
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from "directory-tree";

const postsDirectory = join(process.cwd(), "_posts");

async function getHeadings(source: any) {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split("\n").filter((line: any) => {
    return line.match(/^###*\s/);
  });

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw: any) => {
    const text = raw.replace(/^###*\s/, "");
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === "###" ? 3 : 2;

    return { text, level };
  });

  return headingLines;
}

const callback: DirectoryTreeCallback = async (
  item: DirectoryTree,
  path: string
) => {
  let refinedPath: string[] | string = item.path.split("/");
  refinedPath = refinedPath
    .splice(refinedPath.indexOf("_posts") + 1, refinedPath.length)
    .join("/");

  if (item.type != "directory") {
    const fullPath = join(postsDirectory, refinedPath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    item.custom = {
      path: refinedPath.replace(/\.mdx$/, ""),
      slug: item.name.replace(/\.mdx$/, ""),
      data: data as TypeDocsMetaData,
      headings: await getHeadings(content),
    };
  } else {
    item.custom = {
      path: refinedPath.replace(/\.mdx$/, ""),
      children: item.children,
    };
  }
};

export async function getPostSlugs() {
  const dirTree: DirectoryTree & { id?: string } = directoryTree(
    postsDirectory,
    { extensions: /\.mdx$/, normalizePath: true, attributes: ["type"] },
    callback,
    callback
  );
  return dirTree.children;
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  return slugs;
}

export default async function handler(req: any, res: any) {
  res.status(200).json(await getAllPosts());
}
