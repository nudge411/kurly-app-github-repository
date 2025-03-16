import { useCallback, useState, useMemo } from "react";
import { decrement, increment } from "@/store/slices/counterSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { githubApi } from "@/api/endpoints";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks";
import Presenter from "./Presenter";

export default function Container() {
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
    enabled: debouncedQuery.length > 0,
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
    refetch();
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
    />
  );
}
