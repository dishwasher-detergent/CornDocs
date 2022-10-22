import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3, H4 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import ArticleNavigation from "../layout/docs/article/navigation";
import ArticleSidebar from "../layout/docs/article/sidebar";
import ArticleFooter from "../layout/docs/article/footer";
import corndocsConfig from "../../corndocs.config.js";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
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

const variants = {
  hidden: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

const DisplayDoc = ({ data }: DocProps) => {
  const { custom } = data;

  const DocumentContent = DynamicDocument(custom.path);
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.75, type: "spring" }}
        className="pl-2"
      >
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
            {corndocsConfig.project.github.repo ? (
              <a
                className="flex items-center gap-2 text-sm font-bold"
                target="_blank"
                href={`${corndocsConfig.project.github.repo}/edit/${
                  corndocsConfig.project.github.usesMain ? "main" : "master"
                }/_posts/${custom.path}.mdx`}
              >
                <span>Edit on GitHub</span>
                <Github size={16} />
              </a>
            ) : null}
          </ArticleFooter>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default DisplayDoc;
