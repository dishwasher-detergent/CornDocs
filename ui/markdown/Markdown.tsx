import Loader from "#/ui/loaders/Loader";
import CodeBlock from "#/ui/markdown/Codeblock";
import { H1, H2, H3 } from "#/ui/markdown/Headings";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dist/shared/lib/dynamic";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug-custom-id";

type Post = {
  serialized: MDXRemoteSerializeResult;
};

const MdxComponents = {
  pre: CodeBlock,
  h1: H1,
  h2: H2,
  h3: H3,
  DisplayComponents: dynamic(async () => {
    const component = await import("#/customComponents/main");
    return component;
  }),
};

async function cerealize(raw: string): Promise<Post> {
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [slug],
      remarkPlugins: [remarkGfm],
      format: "detect",
    },
  });

  return { serialized };
}

export default function Markdown({ article }: { article: string | undefined }) {
  const [cereal, setCereal] = useState<MDXRemoteSerializeResult | null>(null);

  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/article/${article}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data) {
          const { serialized } = await cerealize(data.content);
          setCereal(serialized);
          setLoading(false);
        } else {
          router.push("/Docs");
        }
      });
  }, []);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return cereal ? (
    // @ts-ignore
    <MDXRemote {...cereal} components={MdxComponents} />
  ) : (
    <Loader />
  );
}
