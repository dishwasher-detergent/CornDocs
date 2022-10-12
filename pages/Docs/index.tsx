import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import DisplayChildren from "../../components/display/Children";
import Layout from "../../components/layout/Layout";
import Loading from "../../components/loading";

const Docs = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData({ children: data });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`}
        description={`Documentation for ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        openGraph={{
          title: `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`,
          description: `Documentation for ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
          type: "article",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/static/logo.svg`,
              width: 800,
              height: 600,
              alt: "Logo",
              type: "svg",
            },
            {
              url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/static/logo.svg`,
              width: 900,
              height: 800,
              alt: "Logo",
              type: "svg",
            },
          ],
          site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
        }}
      />
      {!isLoading ? (
        <DisplayChildren data={data} />
      ) : (
        <div className="w-full py-6">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Docs;
