import { NextSeo } from "next-seo";
import { TypeBlogDetails } from "../types/TypeBlogDetails";
import { getAllPosts } from "../lib/blog-api";
import Preview from "../components/preview/Preview";

export const getStaticProps = async () => {
  const postList: TypeBlogDetails[] = getAllPosts();

  return {
    props: {
      posts: postList,
    },
  };
};

interface Props {
  posts: TypeBlogDetails[];
  children?: React.ReactNode;
}

const Home = ({ posts }: Props) => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((blogItem: TypeBlogDetails) => (
          <Preview
            key={blogItem.slug}
            slug={blogItem.slug}
            title={blogItem.data.title}
            description={blogItem.data.description}
            imageUrl={blogItem.data.banner}
            date={blogItem.data.date}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
