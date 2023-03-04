import {
  ChangeEvent,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

export type pageEnableType = "loginForm" | "joinForm";

export type uploadFileMethodParams = {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  adminPwd: string;
  nickname: string;
  imageFile: File | Blob | null;
};

export type joinMethodParams = {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  adminPwd: string;
  nickname: string;
  profileImgIdx: number | null;
};

export const textMap = {
  loginForm: "로그인",
  joinForm: "회원가입",
};
// ================================= Component Prop Types ===============================
export interface AuthPageProps extends HTMLAttributes<HTMLDivElement> {}

export interface AuthTemplateProps extends HTMLAttributes<HTMLDivElement> {}

export interface AuthFormProps extends StyledImageInputCommonProps {
  formType: "loginForm" | "joinForm";
  form?: {
    email: string;
    pwd: string;
    pwdCheck?: string;
    name?: string;
    isAdmin?: boolean;
    adminPwd?: string;
    nickname?: string;
    imageFile?: File | null;
  };
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onCheckAdmin?(value: boolean): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
}

export interface StyledImageInputProps
  extends HTMLAttributes<HTMLDivElement>,
    StyledImageInputCommonProps {}

export interface StyledInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

interface StyledImageInputCommonProps {
  imgSrc: any;
  setImgSrc(value: any): void;
  onChangeImg: onChangeImg;
}

export interface AuthFormFooterProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}
// ====================================== Function Call Signitures ==============================================
export type onChange = (e: ChangeEvent<HTMLInputElement>) => void;
export type onChangeImg = (data: File | Blob) => void;
export type onCheckAdmin = (value: boolean) => void;
export type onSubmit = (e: FormEvent<HTMLFormElement>) => Promise<void>;
export type __uploadImageFile = (
  props: uploadFileMethodParams
) => Promise<void>;
export type _join = (props: joinMethodParams) => Promise<void>;
