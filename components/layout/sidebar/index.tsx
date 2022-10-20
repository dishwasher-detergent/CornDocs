import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { SidebarContext } from "../../../context/SidebarContext";
import Loading from "../../loading";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

function Sidebar() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  /* @ts-ignore */
  const { sidebar } = useContext(SidebarContext);
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

  return (
    <AnimatePresence>
      {sidebar || width > 1024 ? (
        <motion.aside
          initial={{ left: "-100%" }}
          animate={{ left: "max(0px,calc(50% - 45rem))" }}
          exit={{ left: "-100%" }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`fixed inset-0 top-16 right-auto z-20 flex w-full md:w-[19.5rem] flex-col overflow-y-auto border-r border-slate-300 bg-white/60 px-8 pb-10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60 dark:text-white`}
        >
          <nav
            id="nav"
            className="relative flex-1 py-6 lg:text-sm lg:leading-6"
          >
            {/* <div className="pointer-events-none sticky top-0 -ml-0.5">
              <div className="pointer-events-auto relative bg-white dark:bg-slate-900">
                SEARCH HERE
              </div>
            </div> */}
            <ul className="space-y-2">
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
      ) : null}
    </AnimatePresence>
  );
}

export default Sidebar;
