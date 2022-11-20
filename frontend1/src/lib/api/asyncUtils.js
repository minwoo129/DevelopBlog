export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (param) => async (dispatch) => {
    // 요청 시작
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일시킵니다.
      const response = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload: {
          param,
          result: response.data,
        },
      }); // 성공
      return response.data;
    } catch (e) {
      console.log("createPromiseThunk error", e);
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
      throw e;
    }
  };
};
