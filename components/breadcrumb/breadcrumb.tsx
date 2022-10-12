import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./breadcrumb.module.css";
import { HomeIcon } from "@heroicons/react/20/solid";

const Breadcrumb = ({ data }: any) => {
  return (
    <div
      className={`not-prose top-[4.5rem] z-10 mb-6 inline-flex h-4 flex-row items-center rounded-md bg-white/60 bg-white p-4 pl-2 text-slate-500 backdrop-blur-md dark:bg-slate-900/60 dark:bg-slate-900 dark:text-white md:sticky  ${styles.breadcrumb}`}
    >
      <Link href={"/Docs"}>
        <a className="flex flex-row gap-1 hover:text-slate-600 hover:dark:text-slate-200">
          <HomeIcon className="h-4 w-4" />
          Home
        </a>
      </Link>
      {data &&
        data.map((item: string, index: number) => {
          return (
            <div
              className={`flex flex-row gap-2 ${
                index == data.length - 1 && "text-primary-500"
              }`}
              key={index}
            >
              <div>/</div>
              <Link href={`/Docs/${data.slice(0, index + 1).join("/")}`}>
                <a>{item}</a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
