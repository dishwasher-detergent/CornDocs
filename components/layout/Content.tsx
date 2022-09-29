interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="w-full flex-1 p-6">{children}</div>
    </div>
  );
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-row flex-nowrap border-x border-slate-300 dark:border-slate-700">
        {children}
      </div>
    </div>
  );
};
