import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import corndocsConfig from "../../../corndocs.config";

const customLoader = ({ src }: any) => {
  return src;
};

const Logo = () => {
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Link href="/">
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        {!fallbackImage && (
          <span className="relative h-10 w-24 overflow-hidden">
            <Image
              loader={customLoader}
              src={`/static/logo.svg`}
              alt="Profile Image"
              width="100%"
              height="100%"
              layout="fill"
              onError={() => {
                setFallbackImage(true);
              }}
            />
          </span>
        )}
        <span className="hidden md:inline-block">
          {corndocsConfig.project.name}
        </span>
      </a>
    </Link>
  );
};

export default Logo;
