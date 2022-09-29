import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import CodeBlock from "../../components/code-block";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface DocProps {
  slug: string;
  content: any;
  data: {
    title: string;
    date: string;
    content: string;
    description: string;
    slug: string;
    tags: string[];
    banner: string;
  };
}

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<DocProps | { [key: string]: any }>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/posts/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    }
  }, [router]);

  return (
    !isLoading && (
      <>
        <NextSeo
          title={`${data.data.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME}`}
          canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`}
          description={data.data.description}
          openGraph={{
            title: `${data.data.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
            url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`,
            description: data.data.description,
            type: "article",
            article: {
              publishedTime: data.data.date,
              modifiedTime: data.data.date,
              expirationTime: data.data.date,
              section: "Technology",
              authors: [`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}`],
              tags: data.data.tags,
            },
            images: [
              {
                url: data.data.banner,
                width: 800,
                height: 600,
                alt: data.data.title,
                type: "image/jpeg",
              },
              {
                url: data.data.banner,
                width: 900,
                height: 800,
                alt: data.data.title,
                type: "image/jpeg",
              },
            ],
            site_name: `${process.env.NEXT_PUBLIC_OWNER_NAME}'s Documentation`,
          }}
        />
        <div className="flex justify-center">
          <article className="dark:prose-dark dark:md:prose-xl-dark prose my-10 break-normal px-6 md:prose-xl md:px-0">
            <Markdown
              options={{
                wrapper: "article",
                forceBlock: false,
                overrides: {
                  pre: {
                    component: CodeBlock,
                  },
                },
              }}
            >
              {data.content}
            </Markdown>
          </article>
        </div>
      </>
    )
  );
}

export default Doc;
