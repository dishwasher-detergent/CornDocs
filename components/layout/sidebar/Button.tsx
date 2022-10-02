import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { TypeDocsDetails } from "../../../types/TypeDocsDetails";

interface ButtonProps {
  data: any;
  children: React.ReactChild;
}

const Button = ({ data, children }: ButtonProps) => {
  return !data.children ? (
    <li>
      <Link href={`/Docs/${data.custom.path}`}>
        <a className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-md px-3 py-1.5 font-bold hover:bg-primary-300/20">
          {children}
        </a>
      </Link>
    </li>
  ) : (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="li"
              className={`flex cursor-pointer flex-row flex-nowrap items-center gap-2 truncate rounded-md px-3 py-1.5 font-bold ${
                open && "bg-primary-300/20"
              }`}
            >
              <span className="flex w-full flex-row items-center gap-2 truncate">
                {children}
              </span>
              <ChevronRightIcon
                className={`h-4 w-4 transition-all ${
                  open && "rotate-90 text-primary-500"
                }`}
              />
            </Disclosure.Button>
            <Disclosure.Panel as="ul" className="flex flex-col gap-1 pl-4">
              {data.children.map((item: TypeDocsDetails, index: number) => {
                return !item.children ? (
                  <li key={index}>
                    <Link href={`/Docs/${item.custom.path}`}>
                      <a className="flex cursor-pointer flex-row flex-nowrap items-center justify-start gap-2 truncate rounded-md px-3 py-1.5 font-bold hover:bg-primary-300/20">
                        <svg
                          className="h-4 w-4 rotate-90 text-primary-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="currentColor"
                        >
                          {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                          <path d="M342.6 182.6C336.4 188.9 328.2 192 319.1 192s-16.38-3.125-22.62-9.375L224 109.3V432c0 44.13-35.89 80-80 80H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h112C152.8 448 160 440.8 160 432V109.3L86.62 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l127.1-128c12.5-12.5 32.75-12.5 45.25 0l128 128C355.1 149.9 355.1 170.1 342.6 182.6z" />
                        </svg>
                        <span>{item.custom.data.title}</span>
                      </a>
                    </Link>
                  </li>
                ) : (
                  <Button data={item} key={index}>
                    <>
                      <svg
                        className="h-4 w-4 rotate-90 text-primary-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                      >
                        {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                        <path d="M342.6 182.6C336.4 188.9 328.2 192 319.1 192s-16.38-3.125-22.62-9.375L224 109.3V432c0 44.13-35.89 80-80 80H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h112C152.8 448 160 440.8 160 432V109.3L86.62 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l127.1-128c12.5-12.5 32.75-12.5 45.25 0l128 128C355.1 149.9 355.1 170.1 342.6 182.6z" />
                      </svg>
                      <span>{item.name}</span>
                    </>
                  </Button>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Button;
