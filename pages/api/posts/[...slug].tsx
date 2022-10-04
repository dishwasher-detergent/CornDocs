import type { NextApiRequest, NextApiResponse } from "next";
import { getPostSlugs } from ".";

export const search = (obj: any, predicate: any) => {
  let result: any[] = [];
  for (let p in obj) {
    if (typeof obj[p] == "object") {
      result = result.concat(search(obj[p], predicate));
    } else if (predicate(p, obj[p])) result.push(obj);
  }
  return result;
};

export const getCertainPost = async (query: string) => {
  const slugs = await getPostSlugs();
  const slug = search(slugs, (key: string, value: string) => {
    return key === "path" && value === query;
  });
  return slug;
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;
  res.status(200).json(await getCertainPost((slug as string[]).join("/")));
}
