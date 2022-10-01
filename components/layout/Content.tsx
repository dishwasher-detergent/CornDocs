interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden">
      {children}
    </div>
  );
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl flex-row flex-nowrap border-x border-slate-300 dark:border-slate-700">
        {children}
      </div>
    </div>
  );
};
