import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3, H4 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import Loading from "../loading";
import Footer from "../layout/footer";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
    loading: Loading,
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
  h4: H4,
  pre: CodeBlock,
};

const DisplayDoc = ({ data }: DocProps) => {
  const DocumentContent = DynamicDocument(data.path);
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${data.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`}
        description={data.data.description}
        openGraph={{
          title: `${data.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/Docs/${data.path}`,
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
          site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
        }}
      />
      <article className="prose prose-slate h-full w-full max-w-none flex-1 md:pl-10 p-6 dark:prose-invert">
        <Breadcrumb data={router.query.slug} />
        {/* @ts-ignore */}
        <MDXProvider components={components}>
          <DocumentContent />
        </MDXProvider>
        <Footer>
          {process.env.NEXT_PUBLIC_GITHUB_URL && (
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_GITHUB_URL}/edit/master/_posts/${data.path}.mdx`}
            >
              Edit on GitHub
            </a>
          )}
        </Footer>
      </article>
      {data.headings.length > 0 && (
        <nav className="sticky top-0 hidden h-full w-72 flex-none flex-col gap-1 overflow-y-auto p-6 dark:text-white md:flex">
          <p className="w-full rounded-md bg-primary-300/20 px-2 py-1.5 font-bold text-primary-500">
            On this page
          </p>
          {data.headings.map((item: any) => {
            if (item.level > 3) return;
            return (
              <a
                href={`#${item.text
                  ?.toString()
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`jusify-between flex w-full flex-none flex-row items-center gap-2 font-semibold hover:text-primary-500 ${
                  item.level == 2 ? "text-md pt-2" : `pl-4 text-sm`
                }`}
              >
                <span className="w-full truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default DisplayDoc;
