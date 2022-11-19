import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  useMemo,
} from "react";
import styled from "styled-components";
import qs from "qs";
import { useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";

const AuthTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid green;
  background: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

interface AuthTemplateProps extends HTMLAttributes<HTMLDivElement> {}
type pageEnableType = "login" | "join";

const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("location: ", location);
  console.log("query: ", query);
  const type = useMemo((): pageEnableType => {
    let type: pageEnableType = "login";
    if (location.search.indexOf("login")) type = "login";
    else type = "join";
    return type;
  }, [location]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {};
  const onCheckAdmin = (value: boolean) => {};
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {};
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <AuthForm
          formType={type}
          onChange={onChange}
          onCheckAdmin={onCheckAdmin}
          onSubmit={onSubmit}
        />
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
