import { gql, useMutation } from "@apollo/client";
import type { IMutation } from "../../../../commons/types/generated/types";

const DELETE_USEDITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

export const useMutationDeleteUseditemQuestion = () => {
  const mutation = useMutation<Pick<IMutation, "deleteUseditemQuestion">>(DELETE_USEDITEM_QUESTION);
  return mutation;
};
