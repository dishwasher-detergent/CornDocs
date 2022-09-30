import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DisplayChildren from "../../components/display/Children";
import DisplayDoc from "../../components/display/Doc";

function Doc() {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (router.query.slug) {
      setLoading(true);
      fetch(`/api/posts/${(router.query.slug as string[]).join("/")}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    }
  }, [router]);

  return (
    <>
      {!isLoading &&
        (data.children ? (
          <DisplayChildren data={data} />
        ) : (
          <DisplayDoc data={data} />
        ))}
    </>
  );
}

export default Doc;
