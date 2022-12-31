import fs from "fs";
import glob from "glob-promise";
import matter from "gray-matter";
import { TypeDocsMetaData } from "#/types/TypeDocsMetadata";

interface HeadingsProps {
  text: string;
  level: number;
}

export interface FoldersProps {
  name?: string;
  filename?: string;
  type?: "directory" | "file";
  path?: string;
  truePath?: string;
  children?: object[];
  headings?: HeadingsProps[];
  metadata?: any;
  content?: string;
}

const basePath = process.cwd().replaceAll("\\", "/") + "/_posts";

async function getHeadings(source: any) {
  const headingLines = source.split("\n").filter((line: any) => {
    return line.match(/^###*\s/);
  });

  return headingLines.map((raw: any) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.split(" ")[0].lastIndexOf("#") + 1;

    return { text, level };
  });
}

async function getFile(filepath: string): Promise<string> {
  const files: string[] = [];

  await glob(filepath).then((matches) => {
    files.push(...matches);
  });

  return files[0];
}

async function getFileContent(filepath: string): Promise<FoldersProps> {
  const fileContents = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(fileContents);

  let name = filepath.split("/");
  let name_string = name[name.length - 1].replace(/\.[^\/.]+$/, "");

  return {
    name: name_string,
    headings: await getHeadings(content),
    truePath: filepath.replace("//", "/").replace(basePath + "/", ""),
    path: filepath
      .replace("//", "/")
      .replace(basePath + "/", "")
      .replace(/\.[^\/.]+$/, ""),
    content: content,
    metadata: data as TypeDocsMetaData,
  };
}

async function getDirectoryTree(path: string): Promise<FoldersProps[]> {
  const tree: FoldersProps[] = [];

  const items = await fs.readdirSync(path);
  for (let i = 0; i < items.length; i++) {
    const itemPath = `${path}/${items[i]}`;
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      let data;

      try {
        let temp = fs.readFileSync(`${path}/${items[i]}/define.json`, "utf8");
        data = JSON.parse(temp);
      } catch (err) {
        data = {};
      }

      tree.push({
        name: items[i].replace(/\.[^\/.]+$/, ""),
        filename: items[i],
        type: "directory",
        path: itemPath
          .replace("//", "/")
          .replace(basePath + "/", "")
          .replace(/\.[^\/.]+$/, ""),
        metadata: data,
        children: await getDirectoryTree(itemPath),
      });
    } else if (stats.isFile()) {
      if (!path.includes("/") && items[i].includes("index")) continue;
      if (items[i].includes("define")) continue;
      const fileContents = fs.readFileSync(`${path}/${items[i]}`, "utf8");
      const { data, content } = matter(fileContents);

      tree.push({
        name: items[i].replace(/\.[^\/.]+$/, ""),
        filename: items[i],
        type: "file",
        path: itemPath
          .replace("//", "/")
          .replace(basePath + "/", "")
          .replace(/\.[^\/.]+$/, ""),
        headings: await getHeadings(content),
        metadata: data as TypeDocsMetaData,
      });
    }
  }

  return tree;
}

export async function getPostSlugs(path: string = "") {
  let file = "";

  if (path) {
    file = await getFile(`${basePath}/${path}.*`);
    if (file && file.includes(".md")) {
      return await getFileContent(file);
    }
  }

  return getDirectoryTree(`${basePath}${path ? "/" + path : ""}`);
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  return slugs;
}

export default async function handler(req: any, res: any) {
  res.status(200).json(await getAllPosts());
}
