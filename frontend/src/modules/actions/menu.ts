export const SET_MENU_VISIBLE = "menu/SET_MENU_VISIBLE";

export const SET_MENU_OPEN = "menu/SET_MENU_OPEN";
// ********************************** Action *******************************************
export const setMenuVisible = (value: boolean) => {
  return { type: SET_MENU_VISIBLE, payload: value };
};

export const setMenuOpen = (value: boolean) => {
  return { type: SET_MENU_OPEN, payload: value };
};
