import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const customLoader = ({ src }: any) => {
  return src;
};

const Logo = () => {
  const [fallbackImage, setFallbackImage] = useState(false);

  return (
    <Link href="/" passHref>
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        {!fallbackImage &&
          <span className="relative h-10 w-24 overflow-hidden">
            <Image
              loader={customLoader}
              src={`${prefix}/static/logo.svg`}
              alt="Profile Image"
              width="100%"
              height="100%"
              layout="fill"
              onError={() => {
                setFallbackImage(true);
              }}
            />
          </span>
        }
        <span className="hidden md:inline-block">
          {process.env.NEXT_PUBLIC_PROJECT_NAME}
        </span>
      </a>
    </Link>
  );
};

export default Logo;
