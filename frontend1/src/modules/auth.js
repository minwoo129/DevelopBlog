import { handleActions } from "redux-actions";
import produce from "immer";
// ********************************* state초기화 ********************************
const initialState = {
  login: {
    email: "",
    pwd: "",
  },
  join: {
    email: "",
    pwd: "",
    pwdCheck: "",
    name: "",
    isAdmin: false,
    adminPwd: "",
  },
};

// ********************************** 액션 정의 **********************************
//  비동기 액션일 때는 _SUCCESS, _ERROR 추가
// ******************************************************************************
const CHANGE_FIELD = "auth/CHANGE_FIELD";

// *********************************** thunk ************************************
//  비동기 액션일 때는 createPromiseThunk 호출, 아니면 그냥 action(object) 리턴
// ******************************************************************************
export const changeField = (value) => {
  return { type: CHANGE_FIELD, payload: value };
};

// *********************************** reducer ***********************************
export default handleActions(
  {
    // CHANGE_FIELD ////////////////////////////////////////////////////
    [CHANGE_FIELD]: (state, { payload: result }) => {
      const { form, key, value } = result;

      const newState = {
        ...state,
        [form]: {
          ...state[form],
          [key]: value,
        },
      };

      return newState;
    },
  },
  initialState
);
