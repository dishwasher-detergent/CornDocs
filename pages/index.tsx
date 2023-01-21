import Markdown from "#/ui/markdown/Markdown";
import { getCertainPost } from "./api/article/[...slug]";

interface Props {
  data: any;
}

export async function getServerSideProps() {
  const data = await getCertainPost("index");

  return {
    props: {
      data: data,
    },
  };
}

function Home({ data }: Props) {
  return (
    <article className="prose prose-slate w-full max-w-none pt-8 dark:prose-invert">
      {data.content && <Markdown article={data.content} />}
    </article>
  );
}

export default Home;
