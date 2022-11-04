import { useEffect, useState } from "react";
import DisplayChildren from "../components/display/Children";
import NProgress from "nprogress";
import Link from "next/link";
import SearchButton from "../components/layout/sidebar/Search";

const Main = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData({ children: data });
        setLoading(false);
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

  return (
    <>
      <section className="not-prose md:py-18 relative mx-auto max-w-6xl py-8 px-6">
        <h1 className="2xl:px-30 mb-4 text-5xl font-black text-slate-900 dark:text-white md:text-6xl lg:mb-8 lg:text-center lg:leading-tight">
          Build the <span className="text-primary-500">documentation</span> to
          impress your friends and family.
        </h1>
        <p className="font-bold text-slate-600 dark:text-slate-100 lg:text-center lg:text-lg">
          CornDocs lets you easily create documentation to show off your
          projects!
        </p>
        <div className="mx-auto flex max-w-xl flex-col gap-2 py-8 md:flex-row-reverse">
          <Link href="/Docs">
            <a className="flex h-10 min-w-[6rem] flex-none items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 px-6 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-primary-600 dark:ring-offset-slate-800 dark:hover:bg-primary-500">
              Get Started
            </a>
          </Link>
          <SearchButton />
        </div>
      </section>
      <section className="not-prose">
        {!isLoading && <DisplayChildren data={data} breadcrumb={false} />}
      </section>
    </>
  );
};

export default Main;
