import Markdown from "#/ui/markdown/Markdown";

const Home = () => {
  return (
    <article className="prose prose-slate w-full max-w-none pt-8 dark:prose-invert">
      <Markdown article={"index"} />
    </article>
  );
};

export default Home;
