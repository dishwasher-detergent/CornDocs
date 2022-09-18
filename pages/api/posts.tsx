import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { TypeBlogMetaData } from "../../types/TypeBlogMetadata";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug: realSlug, content, data: data as TypeBlogMetaData };
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
