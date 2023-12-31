import { memo } from "react";

import * as S from "./MyProductsFooter.styles";
import type { IProductListFooterProps } from "./MyProductsFooter.types";

function MyPageFooter(props: IProductListFooterProps): JSX.Element {
  return <S.Footer>{props.children}</S.Footer>;
}
export default memo(MyPageFooter);
