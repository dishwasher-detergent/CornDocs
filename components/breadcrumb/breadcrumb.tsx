import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./breadcrumb.module.css";
import { HomeIcon } from "@heroicons/react/20/solid";

const Breadcrumb = ({ data }: any) => {
  return (
    <div
      className={`mb-6 flex h-4 w-full flex-row items-center ${styles.breadcrumb}`}
    >
      <Link href={"/Docs"}>
        <a className="flex flex-row gap-1 text-slate-500 hover:text-slate-600 dark:text-white hover:dark:text-slate-200">
          <HomeIcon className="h-4 w-4" />
          Home
        </a>
      </Link>
      {data &&
        data.map((item: string, index: number) => {
          return (
            <>
              <div>/</div>
              <Link href={`/Docs/${data.slice(0, index + 1).join("/")}`}>
                <a className="text-slate-500 hover:text-slate-600 dark:text-white hover:dark:text-slate-200">
                  {item}
                </a>
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
