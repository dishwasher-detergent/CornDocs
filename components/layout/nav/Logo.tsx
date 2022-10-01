import Link from "next/link";
import Image from "next/image";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Logo = () => {
  const customLoader = ({ src }: any) => {
    return src;
  };

  return (
    <Link href="/" passHref>
      <a className="flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black">
        <Image
          loader={customLoader}
          src={`${prefix}/static/logo.svg`}
          alt="Profile Image"
          height={60}
          width={60}
          className="cursor-pointer"
        />
        <span>{process.env.NEXT_PUBLIC_OWNER_NAME}</span>
      </a>
    </Link>
  );
};

export default Logo;
