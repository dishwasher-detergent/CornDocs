import Preview from "../preview/Preview";
import PreviewFolder from "../preview/PreviewFolder";

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
  return (
    <section className="grid-col-1 grid md:grid-cols-2 lg:grid-cols-3">
      {data.children.map((item: any) =>
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
            title={item.name}
            count={item.children.length}
          />
        )
      )}
    </section>
  );
};

export default DisplayChildren;
