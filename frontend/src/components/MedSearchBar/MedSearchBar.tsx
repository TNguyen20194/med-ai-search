import { useState, useCallback, useEffect, useMemo } from "react";
import { Search, Mic } from "lucide-react";
import { sampleData, type SearchData } from "../../data/searchData";

const MedSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);

  //   const debounce = (func: (term: string) => void, delay: number) => {
  //     let timeoutId: ReturnType<typeof setTimeout>;

  //     return (term: string) => {
  //       clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => func(term), delay);
  //     };
  //   };

  //  const debouncedSearch = useMemo(
  //   () =>
  //     debounce((term: string) => {
  //       if (term.trim() === "") {
  //         setSearchResults([]);
  //       } else {
  //         const results = sampleData.filter((item) =>
  //           item.title.toLowerCase().includes(term.toLowerCase()),
  //         );

  //         setSearchResults(results);
  //       }
  //     }, 300),
  //   [],
  // );

  // const handleSearch = useCallback(
  //   (term: string) => {
  //     debouncedSearch(term);
  //   },
  //   [debouncedSearch],
  // );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      const results = sampleData.filter((item) => {
        const term = searchTerm.toLowerCase();

        return (
          item.title.toLowerCase().includes(term) ||
          item.condition.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          item.content?.toLowerCase().includes(term) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
          item.audience?.some((audience) =>
            audience.toLowerCase().includes(term),
          )
        );
      });
      setSearchResults(results);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const groupedResults: Record<string, SearchData[]> = {};

  searchResults.forEach((result) => {
    const category = result.category;

    if (!groupedResults[category]) {
      groupedResults[category] = [];
    }

    groupedResults[category].push(result);
  });

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4 ">
      <form
        onSubmit={(e) => e.preventDefault()}
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
          <div className="absolute right-0 top-0 mr-4 mt-3 flex items-center">
            <button type="submit" className="text-blue-500 hover:text-blue-600">
              <Search size={20} /> {""}
            </button>
          </div>
        </div>
      </form>

      {searchResults.length > 0 && (
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
                        <div className="mt-2 flex felx-wrap gap-2">
                          {result.tags.map((tag) => (
                            <span
                            key={tag}
                            className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-gray-600"
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
      )}
    </div>
  );
};

export default MedSearchBar;
