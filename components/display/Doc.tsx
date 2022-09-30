import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import Heading from "../markdown/heading";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
  });

interface DocProps {
  data: {
    slug: string;
    path: string;
    content: any;
    children?: any[];
    custom: {
      import: string[];
    };
    data: {
      title: string;
      date: string;
      content: string;
      description: string;
      slug: string;
      tags: string[];
      banner: string;
      imports?: string[];
    };
  };
}

const components = {
  h2: Heading,
  pre: CodeBlock,
};

const DisplayDoc = ({ data }: DocProps) => {
  const DocumentContent = DynamicDocument(data.path);

  return (
    <>
      <NextSeo
        title={`${data.data.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`}
        description={data.data.description}
        openGraph={{
          title: `${data.data.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`,
          description: data.data.description,
          type: "article",
          article: {
            publishedTime: data.data.date,
            modifiedTime: data.data.date,
            expirationTime: data.data.date,
            section: "Technology",
            authors: [`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`],
            tags: data.data.tags,
          },
          images: [
            {
              url: data.data.banner,
              width: 800,
              height: 600,
              alt: data.data.title,
              type: "image/jpeg",
            },
            {
              url: data.data.banner,
              width: 900,
              height: 800,
              alt: data.data.title,
              type: "image/jpeg",
            },
          ],
          site_name: `${process.env.NEXT_PUBLIC_OWNER_NAME}'s Documentation`,
        }}
      />
      <div className="flex justify-start">
        <article className="prose prose-slate max-w-none dark:prose-invert">
          {/* @ts-ignore */}
          <MDXProvider components={components}>
            <DocumentContent />
          </MDXProvider>
        </article>
      </div>
    </>
  );
};

export default DisplayDoc;
