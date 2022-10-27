import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import { TypeDocsDetails } from "../../../types/TypeDocsDetails";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { useRouter } from "next/router";

interface ButtonProps {
  data: any;
  children: React.ReactChild;
}

const Button = ({ data, children }: ButtonProps) => {
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const router = useRouter();

  const Route = (data: string) => {
    if (data) {
      toggleSidebar();
      router.push(`/Docs/${data}`);
    }
  };

  return !data.children ? (
    <li>
      <a
        onClick={() => Route(data.custom.path)}
        className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-md px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {children}
      </a>
    </li>
  ) : (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="li"
              className={`flex cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-md px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 ${
                open && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <span className="flex w-full flex-row items-center gap-2 truncate">
                {children}
              </span>
              <ChevronRight
                className={`h-4 w-4 transition-all ${open && "rotate-90"}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="ul" className="ml-4 mt-1 flex flex-col gap-1">
              {data.children
                .sort(
                  (a: any, b: any) =>
                    a.custom.data.position - b.custom.data.position
                )
                .map((item: TypeDocsDetails, index: number) => {
                  return !item.children ? (
                    <li key={index}>
                      <a
                        onClick={() => Route(item.custom.path)}
                        className="flex cursor-pointer flex-row flex-nowrap items-center justify-start gap-2 truncate rounded-md px-3 py-1.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <span>{item.custom.data.title}</span>
                      </a>
                    </li>
                  ) : (
                    <Button data={item} key={index}>
                      <>
                        <span>{item.name}</span>
                      </>
                    </Button>
                  );
                })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Button;
