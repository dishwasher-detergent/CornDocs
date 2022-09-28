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
    null,
    (item) => {
      item?.children?.forEach((child, index) => {
        files.push({
          path: child.path,
          slug: child.name.replace(/\.mdx$/, ""),
          type: child.type,
        });
      });
    }
  );

  return files;
}

export function getPostBySlug(slug: File) {
  const fullPath = join(postsDirectory, `${slug.slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: slug, content, data: data as TypeBlogMetaData };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      new Date(post1.data.date) > new Date(post2.data.date) ? -1 : 1
    );
  return posts;
}

export default function handler(req: any, res: any) {
  res.status(200).json(getAllPosts());
}
