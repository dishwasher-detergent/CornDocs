interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  return <>{children}</>;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full overflow-hidden dark:bg-slate-900 dark:text-white">
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl flex-row flex-nowrap border-x border-slate-300 dark:border-slate-700">
        {children}
      </div>
    </div>
  );
};
