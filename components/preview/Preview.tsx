import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  slug: string;
}
const customLoader = ({ src }: any) => {
  return src;
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH
  ? `${process.env.NEXT_PUBLIC_BASE_PATH}/`
  : "";

function Preview(props: PreviewProps) {
  const { title, description, imageUrl, date, slug } = props;
  return (
    <Link href={`/${slug}`} passHref>
      <div className="flex flex-col w-full p-2 rounded-md bg-white dark:bg-gray-900 dark:text-white overflow-hidden hover:cursor-pointer hover:bg-slate-50/90 hover:dark:bg-slate-600/10 transition-all">
        <div className="w-full h-[128px] relative bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
          {imageUrl && <Image
            loader={customLoader}
            objectFit="cover"
            layout="fill"
            src={`${prefix}${imageUrl}`}
            alt="This is the preview image of the component"
          />}
        </div>
        <div className="py-4 px-2">
          <div className="text-slate-900 dark:text-white font-bold text-xl truncate">
            {title}
          </div>
          <div className="text-slate-700 dark:text-slate-50 line-clamp-3">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Preview;
