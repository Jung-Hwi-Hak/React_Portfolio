import { useMoveToPage } from "../../../commons/hooks/customs/useMoveToPage";
import BoardDetailHeader from "./header/ProductDetailHeader";
import BoardDetailBody from "./body/ProductDetailBody";
import BoardDetailFooter from "./footer/ProductDetailFooter";
import styled from "@emotion/styled";
import { memo, useEffect } from "react";
import { useQueryFetchUsedItem } from "../../../commons/hooks/queries/useQueryFetchUseditem";
import { useQueryIdChecker } from "../../../commons/hooks/customs/useQueryIdChecker";
import type { IQuery } from "../../../../commons/types/generated/types";

const CardWrapper = styled.div`
  border: 1px solid black;
  min-width: 1200px;
  max-width: 1200px;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
  margin-bottom: 50px;
`;

function ProductDetail(): JSX.Element {
  const { id } = useQueryIdChecker("productId");
  const { data } = useQueryFetchUsedItem(id);
  const { onClickMoveToPage } = useMoveToPage();
  console.log(data);
  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") ?? "[]");
    const temp = baskets.filter(
      (el: Pick<IQuery, "fetchUseditem">) => el.fetchUseditem?._id === id
    );
    if (temp.length > 0) {
      return;
    }
    if (data === undefined) return;
    if (baskets.length === 2) {
      baskets.shift();
    }

    baskets.push(data);

    localStorage.setItem("baskets", JSON.stringify(baskets));
  }, [data]);

  return (
    <>
      <CardWrapper>
        <BoardDetailHeader data={data} />
        <BoardDetailBody data={data} />
        <BoardDetailFooter data={data} onClickMoveToPage={onClickMoveToPage} />
      </CardWrapper>
    </>
  );
}
export default memo(ProductDetail);
