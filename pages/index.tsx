import Link from "next/link";
import { useEffect, useState } from "react";
import DisplayChildren from "../components/display/Children";
import Loading from "../components/loading";

const Home = () => {
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

  return (
    <>
      <section className="relative mx-auto max-w-6xl py-12 px-6 md:py-24">
        <h1 className="carena 2xl:px-30 mb-4 text-5xl font-bold text-slate-900 dark:text-white md:text-6xl lg:mb-8 lg:text-center lg:leading-tight">
          Create the beautiful website you've always wanted.
        </h1>
        <p className="font-bold text-slate-600 dark:text-slate-100 lg:text-center lg:text-lg">
          Responsive CSS components made with TailwindCSS and Love.
        </p>
        <div className="flex flex-wrap items-center gap-2 py-8 md:justify-center">
          <Link href="Docs/getting-started">
            <a className="flex h-10 min-w-[6rem] items-center justify-center rounded-md bg-purple-500 px-6 text-base font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-purple-600 dark:ring-offset-slate-800 dark:hover:bg-purple-500">
              Get Started
            </a>
          </Link>
        </div>
      </section>
      <section>
        <div className="flex w-full flex-none items-center gap-4 px-4">
          <p className="flex-none font-semibold text-slate-600 dark:text-slate-100">
            Components
          </p>
        </div>
        {!isLoading ? (
          <DisplayChildren data={data} breadcrumb={false} />
        ) : (
          <div className="w-full py-6">
            <Loading />
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
