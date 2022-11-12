import Link from "next/link";
import Image from "next/image";
import corndocsConfig from "../../../corndocs.config.js";

const customLoader = ({ src }: any) => {
  return src;
};

const Logo = () => {
  const { logo } = corndocsConfig.project;
  return (
    <Link href="/">
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        {logo && (
          <span className="logo relative h-10 overflow-hidden">
            <Image
              loader={customLoader}
              objectFit="contain"
              objectPosition="center"
              src={logo.src}
              alt={logo.alt}
              width={logo?.size?.[0] ? logo.size[0] : 80}
              height={logo?.size?.[1] ? logo.size[1] : 40}
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
