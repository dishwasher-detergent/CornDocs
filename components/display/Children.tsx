import Breadcrumb from "../breadcrumb/breadcrumb";
import Preview from "../preview/Preview";
import PreviewFolder from "../preview/PreviewFolder";
import { useRouter } from "next/router";

interface DocProps {
  data: {
    slug: string;
    content: any;
    children: any[];
    data: {
      title: string;
      date: string;
      content: string;
      description: string;
      slug: string;
      tags: string[];
      banner: string;
    };
  };
}

const DisplayChildren = ({ data }: DocProps) => {
  const router = useRouter();

  console.log(data);

  return (
    <div className="h-full w-full p-6">
      <Breadcrumb data={router.query.slug} />
      <section className="grid-col-1 grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.children
          .sort(
            (a: any, b: any) => a.custom.data.position - b.custom.data.position
          )
          .map((item: any) =>
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
                key={item.name}
                slug={item.name}
                path={item.custom.path}
                title={item.custom.data.title}
                imageUrl={item.custom.data.banner}
                count={item.children.length}
              />
            )
          )}
      </section>
    </div>
  );
};

export default DisplayChildren;
