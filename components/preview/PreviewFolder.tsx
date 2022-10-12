import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface PreviewProps {
  title: string;
  count: number;
  slug: string;
  path: string;
  imageUrl: string;
  displayIcons?: boolean;
}
const customLoader = ({ src }: any) => {
  return src;
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH
  ? `${process.env.NEXT_PUBLIC_BASE_PATH}/`
  : "";

function PreviewFolder(props: PreviewProps) {
  const { title, slug, count, path, imageUrl, displayIcons = true } = props;
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Link href={`/Docs/${path}`} passHref>
      <div className="flex w-full cursor-pointer flex-col overflow-hidden rounded-md p-2 transition-all hover:bg-primary-300/20">
        <div className="relative h-[12rem] w-full overflow-hidden rounded-md border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-800 md:h-[10rem]">
          {!fallbackImage && (
            <Image
              loader={customLoader}
              objectFit="cover"
              layout="fill"
              src={`${imageUrl ? imageUrl : `/images/${path}/${slug}.jpeg`}`}
              alt={`This is a folder of ${count} components`}
              onError={() => {
                setFallbackImage(true);
              }}
            />
          )}
          {displayIcons && (
            <div className="absolute grid w-full grid-cols-4 gap-1 overflow-hidden p-2">
              {[...Array(count)].map((item: string) => (
                <div className="h-16 w-full rounded-md bg-slate-400/20 backdrop-blur-md dark:bg-slate-700/30 md:h-10"></div>
              ))}
            </div>
          )}
        </div>
        <div className="py-4 px-2">
          <div className="truncate text-base font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="text-xs text-slate-700 line-clamp-3 dark:text-slate-50">
            {count} Sub-Item{count > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PreviewFolder;
