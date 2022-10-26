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

const searchClient = algoliasearch(
  corndocsConfig.search.algolia_app_id
    ? corndocsConfig.search.algolia_app_id
    : "",
  corndocsConfig.search.algolia_search_api_key
    ? corndocsConfig.search.algolia_search_api_key
    : ""
);

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);

  const handleChange = (e: string) => {
    router.push(e);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex w-full cursor-pointer flex-row items-center gap-2 rounded-md border border-slate-300 p-2 px-4 text-left font-bold focus:ring-2 focus:ring-primary-200/70 focus:ring-offset-4 dark:border-slate-700 dark:focus:ring-primary-500/30 dark:focus:ring-offset-slate-900"
      >
        <Search size={16} />
        Search
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={`fixed inset-0 z-[9999] pt-40 ${darkmode && "dark"}`}
      >
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 backdrop-blur-md" />
        <Dialog.Panel className="relative mx-auto max-w-xl overflow-hidden rounded-md border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white">
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
