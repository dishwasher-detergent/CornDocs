import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TypeBlogMetaData } from "../../types/TypeBlogMetadata";
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from "directory-tree";

const postsDirectory = join(process.cwd(), "_posts");

interface File {
  slug: string;
  path: string;
  type: "directory" | "file";
}

export function getPostSlugs() {
  const files: File[] = [];
  const dirTree: DirectoryTree & { id?: string } = directoryTree(
    postsDirectory,
    { extensions: /\.mdx$/, normalizePath: true, attributes: ["type"] },
    undefined,
    (item) => {
      item?.children?.forEach((child, index) => {
        let path: string[] | string = child.path.split("/");
        path = path.splice(path.indexOf("_posts") + 1, path.length).join("/");

        files.push({
          path: path,
          slug: child.name.replace(/\.mdx$/, ""),
          type: child.type,
        });
      });
    }
  );

  return files;
}

export function getPostBySlug(doc: File) {
  if (doc.type == "directory")
    return {
      slug: doc.slug,
      path: doc.path,
      type: doc.type,
      data: { title: doc.slug },
    };
  const fullPath = join(postsDirectory, doc.path);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: doc.slug,
    path: doc.path,
    type: doc.type,
    content,
    data: data as TypeBlogMetaData,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((doc) => getPostBySlug(doc)).sort();
  return posts;
}

export default function handler(req: any, res: any) {
  res.status(200).json(getAllPosts());
}
