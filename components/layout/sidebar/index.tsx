import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import Skeleton from "react-loading-skeleton";
import { SidebarContext } from "../../../context/SidebarContext";

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
      className={`fixed md:absolute inset-0 top-16 z-10 flex-none overflow-y-auto overflow-x-hidden border-slate-300 bg-white/80 pb-6 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 dark:text-white md:w-64 md:border-r ${
        sidebar && "hidden lg:block"
      }`}
    >
      <ul className="flex w-full flex-col gap-1 px-4 pt-6">
        {!isLoading ? (
          data.map((item: any, index) => (
            <Button data={item} key={index}>
              {item.type == "file" ? item.custom.data.title : item.name}
            </Button>
          ))
        ) : (
          <>
            <li className="h-8 w-full rounded-md">
              <Skeleton height={"100%"} />
            </li>
            <li className="h-8 w-full rounded-md">
              <Skeleton height={"100%"} />
            </li>
            <li className="h-8 w-full rounded-md">
              <Skeleton height={"100%"} />
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
