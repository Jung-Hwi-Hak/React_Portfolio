import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { yupSchema } from "../../../comments/product/answer/AnswerProductWrite.validation";
import { useCallback } from "react";
import { useMutationCreateUseditemQuestionAnswer } from "../../mutations/useMutationCreateUseditemQuestionAnswer";
import { useMutationDeleteUseditemQuestionAnswer } from "../../mutations/useMutationDeleteUseditemQuestionAnswer";
import { useMutationUpdateUseditemQuestionAnswer } from "../../mutations/useMutationUpdateUseditemQuestionAnswer";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "../../queries/useQueryFetchUseditemQuestionAnswers";
import type { UseFormRegister, UseFormHandleSubmit, UseFormWatch } from "react-hook-form";
import { useModal } from "../useModal";
interface ICreateUseditemQuestionAnswerInput {
  contents: string;
}
interface IUpdateUseditemQuestionAnswerInput {
  contents: string;
}

interface IUesProductAnswerArgs {
  contents?: string | undefined;
  useditemQuestionId?: string;
  useditemQuestionAnswerId?: string;
  onToggleEdit?: () => void;
  onToggleAnswer?: () => void;
}
interface IUseProductAnswerReturns {
  onUpdateAnswer: (data: any) => Promise<void>;
  onDeleteAnswer: (useditemQuestionAnswerId: any) => () => Promise<void>;
  onCreateAnswer: (data: any) => Promise<void>;
  register: UseFormRegister<{
    contents: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      contents: string;
    },
    undefined
  >;
  watch: UseFormWatch<{
    contents: string;
  }>;
}

export const useProductAnswer = (args: IUesProductAnswerArgs): IUseProductAnswerReturns => {
  const [createProductAnswer] = useMutationCreateUseditemQuestionAnswer();
  const [deleteProductAnswer] = useMutationDeleteUseditemQuestionAnswer();
  const [updateProductAnswer] = useMutationUpdateUseditemQuestionAnswer();
  const { warningModal } = useModal();
  const { register, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(yupSchema),
    mode: "onChange",
    defaultValues: {
      contents: args.contents ?? "",
    },
  });

  const onCreateAnswer = useCallback(async (data: any) => {
    try {
      const createUseditemQuestionAnswerInput: ICreateUseditemQuestionAnswerInput = {
        contents: data.contents,
      };
      if (!args.useditemQuestionId) return;
      await createProductAnswer({
        variables: {
          createUseditemQuestionAnswerInput,
          useditemQuestionId: args.useditemQuestionId,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchUseditemQuestionAnswers: (prev) => {
                return [data?.createUseditemQuestionAnswer, ...prev];
              },
            },
          });
        },
      });
      reset();
      if (args.onToggleAnswer === undefined) return;
      args.onToggleAnswer();
    } catch (error) {
      if (error instanceof Error) warningModal("댓글 작성 오류", error.message, true);
    }
  }, []);

  const onDeleteAnswer = useCallback(
    (useditemQuestionAnswerId) => async () => {
      try {
        await deleteProductAnswer({
          variables: {
            useditemQuestionAnswerId,
          },
          update(cache, { data }) {
            cache.modify({
              fields: {
                fetchUseditemQuestionAnswers: (prev, { readField }) => {
                  const deletedId = data?.deleteUseditemQuestionAnswer;
                  const filteredPrev = prev.filter((el: any) => readField("_id", el) !== deletedId);
                  return filteredPrev;
                },
              },
            });
          },
        });
      } catch (error) {
        if (error instanceof Error) warningModal("댓글 삭제 오류", error.message, true);
      }
    },
    []
  );

  const onUpdateAnswer = useCallback(async (data: any) => {
    try {
      const updateUseditemQuestionAnswerInput: IUpdateUseditemQuestionAnswerInput = {
        contents: data.contents,
      };
      if (args.useditemQuestionAnswerId === undefined) return;

      await updateProductAnswer({
        variables: {
          updateUseditemQuestionAnswerInput,
          useditemQuestionAnswerId: args.useditemQuestionAnswerId,
        },
        update(cache, { data }) {
          cache.writeQuery({
            query: FETCH_USEDITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: args.useditemQuestionId },
            data: {
              fetchUseditemQuestionAnswers: {
                _id: args.useditemQuestionAnswerId,
                contents: data?.updateUseditemQuestionAnswer.contents,
              },
            },
          });
        },
      });
      if (args.onToggleEdit === undefined) return;
      args.onToggleEdit();
    } catch (error) {
      if (error instanceof Error) warningModal("댓글 수정 오류", error.message, true);
    }
  }, []);

  return {
    onUpdateAnswer,
    onDeleteAnswer,
    onCreateAnswer,
    register,
    handleSubmit,
    watch,
  };
};
