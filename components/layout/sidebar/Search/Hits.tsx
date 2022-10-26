import { Combobox } from "@headlessui/react";
import Link from "next/link";
import { connectStateResults } from "react-instantsearch-dom";

interface Props {
  searchState: {
    query: string;
    page: number;
  };
  searchResults: any;
}

interface HeadingsProps {
  text: string;
  level: number;
}

interface OptionProp {
  description: string;
  heading: HeadingsProps[];
  objectID: string;
  path: string;
  slug: string;
  title: string;
}

const Hits = ({ searchState, searchResults }: Props) => {
  if (!searchState.query || searchState.query.length == 0) return null;

  return (
    <>
      {searchResults?.hits.length === 0 && (
        <p className="px-4 py-2 font-bold">
          Bummer! We couldn't find what you were looking for.
        </p>
      )}
      {searchResults?.hits.length > 0 && (
        <Combobox.Options className="max-h-96 overflow-y-auto">
          {searchResults.hits.map((hit: OptionProp) => (
            <Combobox.Option key={hit.objectID} value={hit.path}>
              {({ active, selected }) => (
                <Link href={`/Docs/${hit.path}`}>
                  <a
                    className={`group flex h-16 flex-col justify-center px-4 font-bold hover:bg-primary-200/20 dark:hover:bg-primary-500/10 ${
                      active && "bg-primary-200/20 dark:bg-primary-500/10"
                    }`}
                  >
                    <span
                      className={`group-hover:text-primary-500 ${
                        active && "text-primary-500"
                      }`}
                    >
                      {hit.title}
                    </span>
                    <span
                      className={`text-sm group-hover:text-primary-500 ${
                        active && "text-primary-500"
                      }`}
                    >
                      {hit.description}
                    </span>
                  </a>
                </Link>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </>
  );
};

export default connectStateResults(Hits);
