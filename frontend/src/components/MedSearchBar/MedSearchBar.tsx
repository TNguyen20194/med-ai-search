import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../hooks";
import suggestions from "./suggestions";
import {
  searchResources,
  type SearchResource,
} from "../../services/searchResources";

import { getLLMResponse } from "../../services/llm";

const MedSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    {
      term: string;
    }[]
  >([]);

  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false);

  const [llmResponse, setLLMResponse] = useState<string | null>(null);

  //SerpAPI resources
  const [resources, setResources] = useState<SearchResource[]>([]);
  const [isSearchching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    console.log("triggered get suggestions");
    console.log("debouncedSearchTerm =", debouncedSearchTerm);
    if (hasSelectedSuggestion) {
      return setSearchSuggestions([]);
    }

    if (debouncedSearchTerm.trim() === "") {
      return setSearchSuggestions([]);
    } else {
      const results = suggestions.filter((item) => {
        return JSON.stringify(item).includes(debouncedSearchTerm.toLowerCase());
      });

      console.log("suggestions results =", results);
      setSearchSuggestions(results);
    }
  }, [debouncedSearchTerm, hasSelectedSuggestion]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSelectedSuggestion(false);

    if (e.target.value.trim() === "") {
      setSearchSuggestions([]);
    }
    setSearchTerm(e.target.value);
  };

  const formattedResponse = llmResponse
    ? llmResponse
        .replaceAll("{", "")
        .replaceAll("}", "")
        .replaceAll('"', "")
        .replaceAll(",", "\n")
    : "";

  const handleSearch = async (term: string) => {
    const query = term.trim();
    if (!query) return;

    setSearchSuggestions([]);
    setIsSearching(true);
    setSearchError(null);

    try {
      const serpResults = await searchResources(query);
      setResources(serpResults);

      const res = await getLLMResponse(query);
      setLLMResponse(res);
    } catch (error) {
      console.error("Search failed: ", error);
      setSearchError("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // const groupedResults: Record<string, SearchData[]> = {};

  // searchResults.forEach((result) => {
  //   const category = result.category;

  //   if (!groupedResults[category]) {
  //     groupedResults[category] = [];
  //   }

  //   groupedResults[category].push(result);
  // });

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
        className="mb-8 mt-8 w-full max-w-2xl"
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 pr-20 text-base text-gray-900 shadow-md transition-shadow duration-200 hover:shadow-lg focus:border-gray-300 focus:outline-none"
            placeholder="Search by conditions, therapy, worksheet, tips, or course"
          />
          <div className="absolute left-0 top-10 ml-4 mt-3 flex items-center">
            {searchSuggestions.length > 0 && (
              <div className="rounded-md bg-white p-2 shadow-lg">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setHasSelectedSuggestion(true);
                      setSearchTerm(suggestion.term);
                      handleSearch(suggestion.term);

                      console.log("Clicked suggestion:", suggestion.term);
                    }}
                  >
                    {suggestion.term}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="absolute right-0 top-0 mr-4 mt-3 flex items-center">
            <button type="submit" className="text-blue-500 hover:text-blue-600">
              <Search size={20} /> {""}
            </button>
          </div>
        </div>
      </form>

      {isSearchching && (
        <p className="mb-4 text-sm text-gray-500">Searching resources...</p>
      )}

      {searchError && <p className="mb-4 text-sm tex-red-600">{searchError}</p>}

      {resources.length > 0 && (
        <div className="mb-6 w-full max-w-2xl rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Rources Result
          </h2>

          <ul>
            {resources.map((resource) => (
              <li
                key={resource.url}
                className="mb-4 border-b border-gray-100 pb-3 last:border-b-0"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener moreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {resource.title}
                </a>

                {resource.source && (
                  <p className="mt-1 text-xs font-semibold text-gray-400">
                    {resource.source}
                  </p>
                )}

                {resource.snippet && (
                  <p className="mt-1 text-sm text-gray-700">
                    {resource.snippet}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {llmResponse && (
        <div className="w-full max-w-2xl rounded-lg bg-green-50 p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-green-900">
            LLM Response:
          </h2>

          <div className="mb-4 rounded-md bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-700">Search Term</p>
            <p className="mt-1 text-base font-medium text-gray-900">
              {searchTerm}
            </p>
          </div>

          <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">
              {formattedResponse}
            </p>
          </div>
          <pre className="whitespace-pre-wrap break-words text-sm text-green-700">
            {JSON.stringify(llmResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* {searchResults.length > 0 && (
        <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Search Result:
          </h2>

          <div>
            {Object.entries(groupedResults).map(([category, results]) => (
              <section key={category} className="mb-6">
                <h3 className="mb-3 rounded-md bg-blue-100 px-3 py-2 text-sm font-bold text-blue-700">
                  {category}
                </h3>

                <ul>
                  {results.map((result) => (
                    <li
                      key={result.id}
                      className="mb-4 border-b border-gray-100 pb-3"
                    >
                      {result.url ? (
                        <a
                          href={result.url}
                          className="font-medium text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.title}
                        </a>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {result.title}
                        </span>
                      )}

                      <p className="text-xs font-semibold text-gray-400">
                        {result.condition.toUpperCase()}
                      </p>

                      {result.content && (
                        <p className="mt-1 text-sm text-gray-700">
                          {result.content}
                        </p>
                      )}

                      {result.tags && (
                        <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                          {result.tags.map((tag) => (
                            <span
                              key={tag}
                              className="max-w-full rounded-full bg-pink-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 break-words sm:px-3 sm:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {result.audience && (
                        <p className="mt-1 text-xs text-gray-400">
                          Audience: {result.audience.join(", ")}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MedSearchBar;
