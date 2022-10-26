import { Combobox } from "@headlessui/react";
import { Search } from "lucide-react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ refine }: any) => {
  return (
    <div
      role="search"
      className="relative flex flex-row border-b border-slate-300 dark:border-slate-700"
    >
      <div className="grid h-16 w-16 place-items-center">
        <Search size={20} />
      </div>
      <Combobox.Input
        className="w-full py-4 pr-6 text-lg outline-none dark:bg-slate-900"
        id="algolia_search"
        type="search"
        placeholder="Search Docs"
        onChange={(e) => refine(e.currentTarget.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default connectSearchBox(SearchBox);
