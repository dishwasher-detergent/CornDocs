interface ResponsiveProps {
  children: React.ReactChild;
  size?: number;
  dark?: boolean;
}

const Responsive = ({ children, size, dark }: ResponsiveProps) => {
  return (
    <div className="mb-2 flex h-[30rem] items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
      <div
        style={{ maxWidth: size + "px" }}
        className="h-full w-full overflow-y-auto overflow-x-hidden bg-white transition-all dark:bg-slate-900"
      >
        <iframe
          aria-label="component preview"
          title="component preview"
          srcDoc={`<html class="flex w-full h-full ${dark && "dark"}">
                <head>
                    <meta charset="utf-8">
                    <title>Component Preview </title>
                    <link rel="stylesheet" href="https://dishwasher-detergent.github.io/OkieDesign/dist/components_css.css" /> 
                    <style>
                        .hide { display: none !important; }
                    </style>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                        tailwind.config = {
                            darkMode: class
                        };
                        function test() {
                            var links = document.querySelectorAll("a");
                            for (var index = 0; index < links.length; index++) {
                                links[index].removeAttribute(&apos;href&apos;);
                            }
                        }
                    </script>
                    <style>
                        a {
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body
                    onLoad="test();"
                    style="height: min-content;"
                    class="w-full min-h-full"
                >
                    <main class="flex flex-row flex-wrap gap-2 p-4 items-center justify-center">
                        ${children}
                    </main>
                </body>
            </html>`}
          className="h-full w-full border-0"
        ></iframe>
      </div>
    </div>
  );
};
export default Responsive;
