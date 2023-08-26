import { useQuery, gql } from "@apollo/client";
import type { IQuery, IQueryFetchUseditemsArgs } from "../../../../commons/types/generated/types";

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      createdAt
      useditemAddress {
        zipcode
      }
      buyer {
        _id
        name
      }
      seller {
        _id
        name
        picture
      }
      soldAt
    }
  }
`;

export const useQueryFetchUsedItems = (isSoldout: boolean) => {
  const result = useQuery<Pick<IQuery, "fetchUseditems">, IQueryFetchUseditemsArgs>(
    FETCH_USED_ITEMS,
    {
      variables: {
        isSoldout,
      },
    }
  );
  return result;
};
