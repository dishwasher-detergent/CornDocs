interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full max-w-screen-2xl flex-col overflow-y-auto overflow-x-hidden border-r border-slate-300 dark:border-slate-700">
      <div className="w-full flex-1 p-6">{children}</div>
    </div>
  );
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="flex w-full flex-1 flex-row flex-nowrap justify-center overflow-hidden">
      {children}
    </div>
  );
};
