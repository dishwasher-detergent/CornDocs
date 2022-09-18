import Link from "next/link";
import Image from "next/image";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Logo = () => {
  const customLoader = ({ src }: any) => {
    return src;
  };

  return (
    <Link href="/" passHref>
      <div className="flex h-full items-center justify-start gap-2 text-xl font-black">
        <Image
          loader={customLoader}
          src={`${prefix}/static/logo.svg`}
          alt="Profile Image"
          height={60}
          width={60}
          className="cursor-pointer"
        />
        <p>{process.env.NEXT_PUBLIC_OWNER_NAME}</p>
      </div>
    </Link>
  );
};

export default Logo;
