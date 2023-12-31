import { memo } from "react";
import * as S from "./SearchBar01.styles";
import type { ISearchbars01Props } from "./SearchBar01.types";
import { useSearchBar01 } from "../../hooks/customs/useSearchBar01";

function SearchBar01(props: ISearchbars01Props): JSX.Element {
  const { onChangeKeyword, refetchSearch, onChangeDate } = useSearchBar01({
    searchKeyword: props.searchKeyword,
    refetch: props.refetch,
    refetchCount: props.refetchCount,
    setActivePage: props.setActivePage ?? undefined,
    setStartPage: props.setStartPage ?? undefined,
    setSearchKeyword: props.setSearchKeyword,
    searchDate: props.searchDate ?? undefined,
    setSearchDate: props.setSearchDate ?? undefined,
  });

  return (
    <S.Wrapper>
      <S.SearchLabel htmlFor="search-input-text">
        <S.SearchInputWrapper>
          {/* <S.SearchText>검색: </S.SearchText> */}
          <S.SearchIcon src="./images/search.svg" />

          <S.SearchInput
            id="search-input-text"
            placeholder="제목을  입력해 주세요."
            onChange={onChangeKeyword}
            onKeyPress={refetchSearch}
          />
        </S.SearchInputWrapper>
      </S.SearchLabel>
      <S.Date
        className="dateRangePicker"
        dropdownClassName="dateRangePicker"
        onChange={onChangeDate}
        format={"YYYY-MM-DD"}
      />
      <S.Button onClick={refetchSearch}>검색하기</S.Button>
    </S.Wrapper>
  );
}
export default memo(SearchBar01);
