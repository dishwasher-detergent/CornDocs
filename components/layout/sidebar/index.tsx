import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { SidebarContext } from "../../../context/SidebarContext";
import Loading from "../../loading";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import SearchButton from "./Search";
import corndocsConfig from "../../../corndocs.config";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (width > 1024) {
      if (router.pathname.includes("Docs")) {
        toggleSidebar(true);
        return;
      }
      toggleSidebar(false);
    }
  }, [width, router.pathname]);

  return (
    <AnimatePresence>
      {sidebar && (
        <motion.aside
          initial={{ left: "-100%" }}
          animate={{ left: "max(0px,calc(50% - 45rem))" }}
          exit={{ left: "-100%" }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`fixed inset-0 top-16 right-auto z-20 flex w-full flex-col overflow-y-auto bg-white/90 px-8 pb-10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 dark:text-white md:w-[19.5rem]`}
        >
          <nav
            id="nav"
            className="relative flex-1 space-y-4 py-6 lg:text-sm lg:leading-6"
          >
            {corndocsConfig.search.enabled &&
              corndocsConfig.search.algolia_search_api_key && <SearchButton />}
            <ul>
              {!isLoading ? (
                data
                  .sort(
                    (a: any, b: any) =>
                      a.custom.data.position - b.custom.data.position
                  )
                  .map((item: any, index) => (
                    <Button data={item} key={index}>
                      {item.custom.data.title}
                    </Button>
                  ))
              ) : (
                <div className="w-full py-6">
                  <Loading />
                </div>
              )}
            </ul>
          </nav>
          <div className="w-full flex-none text-center text-sm font-bold dark:text-white">
            <p>
              Built with ❤️ and{" "}
              <a
                target="_blank"
                href="https://github.com/dishwasher-detergent/CornDocs"
              >
                CornDocs
              </a>
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
