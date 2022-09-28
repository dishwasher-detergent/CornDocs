import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TypeBlogDetails } from "../types/TypeBlogDetails";

function NotFoundPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="rounded-md bg-amber-300/20 p-4 text-9xl font-black text-amber-600">
        404
      </h1>
      <div className="text-center text-xl">
        <p>
          Looks like the documentation you were looking for is nowhere to be
          found
        </p>
        <p>
          Maybe you'll like <RandomButton /> instead
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;

const RandomButton = () => {
  const [data, setData] = useState<TypeBlogDetails[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        let index = Math.floor(Math.random() * data.length);
        setData([data[index]]);
        setLoading(false);
      });
  }, []);

  return (
    <>{!isLoading && <Link href={data[0].slug}>{data[0].data.title}</Link>}</>
  );
};
