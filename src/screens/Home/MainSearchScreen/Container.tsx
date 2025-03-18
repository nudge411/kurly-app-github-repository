import { useCallback, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { githubApi } from "@/api/endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { useDebounce } from "@/hooks";
import Presenter from "./Presenter";
import { useSearchAutoComplete } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/types/navigation";

export default function Container() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<"MainSearchScreen">>();
  const searchHistory = useAppSelector((state) => state.search.history);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryKey, setQueryKey] = useState<string>("");
  const [inputMode, setInputMode] = useState<boolean>(false);
  const autoCompleteResults = useSearchAutoComplete(searchQuery, searchHistory);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["repositories", queryKey],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await githubApi.searchRepositories({
        q: searchQuery,
        page: pageParam,
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length === 30 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: queryKey.length > 0,
  });

  const { repositories, totalCount } = useMemo(() => {
    if (!data) return { repositories: [], totalCount: "0" };
    return {
      repositories: data.pages.flatMap((page) => page.items),
      totalCount: data.pages[0]?.total_count.toLocaleString() || "0",
    };
  }, [data]);

  const handleSearchChange = useCallback((query?: string) => {
    if (!query) setQueryKey("");
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = useCallback(
    (itemQuery?: string) => {
      const finalQuery = (itemQuery || searchQuery).trim();
      if (finalQuery) {
        setSearchQuery(finalQuery);
        setQueryKey(finalQuery);
        dispatch({ type: "search/addSearchHistory", payload: finalQuery });
      }
      setInputMode(false);
    },
    [searchQuery]
  );

  const handleClearHistory = useCallback(() => {
    dispatch({ type: "search/clearSearchHistory" });
  }, []);

  const removeHistoryItem = useCallback((itemQuery: string) => {
    dispatch({ type: "search/removeSearchHistory", payload: itemQuery });
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePressItem = useCallback((uri: string, title: string) => {
    navigation.navigate("WebViewScreen", { uri, title });
  }, []);

  const handleCancel = useCallback(() => {
    handleSearchChange("");
    setInputMode(false);
  }, []);

  return (
    <Presenter
      isFetchingNextPage={isFetchingNextPage}
      searchQuery={searchQuery}
      setInputMode={setInputMode}
      inputMode={inputMode}
      handleSearchChange={handleSearchChange}
      handleSearchSubmit={handleSearchSubmit}
      handleCancel={handleCancel}
      totalCount={totalCount}
      error={error}
      repositories={repositories}
      handleEndReached={handleEndReached}
      searchHistory={searchHistory}
      handleClearHistory={handleClearHistory}
      handlePressItem={handlePressItem}
      removeHistoryItem={removeHistoryItem}
      autoCompleteResults={autoCompleteResults}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
    />
  );
}
