import { useCallback, memo } from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { BaseText } from "@/components/atoms";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors, typography } from "@/constants";
import { hp, wp, sp } from "@/utils/responsive";
interface Props {
  isFetchingNextPage: boolean;
  searchQuery: string;
  handleSearchChange: (text: string) => void;
  handleSearchSubmit: () => void;
  totalCount: string;
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
    () => (isFetchingNextPage ? <Text>Loading more...</Text> : null),
    [isFetchingNextPage]
  );

  return (
    <Wrapper>
      <TitleWrapper>
        <BaseText ft={"titleXXL900"}>검색</BaseText>
      </TitleWrapper>
      <SearchBarWrapper>
        <SearchBar>
          <Ionicons name="search" size={24} color={"black"} />
          <SearchInput
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.nativeEvent.text)}
            style={{ fontFamily: "Pretendard-Regular", fontSize: 16 }}
            placeholder={"검색어를 입력해주세요."}
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={() => handleSearchSubmit()}
            returnKeyType="search"
          />
          {searchQuery && (
            <ClearButton onPress={() => handleSearchChange("")}>
              <Ionicons name="close-circle" size={24} color={colors.gray_60} />
            </ClearButton>
          )}
        </SearchBar>
        <CancelButton>
          <BaseText ft={"bodyM400"} color={colors.primary_50}>
            취소
          </BaseText>
        </CancelButton>
      </SearchBarWrapper>
      <CountWrapper>
        <BaseText ft={"bodyM700"}>검색 결과 </BaseText>
        <BaseText ft={"bodyM400"} color={colors.text_80}>
          {totalCount}개 저장소
        </BaseText>
      </CountWrapper>
      {/* {status === "pending" ? (
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
      )} */}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  padding: ${sp(20)}px;
`;

const TitleWrapper = styled.View`
  padding: ${sp(16)}px;
  align-items: center;
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${sp(10)}px ${sp(18)}px;
  border-radius: 100px;
  background-color: ${colors.gray_10};
  border: 1px solid ${colors.gray_40};
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: ${hp(30)}px;
  margin-left: ${wp(4)}px;
`;

const CancelButton = styled.TouchableOpacity`
  padding: ${sp(10)}px;
`;

const ClearButton = styled.TouchableOpacity``;

const CountWrapper = styled.View`
  flex-direction: row;
  margin: ${10}px 0;
`;
