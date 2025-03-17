import { useCallback, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { githubApi } from "@/api/endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks";
import Presenter from "./Presenter";

export default function Container() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state) => state.search.history);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["repositories", debouncedQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await githubApi.searchRepositories({
        q: debouncedQuery,
        page: pageParam,
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length === 30 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    // enabled: debouncedQuery.length > 0,
    enabled: false,
  });

  const { repositories, totalCount } = useMemo(() => {
    if (!data) return { repositories: [], totalCount: "0" };
    return {
      repositories: data.pages.flatMap((page) => page.items),
      totalCount: data.pages[0]?.total_count.toLocaleString() || "0",
    };
  }, [data]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      dispatch({ type: "search/addSearchHistory", payload: searchQuery });
      // refetch();
    }
  };

  const handleClearHistory = () => {
    dispatch({ type: "search/clearSearchHistory" });
  };

  const removeHistoryItem = (itemQuery: string) => {
    dispatch({ type: "search/removeSearchHistory", payload: itemQuery });
  };

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Presenter
      isFetchingNextPage={isFetchingNextPage}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={handleSearchSubmit}
      totalCount={totalCount}
      error={error}
      repositories={repositories}
      handleEndReached={handleEndReached}
      status={status}
      searchHistory={searchHistory}
      handleClearHistory={handleClearHistory}
      removeHistoryItem={removeHistoryItem}
    />
  );
}
