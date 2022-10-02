import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Docs");
  }, []);

  return <div>Add your custom index page here!</div>;
};

export default Home;
