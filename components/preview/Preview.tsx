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
      <div className="flex w-full cursor-pointer flex-col overflow-hidden rounded-md bg-white p-2 transition-all hover:bg-amber-300/20 dark:bg-gray-900 dark:text-white hover:dark:bg-amber-300/20">
        <div className="relative h-[128px] w-full overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
          {imageUrl && (
            <Image
              loader={customLoader}
              objectFit="cover"
              layout="fill"
              src={`${prefix}${imageUrl}`}
              alt="This is the preview image of the component"
            />
          )}
        </div>
        <div className="py-4 px-2">
          <div className="truncate text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="text-slate-700 line-clamp-3 dark:text-slate-50">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Preview;
