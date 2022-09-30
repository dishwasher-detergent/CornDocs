import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
  });

interface DocProps {
  data: {
    path: string;
    headings: string[];
    slug: string;
    data: {
      description: string;
      title: string;
      banner: string;
    };
  };
}

const components = {
  h2: H2,
  h3: H3,
  pre: CodeBlock,
};

const DisplayDoc = ({ data }: DocProps) => {
  const DocumentContent = DynamicDocument(data.path);
  const router = useRouter();

  console.log(router);

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
      <div className="relative flex flex-row justify-start gap-6 overflow-y-auto p-6">
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <Breadcrumb data={router.query.slug} />
          {/* @ts-ignore */}
          <MDXProvider components={components}>
            <DocumentContent />
          </MDXProvider>
        </article>
        <nav className="sticky top-0 flex w-32 flex-col gap-1">
          {data.headings.map((item: any) => {
            return (
              <a
                href={`#${item.text
                  ?.toString()
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`truncate font-bold hover:text-amber-500 ${
                  item.level == 2 ? "text-sm" : "pl-2 text-xs"
                }`}
              >
                {item.text}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default DisplayDoc;
