import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import Preview from "../../components/preview/Preview";
import PreviewFolder from "../../components/preview/PreviewFolder";

const Docs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
    <>
      <NextSeo
        title={`${process.env.NEXT_PUBLIC_OWNER_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`}
        description={`Documentation for ${process.env.NEXT_PUBLIC_OWNER_NAME}`}
        openGraph={{
          title: `${process.env.NEXT_PUBLIC_OWNER_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`,
          description: `Documentation for ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
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
          site_name: `${process.env.NEXT_PUBLIC_OWNER_NAME}'s Documentation`,
        }}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {!isLoading &&
          data.map((item: any) =>
            item.type != "directory" ? (
              <Preview
                path={item.custom.path}
                key={item.custom.slug}
                slug={item.custom.slug}
                title={item.custom.data.title}
                description={item.custom.data.description}
                imageUrl={item.custom.data.banner}
                date={item.custom.data.date}
              />
            ) : (
              <PreviewFolder
                path={item.custom.path}
                key={item.name}
                slug={item.name}
                title={item.name}
                count={item.children.length}
              />
            )
          )}
      </div>
    </>
  );
};

export default Docs;
