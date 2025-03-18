import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { BaseText } from "@/components/atoms";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "@/constants";
import { hp, wp, sp } from "@/utils/responsive";
import { SearchHistoryItem } from "@/store/slices/searchSlice";
import { Image } from "expo-image";
import { GitHubRepository } from "@/api/endpoints/github/type";

interface Props {
  isFetchingNextPage: boolean;
  searchQuery: string;
  setInputMode: (on: boolean) => void;
  inputMode: boolean;
  handleSearchChange: (text: string) => void;
  handleSearchSubmit: (itemQuery?: string) => void;
  handleCancel: () => void;
  totalCount: string;
  error: Error;
  repositories: GitHubRepository[];
  handleEndReached: () => void;
  searchHistory: SearchHistoryItem[];
  handleClearHistory: () => void;
  handlePressItem: (uri: string, title: string) => void;
  removeHistoryItem: (itemQuery: string) => void;
  autoCompleteResults: SearchHistoryItem[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function Presenter(props: Props) {
  const {
    isFetchingNextPage,
    searchQuery,
    setInputMode,
    inputMode,
    handleSearchChange,
    handleSearchSubmit,
    handleCancel,
    totalCount,
    error,
    repositories,
    handleEndReached,
    searchHistory,
    handleClearHistory,
    handlePressItem,
    removeHistoryItem,
    autoCompleteResults,
    isLoading,
    isError,
    isSuccess,
  } = props;

  const RepoItem = ({ item }: { item: GitHubRepository }) => (
    <RepoItemWrapper
      key={item.id}
      onPress={() => handlePressItem(item.html_url, item.name)}
    >
      <AvatarImage
        source={{ uri: item.owner.avatar_url }}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />
      <RepoItemContent>
        <BaseText ft="titleXL700">{item.name}</BaseText>
        <BaseText ft="bodyS400" color={colors.text_80}>
          {item.owner.login}
        </BaseText>
      </RepoItemContent>
    </RepoItemWrapper>
  );

  const renderItem = useCallback(
    ({ item }: { item: GitHubRepository }) => <RepoItem item={item} />,
    []
  );

  const ListFooterComponent = useCallback(() => {
    return isFetchingNextPage ? (
      <View style={{ paddingVertical: hp(20) }}>
        <ActivityIndicator size="large" color={colors.primary_50} />
      </View>
    ) : null;
  }, [isFetchingNextPage]);

  const renderHistoryItem = (item, showCloseButton = true) => (
    <HistoryItem
      key={`${item.query}-${item.timestamp}`}
      onPress={() => handleSearchSubmit(item.query)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons size={20} name="time-outline" color={colors.gray_30} />
        <BaseText style={{ marginLeft: 4 }} ft="bodyL400">
          {item.query}
        </BaseText>
      </View>

      {showCloseButton ? (
        <RemoveItemButton onPress={() => removeHistoryItem(item.query)}>
          <Ionicons name="close" size={16} color={colors.gray_60} />
        </RemoveItemButton>
      ) : (
        <DateWrapper onPress={() => removeHistoryItem(item.query)}>
          <BaseText ft="bodyL400" color={colors.text_80}>
            {item.formattedDate}
          </BaseText>
        </DateWrapper>
      )}
    </HistoryItem>
  );

  const renderContentByStatus = useCallback(() => {
    const isExistSearchHistory = searchHistory.length > 0;
    const showAutoComplete = searchQuery && isExistSearchHistory;

    if (!isExistSearchHistory) {
      return (
        <HistoryHeader>
          <BaseText ft="bodyL400">최근 검색어가 없습니다</BaseText>
        </HistoryHeader>
      );
    }

    if (showAutoComplete) {
      return (
        <>
          <HistoryHeader />
          {autoCompleteResults.map((item) => renderHistoryItem(item, false))}
        </>
      );
    }

    return (
      <>
        <HistoryHeader>
          <BaseText ft="bodyL400">최근검색</BaseText>
          <HistoryClearButton onPress={() => handleClearHistory}>
            <BaseText ft="bodyS400" color={colors.text_70}>
              전체 삭제
            </BaseText>
          </HistoryClearButton>
        </HistoryHeader>
        {searchHistory.map((item) => renderHistoryItem(item, true))}
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <BaseText ft="bodyM400">최근 10건의 검색어만 보여집니다</BaseText>
        </View>
      </>
    );
  }, [searchQuery, searchHistory, autoCompleteResults]);

  const renderLoadingView = useCallback(
    () => (
      <CommonWrapper>
        <ActivityIndicator size="large" color={colors.primary_50} />
      </CommonWrapper>
    ),
    []
  );

  const renderErrorView = useCallback(
    () => (
      <CommonWrapper>
        <BaseText ft="bodyL400">잠시후 다시 시도해주세요</BaseText>
        <BaseText ft="bodyM400">{error?.message}</BaseText>
      </CommonWrapper>
    ),
    [error]
  );

  const renderSearchBar = useCallback(
    () =>
      inputMode ? (
        <SearchBarWrapper>
          <SearchBar>
            <Ionicons name="search" size={24} color={colors.primary_50} />
            <SearchInput
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.nativeEvent.text)}
              style={{ fontFamily: "Pretendard-Regular", fontSize: 16 }}
              placeholder={"검색어를 입력해주세요"}
              blurOnSubmit={true}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={() => handleSearchSubmit()}
              returnKeyType="search"
              autoFocus
            />
            {searchQuery && (
              <ClearButton onPress={() => handleSearchChange("")}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={colors.gray_60}
                />
              </ClearButton>
            )}
          </SearchBar>
          <CancelButton onPress={handleCancel}>
            <BaseText ft={"bodyL700"} color={colors.primary_50}>
              취소
            </BaseText>
          </CancelButton>
        </SearchBarWrapper>
      ) : (
        <SearchBarButton onPress={() => setInputMode(true)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="search" size={24} color={colors.primary_50} />
            <BaseText
              style={{ marginLeft: wp(4) }}
              ft={"titleL400"}
              color={colors.text_80}
            >
              {searchQuery || "검색어를 입력해주세요"}
            </BaseText>
          </View>
          {searchQuery && (
            <ClearButton onPress={() => handleSearchChange("")}>
              <Ionicons name="close-circle" size={24} color={colors.gray_60} />
            </ClearButton>
          )}
        </SearchBarButton>
      ),
    [searchQuery, handleSearchSubmit, handleSearchChange, inputMode]
  );

  const renderResultView = useCallback(
    () => (
      <RepoWrapper>
        <CountWrapper>
          <BaseText ft={"bodyM700"}>검색 결과 </BaseText>
          <BaseText ft={"bodyM400"} color={colors.text_80}>
            {totalCount}개 저장소
          </BaseText>
        </CountWrapper>
        <FlashList
          data={repositories}
          renderItem={renderItem}
          estimatedItemSize={hp(80)}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooterComponent}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <CommonWrapper>
              <BaseText ft={"bodyM400"}>검색 결과가 없습니다</BaseText>
            </CommonWrapper>
          }
        />
      </RepoWrapper>
    ),
    [totalCount, repositories, isFetchingNextPage]
  );

  return (
    <Wrapper>
      {renderSearchBar()}
      {isLoading ? (
        renderLoadingView()
      ) : isError ? (
        renderErrorView()
      ) : isSuccess ? (
        renderResultView()
      ) : (
        <HistoryWrapper bounces={false} overScrollMode="never">
          {renderContentByStatus()}
        </HistoryWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  padding-top: ${hp(20)}px;
  background-color: ${colors.white};
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 ${sp(20)}px;
`;

const SearchBarButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin: 0px ${sp(20)}px;
  padding: ${sp(10)}px ${sp(18)}px;
  border-radius: 100px;
  background-color: ${colors.gray_10};
  border: 1px solid ${colors.gray_40};

  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 4;
`;

const SearchBar = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: ${sp(10)}px ${sp(18)}px;
  border-radius: 100px;
  background-color: ${colors.gray_10};
  border: 1px solid ${colors.gray_40};

  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 4;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: ${wp(4)}px;
  padding: 0;
`;

const CancelButton = styled.TouchableOpacity`
  padding: ${sp(10)}px;
`;

const ClearButton = styled.TouchableOpacity``;

const CountWrapper = styled.View`
  flex-direction: row;
  margin: ${20}px;
`;

const HistoryWrapper = styled.ScrollView`
  padding: 0 ${sp(20)}px;
`;

const HistoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${sp(16)}px;
`;

const HistoryClearButton = styled.TouchableOpacity``;

const HistoryItem = styled.TouchableOpacity`
  height: ${hp(54)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RemoveItemButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: ${sp(16)}px;
`;

const DateWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const RepoWrapper = styled.View`
  flex: 1;
`;

const RepoItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  height: ${hp(80)}px;
  padding: ${sp(12)}px ${sp(20)}px;
  justify-content: flex-start;
  align-items: center;
`;

const AvatarImage = styled(Image)`
  width: ${sp(50)}px;
  height: ${sp(50)}px;
  border-radius: ${sp(20)}px;
  border: 1px solid ${colors.gray_20};
  margin-right: ${sp(12)}px;
`;

const RepoItemContent = styled.View``;
const CommonWrapper = styled.View`
  align-items: center;
  margin-top: ${hp(100)}px;
`;
