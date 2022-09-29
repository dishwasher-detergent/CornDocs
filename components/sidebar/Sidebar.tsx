import React, { useEffect, useState } from "react";
import Button from "./Button";

function Sidebar() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

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
    <aside className="dark:bg-slate-00 relative h-full w-64 flex-none overflow-y-auto overflow-x-hidden border-r border-slate-300 bg-slate-100 pb-6 dark:border-slate-700 dark:bg-slate-800">
      <ul className="flex w-full flex-col gap-1 px-4 pt-6">
        {data.length > 0 &&
          data.map((item: any, index) => (
            <Button data={item} key={index}>
              {item.type == "file" ? item.custom.data.title : item.name}
            </Button>
          ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
