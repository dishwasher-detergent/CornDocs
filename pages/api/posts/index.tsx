import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TypeDocsMetaData } from "../../../types/TypeDocsMetadata";
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from "directory-tree";

const postsDirectory = join(process.cwd(), "_posts");

const callback: DirectoryTreeCallback = async (
  item: DirectoryTree,
  path: string
) => {
  if (item.type != "directory") {
    let path: string[] | string = item.path.split("/");
    path = path.splice(path.indexOf("_posts") + 1, path.length).join("/");

    const fullPath = join(postsDirectory, path);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    item.custom = {
      path: path.replace(/\.mdx$/, ""),
      slug: item.name.replace(/\.mdx$/, ""),
      content,
      data: data as TypeDocsMetaData,
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
