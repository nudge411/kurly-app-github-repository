import { useCallback, memo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

interface Props {
  isFetchingNextPage: boolean;
  searchQuery: string;
  handleSearchChange: (text: string) => void;
  handleSearchSubmit: () => void;
  totalCount: number;
  error: any;
  repositories: any[];
  handleEndReached: () => void;
  status: string;
}

const RepoItem = memo(({ item }: any) => (
  <View>
    <Text>{item.name}</Text>
    <Text numberOfLines={2}>{item.description}</Text>
    <Text>⭐ {item.stargazers_count}</Text>
  </View>
));

export default function Presenter(props: Props) {
  const {
    isFetchingNextPage,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    totalCount,
    error,
    repositories,
    handleEndReached,
    status,
  } = props;

  const renderItem = useCallback(({ item }) => <RepoItem item={item} />, []);
  const ListFooterComponent = useCallback(
    () =>
      isFetchingNextPage ? (
        <Text style={styles.loading}>Loading more...</Text>
      ) : null,
    [isFetchingNextPage]
  );
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Search repositories..."
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchSubmit}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <Text>{totalCount}</Text>
        {status === "pending" ? (
          <View style={styles.loadingContainer}>
            <Text>Searching...</Text>
          </View>
        ) : status === "error" ? (
          <View style={styles.errorContainer}>
            <Text>Error: {error.message}</Text>
          </View>
        ) : (
          <FlashList
            data={repositories}
            renderItem={renderItem}
            estimatedItemSize={90}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={ListFooterComponent}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text>No repositories found</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loading: {
    padding: 10,
    textAlign: "center",
  },
});
