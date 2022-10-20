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
                <p className="w-full rounded-md bg-primary-200/20 px-2 py-1.5 font-bold text-primary-500">
                  On this page
                </p>
                <nav className="px-4 pt-2 dark:text-white lg:text-sm lg:leading-6">
                  <ul>
                    {data.map((item: any, index: number) => {
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
                              item.level == 2 ? "py-2 font-bold" : `py-0.5 pl-4`
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
