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
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const DisplayChildren = ({ data, breadcrumb = true }: DocProps) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "spring" }} // Set the transition to linear
        className="h-full w-full py-6"
      >
        {breadcrumb && <Breadcrumb data={router.query.slug} />}
        <section className="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
