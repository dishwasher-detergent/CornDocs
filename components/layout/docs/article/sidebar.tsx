import { Disclosure } from "@headlessui/react";
import { ChevronRight, Album } from "lucide-react";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

interface ItemProps {
  text: string;
  level: number;
}

interface HeadingsProps {
  text: string;
  level: number;
}

const ArticleSidebar = ({ data, children }: any) => {
  const { height, width } = useWindowDimensions();

  return width > 1280 ? (
    <aside className="col-span-12 space-y-8 lg:col-span-3 xl:col-start-10">
      <div className="space-y-8 lg:sticky lg:top-[4.5rem] lg:mb-16">
        <div className="hidden lg:block">
          <div className="space-y-8 py-8 lg:py-0">
            <div className="px-8">
              <p className="flex w-full flex-row gap-2 rounded-xl pb-2 text-sm font-bold">
                <Album size={16} />
                On this page
              </p>
              <nav className="text-xs dark:text-white lg:leading-6">
                <ul>
                  {data.map((item: ItemProps, index: number) => {
                    if (item.level > 3) return;
                    return (
                      <li key={index}>
                        <a
                          href={`#${item.text
                            ?.toString()
                            .trim()
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          className={`jusify-between flex w-full flex-none flex-row items-center gap-2 hover:text-primary-500 ${
                            item.level == 2 ? "font-semibold" : `pl-4`
                          }`}
                        >
                          <span className="w-full truncate">{item.text}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              {children}
            </div>
          </div>
        </div>
      </div>
    </aside>
  ) : (
    <Disclosure
      as="div"
      className="mb-4 overflow-hidden rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full flex-row items-center border-slate-300 px-4 py-2 text-left text-sm font-bold dark:border-slate-700 ${
              open && "border-b"
            }`}
          >
            <span className="flex flex-1 flex-row gap-2">
              <Album size={16} />
              On This Page
            </span>
            <ChevronRight
              size={16}
              className={`flex-shrink-0 ${
                open ? "rotate-90 transform transition-all" : ""
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            as="nav"
            className="relative bg-white px-4 pt-2 pb-4 text-sm dark:bg-slate-900"
          >
            <ul className="relative z-10 space-y-1 pb-2">
              {data.map((item: ItemProps, index: number) => {
                if (item.level > 3) return;
                return (
                  <li key={index}>
                    <a
                      href={`#${item.text
                        ?.toString()
                        .trim()
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      className={`jusify-between flex w-full flex-none flex-row items-center gap-2 hover:text-primary-500 ${
                        item.level == 2 ? "pt-1.5" : `pl-4`
                      }`}
                    >
                      <span className="w-full truncate">{item.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ArticleSidebar;
