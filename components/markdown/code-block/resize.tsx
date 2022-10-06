interface ResponsiveProps {
  children: React.ReactChild;
  size?: number;
}

const Responsive = ({ children, size }: ResponsiveProps) => {
  return (
    <div className="mb-2 flex items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
      <div
        style={{ maxWidth: size + "px" }}
        className="overflow-x-hiddentransition-all w-full overflow-y-auto bg-white dark:bg-slate-900"
      >
        <iframe
          className="h-full w-full overflow-hidden"
          /* @ts-ignore */
          srcDoc={
            '<script src="https://cdn.tailwindcss.com"></script>' + children
          }
        />
      </div>
    </div>
  );
};

export default Responsive;
