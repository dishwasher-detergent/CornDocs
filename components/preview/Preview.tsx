import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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
    <Link href={`/Docs/${path}`} passHref>
      <div className="flex w-full cursor-pointer flex-col overflow-hidden rounded-md p-2 transition-all hover:bg-primary-300/20">
        <div className="relative h-[192px] w-full overflow-hidden rounded-md border border-slate-100 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 md:h-[128px]">
          {!fallbackImage ? (
            <Image
              loader={customLoader}
              objectFit="cover"
              layout="fill"
              src={`${imageUrl}`}
              alt="This is the preview image of the component"
              onError={() => {
                setFallbackImage(true);
              }}
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-center p-2">
              <p className="whitespace-nowrap text-4xl font-black text-slate-300 dark:text-slate-700">
                {title}
              </p>
              <p className="whitespace-nowrap text-2xl font-bold text-slate-300 dark:text-slate-700">
                {description}
              </p>
            </div>
          )}
        </div>
        <div className="py-4 px-2">
          <div className="truncate text-base font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="text-xs text-slate-700 line-clamp-3 dark:text-slate-50">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Preview;
