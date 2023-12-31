import InfiniteScroll from "react-infinite-scroller";
import CommentsBoardView from "../../../src/components/commons/comments/board/view/CommentsBoardView.index";
import CommonetsBoardWrite from "../../../src/components/commons/comments/board/wirte/CommentsBoardWrite.index";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import { useQueryIdChecker } from "../../../src/components/commons/hooks/customs/useQueryIdChecker";
import { useQueryFetchBoardComments } from "../../../src/components/commons/hooks/queries/useQueryFetchBoardComments";
import { memo } from "react";

function BoardDetailPage(): JSX.Element {
  const { id } = useQueryIdChecker("boardId");
  const { data, fetchMore } = useQueryFetchBoardComments({ boardId: id });

  const onLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        };
      },
    });
  };

  return (
    <>
      <BoardDetail />
      <CommonetsBoardWrite>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchBoardComments.map((el) => <CommentsBoardView key={el._id} el={el} />) ?? (
            <></>
          )}
        </InfiniteScroll>
      </CommonetsBoardWrite>
    </>
  );
}

export default memo(BoardDetailPage);
