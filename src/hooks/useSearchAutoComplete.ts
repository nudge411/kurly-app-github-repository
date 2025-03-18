import { SearchHistoryItem } from "@/store/slices/searchSlice";
import { useMemo } from "react";

function useSearchAutoComplete(
  searchQuery: string,
  searchHistory: SearchHistoryItem[]
) {
  const autoCompleteResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchHistory
      .filter((item) =>
        item.query.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [searchQuery, searchHistory]);

  return autoCompleteResults;
}

export default useSearchAutoComplete;
