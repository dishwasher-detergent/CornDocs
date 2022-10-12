import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3, H4 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import Loading from "../loading";
import ArticleNavigation from "../layout/docs/article/navigation";
import ArticleSidebar from "../layout/docs/article/sidebar";
import ArticleFooter from "../layout/docs/article/footer";

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
      <div className="min-h-screen pl-2">
        <main className="dark:bg-slate-900">
          <div className="container mx-auto py-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className="grid grid-cols-12 lg:gap-16 xl:gap-8">
                  <div className="col-span-12 lg:col-span-9">
                    <Breadcrumb data={router.query.slug} />
                    <article className="prose prose-slate w-full max-w-none dark:prose-invert">
                      {/* @ts-ignore */}
                      <MDXProvider components={components}>
                        <DocumentContent />
                      </MDXProvider>
                    </article>
                    <ArticleNavigation />
                  </div>
                  {custom.headings.length > 0 && (
                    <ArticleSidebar data={custom.headings} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ArticleFooter>
            {process.env.NEXT_PUBLIC_GITHUB_URL ? (
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
            ) : null}
          </ArticleFooter>
        </main>
      </div>
    </>
  );
};

export default DisplayDoc;
