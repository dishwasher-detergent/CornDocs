import { useEffect, useState } from "react";
import DisplayChildren from "../../components/display/Children";
import Loading from "../../components/loading";

const Docs = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData({ children: data });
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!isLoading ? (
        <DisplayChildren data={data} />
      ) : (
        <div className="w-full py-6">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Docs;
