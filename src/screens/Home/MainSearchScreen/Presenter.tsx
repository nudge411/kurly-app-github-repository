import { useCallback, memo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import typography from "@/constants/typography";
import { BaseText } from "@/components/atoms";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useResponsiveSize } from "@/hooks";

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
  const { hp, wp } = useResponsiveSize();
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

  console.log(hp(100));
  const renderItem = useCallback(({ item }) => <RepoItem item={item} />, []);
  const ListFooterComponent = useCallback(
    () =>
      isFetchingNextPage ? (
        <Text style={styles.loading}>Loading more...</Text>
      ) : null,
    [isFetchingNextPage]
  );
  return (
    <Wrapper>
      <TitleWrapper>
        <BaseText ft={"titleXXXL900"}>검색</BaseText>
      </TitleWrapper>
      <SearchBarWrapper>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Search repositories..."
          returnKeyType="search"
          onSubmitEditing={handleSearchSubmit}
        />
        <Ionicons name="search" size={24} color="black" />
      </SearchBarWrapper>
      <Text>{totalCount}</Text>
      {status === "pending" ? (
        <View>
          <BaseText ft={"titleXXXL900"}>Loading...</BaseText>
        </View>
      ) : status === "error" ? (
        <View>
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
            <View>
              <Text>No repositories found</Text>
            </View>
          }
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
  /* border: 1px solid red; */
`;

const TitleWrapper = styled.View`
  padding: 16px;
  align-items: center;
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
  border: 1px solid red;
  background-color: #f0f0f0;
`;
