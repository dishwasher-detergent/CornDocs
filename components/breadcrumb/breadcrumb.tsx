import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./breadcrumb.module.css";
import { HomeIcon } from "@heroicons/react/20/solid";

const Breadcrumb = ({ data }: any) => {
  return (
    <div
      className={`mb-6 mb-4 flex h-6 w-full flex-row items-center ${styles.breadcrumb}`}
    >
      <Link href={"/Docs"}>
        <a className="text-slate-500 hover:text-slate-600 dark:text-white hover:dark:text-slate-200">
          <HomeIcon className="h-4 w-4" />
        </a>
      </Link>
      <div>/</div>
      {data ? (
        data.map((item: string, index: number) => {
          return (
            <>
              <Link href={`/Docs/${data.slice(0, index + 1).join("/")}`}>
                <a className="text-slate-500 hover:text-slate-600 dark:text-white hover:dark:text-slate-200">
                  {item}
                </a>
              </Link>
              {index < data.length - 1 && <div>/</div>}
            </>
          );
        })
      ) : (
        <div className="h-full w-64">
          <Skeleton height={"100%"} />
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
