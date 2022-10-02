interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Content = ({ children }: Props) => {
  return (
    <div className="relative flex h-full w-full flex-row justify-start overflow-hidden overflow-y-auto bg-white pt-16 text-slate-900 dark:bg-slate-900 md:pl-64">
      {children}
    </div>
  );
};
