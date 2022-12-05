export const SET_SEARCHBAR_VISIBLE = "appInfo/SET_SEARCHBAR_VISIBLE";
export const SET_SEARCH_TXT = "appInfo/SET_SEARCH_TXT";

// ********************************** Action *******************************************
export const setSearchbarVisible = (value: boolean) => {
  return { type: SET_SEARCHBAR_VISIBLE, payload: value };
};

export const setSearchTxt = (value: string) => {
  return { type: SET_SEARCH_TXT, payload: value };
};
