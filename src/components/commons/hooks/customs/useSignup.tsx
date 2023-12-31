import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupYupSchema } from "../../../units/signup/Signup.validation";
import { useModal } from "./useModal";
import { useMutationCreateUser } from "../mutations/useMutationCreateUser";
import { useCallback } from "react";
import type { UseFormRegister, FormState, UseFormHandleSubmit } from "react-hook-form";

interface IReturns {
  register: UseFormRegister<{
    userId: string;
    userPw: string;
    userName: string;
  }>;
  formState: FormState<{
    userId: string;
    userPw: string;
    userName: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      userId: string;
      userPw: string;
      userName: string;
    },
    undefined
  >;
  onClickSubmit: () => void;
}

export const useSignup = (): IReturns => {
  const { successModal, warningModal } = useModal();
  const [mutation] = useMutationCreateUser();
  const { register, formState, handleSubmit, watch } = useForm({
    resolver: yupResolver(SignupYupSchema),
    defaultValues: {
      userId: "",
      userPw: "",
      userName: "",
    },
  });

  const onClickSubmit = useCallback(() => {
    try {
      void mutation({
        variables: {
          createUserInput: {
            email: watch("userId"),
            password: watch("userPw"),
            name: watch("userName"),
          },
        },
      });
      successModal("회원가입", "회원가입이 성공했습니다.", true, "/login");
    } catch (error) {
      warningModal("회원가입", "회원가입이 실패했습니다.", true);
    }
  }, [watch]);

  return {
    register,
    formState,
    handleSubmit,
    onClickSubmit,
  };
};
