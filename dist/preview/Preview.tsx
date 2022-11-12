import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "./Layout";

interface PreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  slug: string;
  path: string;
}

const customLoader = ({ src }: any) => {
  return src;
};

function Preview(props: PreviewProps) {
  const { title, description, imageUrl, path } = props;
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Layout title={title} description={description} path={path}>
      {imageUrl ? (
        <Image
          loader={customLoader}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          src={`${imageUrl}`}
          alt="This is the preview image of the component"
          onError={() => {
            setFallbackImage(true);
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-center p-6">
          <p className="whitespace-nowrap text-4xl font-black text-slate-400 dark:text-slate-500">
            {title}
          </p>
          <p className="whitespace-nowrap text-2xl font-bold text-slate-400 dark:text-slate-500">
            {description}
          </p>
        </div>
      )}
    </Layout>
  );
}

export default Preview;
