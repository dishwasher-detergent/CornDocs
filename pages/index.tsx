import { useRouter } from "next/router";
import { useEffect } from "react";
import Responsive from "../components/markdown/code-block/resize";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Docs");
  }, []);

  return <div>Add your custom index page here!</div>;
};

export default Home;
