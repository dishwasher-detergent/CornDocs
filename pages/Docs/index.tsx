import Selection from "#/ui/display/selection/Selection";
import { getAllPosts } from "../api/article";

export async function getStaticProps() {
  const data = await getAllPosts();

  return {
    props: {
      data: data,
    },
  };
}

interface Props {
  data: any;
}

export default function Docs({ data }: Props) {
  return <Selection data={data} />;
}
