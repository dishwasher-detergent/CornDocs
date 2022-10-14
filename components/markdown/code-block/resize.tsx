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
                    <title>Component Preview</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <script>
                        tailwind.config = {
                            darkMode: "class"
                        }

                        function removeLink() {
                            var links = document.querySelectorAll("a");
                            for (var index = 0; index < links.length; index++) {
                                links[index].removeAttribute("href");
                            }
                        }
                    </script>
                    <style>
                        * {
                          font-family: 'Nunito', sans-serif;
                        }

                        a {
                          cursor: pointer;
                        }
                    </style>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link
                      href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap"
                      rel="stylesheet"
                    />                
                  </head>
                <body
                    onLoad="removeLink();"
                    style="height: min-content;"
                    class="w-full min-h-full dark:bg-slate-900 bg-white"
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
