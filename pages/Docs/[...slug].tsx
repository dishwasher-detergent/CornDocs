import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DisplayChildren from "../../components/display/Children";
import DisplayDoc from "../../components/display/Doc";
import Loading from "../../components/loading";
import { NextSeo } from "next-seo";

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/posts/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [router]);

  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <h1 className="rounded-md bg-primary-300/20 p-4 text-9xl font-black text-primary-500">
          404
        </h1>
        <div className="text-center text-xl text-slate-900 dark:text-white">
          <p>
            Looks like the documentation for{" "}
            <span className="font-bold">{router.query.slug}</span> is nowhere to
            be found!
          </p>
          <p>Try looking for something else.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isLoading ? (
        <>
          <NextSeo
            title={`${data.custom.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
            canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.custom.slug}`}
            description={data.custom.data.description}
            openGraph={{
              title: `${data.custom.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
              url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/Docs/${data.custom.path}`,
              description: data.custom.data.description,
              type: "article",
              images: [
                {
                  url: data.custom.data.banner,
                  width: 800,
                  height: 600,
                  alt: data.custom.data.title,
                  type: "image/jpeg",
                },
                {
                  url: data.custom.data.banner,
                  width: 900,
                  height: 800,
                  alt: data.custom.data.title,
                  type: "image/jpeg",
                },
              ],
              site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
            }}
          />
          {data.children ? (
            <DisplayChildren data={data} />
          ) : (
            <DisplayDoc data={data} />
          )}
        </>
      ) : (
        <div className="w-full py-6">
          <Loading />
        </div>
      )}
    </>
  );
}

export default Doc;
