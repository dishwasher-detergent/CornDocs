interface Props {
  data: string[];
}

const ArticleSidebar = ({ data }: Props) => {
  return (
    <aside className="col-span-12 space-y-8 lg:col-span-3 xl:col-start-10">
      <div className="space-y-8 lg:sticky lg:top-[4.5rem] lg:mb-16">
        <div className="hidden lg:block">
          <div className="space-y-8 py-8 lg:py-0">
            {/* <div>
              <div className="space-x-2">
                <a href="">
                  <span className="bg-brand-200 text-brand-1100 border-brand-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium">
                    postgres
                  </span>
                </a>
              </div>
            </div> */}
            <div>
              <div>
                <p className="w-full rounded-md bg-primary-300/20 px-2 py-1.5 font-bold text-primary-500">
                  On this page
                </p>
                <nav className="px-2 dark:text-white">
                  <ul className="space-y-3">
                    {data.map((item: any) => {
                      if (item.level > 3) return;
                      return (
                        <li>
                          <a
                            href={`#${item.text
                              ?.toString()
                              .trim()
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            className={`jusify-between flex w-full flex-none flex-row items-center gap-2 font-semibold hover:text-primary-500 ${
                              item.level == 2 ? "text-md pt-2" : `pl-4 text-sm`
                            }`}
                          >
                            <span className="w-full truncate">{item.text}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ArticleSidebar;
