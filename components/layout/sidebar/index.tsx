import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import { SidebarContext } from "../../../context/SidebarContext";
import Loading from "../../loading";

function Sidebar() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  /* @ts-ignore */
  const { sidebar } = useContext(SidebarContext);

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
    <aside
      className={`fixed inset-0 top-16 left-[max(0px,calc(50%-45rem))] right-auto z-20 w-[19.5rem] overflow-y-auto border-r border-slate-300 bg-white/60 px-8 pb-10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60 dark:text-white lg:block ${
        sidebar && "hidden lg:block"
      }`}
    >
      <nav id="nav" className="relative py-6 lg:text-sm lg:leading-6">
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
    </aside>
  );
}

export default Sidebar;
