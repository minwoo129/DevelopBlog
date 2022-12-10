export type ChangeFieldParam = {
  form: "loginForm" | "joinForm";
  key: string;
  value: string | boolean | File;
};

export type InitializeByTokenParam = {
  name: string;
  email: string;
  token: string;
  id: string;
};
