import Link from "next/link";
import { Home } from "lucide-react";

const Breadcrumb = ({ data }: any) => {
  return (
    <div
      className={`not-prose top-[4.5rem] z-10 order-first mb-6 inline-flex h-4 flex-row items-center space-x-2 rounded-md bg-white/60 bg-white p-4 pl-2 text-sm font-semibold text-slate-500 backdrop-blur-md dark:bg-slate-900/60 dark:bg-slate-900 dark:text-white md:sticky`}
    >
      <Link href={"/Docs"}>
        <a className="flex flex-row gap-1 hover:text-slate-600 hover:dark:text-slate-200">
          <Home className="h-4 w-4" />
          Home
        </a>
      </Link>
      {data &&
        data.map((item: string, index: number) => {
          return (
            <div
              className={`flex flex-row gap-2 ${
                index == data.length - 1 && "font-black text-primary-500"
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
