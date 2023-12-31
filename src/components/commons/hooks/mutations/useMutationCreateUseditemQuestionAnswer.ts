import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USEDITEM_QUESTION_ANSWER = gql`
  mutation createUseditemQuestionAnswer(
    $createUseditemQuestionAnswerInput: CreateUseditemQuestionAnswerInput!
    $useditemQuestionId: ID!
  ) {
    createUseditemQuestionAnswer(
      createUseditemQuestionAnswerInput: $createUseditemQuestionAnswerInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      createdAt
      user {
        _id
        name
        picture
      }
    }
  }
`;

export const useMutationCreateUseditemQuestionAnswer = () => {
  const mutation = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USEDITEM_QUESTION_ANSWER);
  return mutation;
};
