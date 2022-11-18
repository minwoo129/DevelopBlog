import React, { FC } from "react";
import styled from "styled-components";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import "./CheckAdminSection.scss";
import classNames from "classnames";
import palette from "../../lib/styles/palette";

type CheckAdminSectionProps = {
  checked: boolean;
  onClick(value: boolean): void;
};

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  flex: 1;
  width: auto;
  margin-left: 0.25rem;
  $:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;

const CheckAdminSection: FC<CheckAdminSectionProps> = ({
  checked,
  onClick,
}) => {
  return (
    <div className="checkAdminSection">
      <div
        className={classNames("checkbox", { checked })}
        onClick={(e) => onClick(!checked)}
      >
        <div className="text">관리자인가요?</div>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </div>
      {checked && <StyledInput placeholder="관리자 인증 비밀번호" />}
    </div>
  );
};

export default CheckAdminSection;
