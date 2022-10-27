import Breadcrumb from "../breadcrumb/breadcrumb";
import Preview from "../preview/Preview";
import PreviewFolder from "../preview/PreviewFolder";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

interface DocProps {
  breadcrumb?: boolean;
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

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const DisplayChildren = ({ data, breadcrumb = true }: DocProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.75, type: "spring" }}
        className="h-full w-full py-6"
      >
        {breadcrumb && <Breadcrumb data={router.query.slug} />}
        <section className="grid h-full w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
          {data.children
            .sort(
              (a: any, b: any) =>
                a.custom.data.position - b.custom.data.position
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
      </motion.div>
    </AnimatePresence>
  );
};

export default DisplayChildren;
