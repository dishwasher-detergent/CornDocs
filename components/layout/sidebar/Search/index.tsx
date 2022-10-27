import { Search } from "lucide-react";
import { useState, useContext } from "react";
import { Combobox, Dialog } from "@headlessui/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./Search";
import Hits from "./Hits";
import { DarkmodeContext } from "../../../../context/DarkModeContext";
import { useRouter } from "next/router";
import corndocsConfig from "../../../../corndocs.config";
import { CommandContext } from "../../../../context/CommandContext";
import { SidebarContext } from "../../../../context/SidebarContext";

const searchClient = algoliasearch(
  corndocsConfig.search.algolia_app_id
    ? corndocsConfig.search.algolia_app_id
    : "",
  corndocsConfig.search.algolia_search_api_key
    ? corndocsConfig.search.algolia_search_api_key
    : ""
);

const SearchButton = () => {
  const router = useRouter();

  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);
  /* @ts-ignore */
  const { command, toggleCommand } = useContext(CommandContext);
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  const handleChange = (e: string) => {
    router.push(e);
    toggleCommand();
    toggleSidebar();
  };

  return (
    <>
      <button
        onClick={() => toggleCommand()}
        className="mb-4 flex h-10 w-full flex-row items-center gap-2 truncate rounded-md border border-slate-300 pl-4 pr-2 text-left text-sm text-slate-500 outline-none hover:ring-2 hover:ring-primary-300 hover:ring-offset-2 hover:ring-offset-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:ring-offset-slate-800"
      >
        <Search size={16} className="flex-none" />
        <span className="flex-1">Search Docs...</span>
        <kbd className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800">
          CTRL + K
        </kbd>
      </button>

      <Dialog
        open={command}
        onClose={() => toggleCommand()}
        className={`fixed inset-0 z-[9999] p-4 md:pt-40 ${darkmode && "dark"}`}
      >
        <Dialog.Overlay className="fixed inset-0 bg-white/90 backdrop-blur-md dark:bg-slate-900/90" />
        <Dialog.Panel className="relative mx-auto max-w-xl overflow-hidden rounded-md border border-slate-300 bg-white ring-2 ring-primary-300 ring-offset-2 ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:ring-offset-slate-800">
          <Combobox onChange={(e: string) => handleChange(e)}>
            <InstantSearch
              searchClient={searchClient}
              indexName={corndocsConfig.search.algolia_index}
            >
              <SearchBox />
              <Hits />
            </InstantSearch>
          </Combobox>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default SearchButton;
