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
    custom: {
      path: string;
      headings: string[];
      slug: string;
      data: {
        description: string;
        title: string;
        banner: string;
      };
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
  const { custom } = data;

  const DocumentContent = DynamicDocument(custom.path);
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${custom.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${custom.slug}`}
        description={custom.data.description}
        openGraph={{
          title: `${custom.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/Docs/${custom.path}`,
          description: custom.data.description,
          type: "article",
          images: [
            {
              url: custom.data.banner,
              width: 800,
              height: 600,
              alt: custom.data.title,
              type: "image/jpeg",
            },
            {
              url: custom.data.banner,
              width: 900,
              height: 800,
              alt: custom.data.title,
              type: "image/jpeg",
            },
          ],
          site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
        }}
      />
      <article className="prose prose-slate h-full w-full max-w-none flex-1 overflow-x-hidden p-6 dark:prose-invert md:pl-10 md:pr-72">
        <Breadcrumb data={router.query.slug} />
        {/* @ts-ignore */}
        <MDXProvider components={components}>
          <DocumentContent />
        </MDXProvider>
        <Footer>
          {process.env.NEXT_PUBLIC_GITHUB_URL && (
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_GITHUB_URL}/edit/${
                process.env.NEXT_PUBLIC_GITHUB_BRANCH
                  ? process.env.NEXT_PUBLIC_GITHUB_BRANCH
                  : "main"
              }/_posts/${custom.path}.mdx`}
            >
              Edit on GitHub
            </a>
          )}
        </Footer>
      </article>
      {custom.headings.length > 0 && (
        <nav className="fixed top-16 bottom-0 right-[max(0px,calc(50%-47.25rem))] z-20 hidden w-72 flex-none overflow-y-auto p-6 dark:text-white md:block">
          <p className="w-full rounded-md bg-primary-300/20 px-2 py-1.5 font-bold text-primary-500">
            On this page
          </p>
          <ul className="flex flex-col gap-1 px-2">
            {custom.headings.map((item: any) => {
              if (item.level > 3) return;
              return (
                <li>
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
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
};

export default DisplayDoc;
