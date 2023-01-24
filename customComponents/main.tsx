import Selection from "#/ui/display/selection/Selection";
import SearchButton from "#/ui/layout/sidebar/Search";
import Link from "next/link";
import NProgress from "nprogress";
import { useEffect, useState } from "react";

export default function DisplayComponents() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/article")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
        <h1 className="2xl:px-30 mb-4 text-4xl font-black text-slate-900 dark:text-white md:text-6xl lg:mb-8 lg:text-center lg:leading-tight">
          Build <span className="text-primary-500">documentation</span> that
          will impress your friends and family.
        </h1>
        <p className="font-bold text-slate-600 dark:text-slate-100 lg:text-center lg:text-lg">
          CornDocs lets you easily create documentation to show off your
          projects!
        </p>
        <div className="mx-auto flex max-w-xl flex-col justify-center gap-2 py-8 md:flex-row">
          <SearchButton />
          <Link
            href="/Docs/getting-started"
            className="flex h-10 min-w-[6rem] flex-none items-center justify-center whitespace-nowrap rounded-xl bg-primary-500 px-6 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-primary-600 dark:ring-offset-slate-800 dark:hover:bg-primary-500"
          >
            Get Started
          </Link>
        </div>
      </section>
      <section className="not-prose">
        {!isLoading && <Selection data={data} breadcrumb={false} />}
      </section>
    </>
  );
}
