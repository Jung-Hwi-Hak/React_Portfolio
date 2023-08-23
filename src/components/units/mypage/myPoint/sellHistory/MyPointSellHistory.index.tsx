import { memo } from "react";
import * as S from "../../../../commons/emotions/mypage/body.styles";
import type { IPointTransaction } from "../../../../../commons/types/generated/types";
import { getDate } from "../../../../../commons/libraries/utils";
import { useMyPointSellHistory } from "../../../../commons/hooks/customs/mypage/useMyPointSellHistory";
function MyPointAllHistory(): JSX.Element {
  const { data } = useMyPointSellHistory();
  return (
    <>
      <S.HeaderRow>
        <S.HeaderColumnDate>거래일</S.HeaderColumnDate>
        <S.HeaderColumnProduct>상품명</S.HeaderColumnProduct>
        <S.HeaderColumnHistory>거래내역</S.HeaderColumnHistory>
        <S.HeaderColumnBalance>거래 후 잔액</S.HeaderColumnBalance>
      </S.HeaderRow>
      {(data?.fetchPointTransactionsOfSelling ?? new Array(10).fill(1)).map(
        (el: IPointTransaction, index: number) => (
          <S.Row key={el._id ?? index}>
            <S.ColumnDate>{getDate(el.createdAt)}</S.ColumnDate>
            <S.ColumnProduct>{el.useditem?.name}</S.ColumnProduct>
            <S.ColumnHistory status={el.status === "구매"}>
              {el.status === "구매" ? "-" : "+"}
              {`${el.amount?.toLocaleString("ko-KR")}원`}
            </S.ColumnHistory>
            <S.ColumnBalance>{`${el.balance?.toLocaleString("ko-KR")}원`}</S.ColumnBalance>
          </S.Row>
        )
      )}
    </>
  );
}

export default memo(MyPointAllHistory);
