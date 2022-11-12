import { useEffect, useState } from "react";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import corndocsConfig from "../corndocs.config";

const DynamicComponent = (c: any) => dynamic(() => import(`../_posts/${c}`));

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/posts/${
        corndocsConfig.project.homePage
          ? corndocsConfig.project.homePage
          : "index"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData({ children: data });
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

  const DocumentContent = DynamicComponent(data.children.custom.truePath);

  return (
    <article className="prose prose-slate w-full max-w-none pt-8 dark:prose-invert">
      {/* @ts-ignore */}
      <MDXProvider>
        <DocumentContent />
      </MDXProvider>
    </article>
  );
};

export default Home;
