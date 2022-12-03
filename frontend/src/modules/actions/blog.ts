export const SET_ADDED_IMAGE_IDS = "blog/SET_ADDED_IMAGE_IDS";
export const CLEAR_ADDED_IMAGE_IDS = "blog/CLEAR_ADDED_IMAGE_IDS";
// ********************************** Action *******************************************e
export const setAddedImageIds = (id: number) => {
  return { type: SET_ADDED_IMAGE_IDS, payload: id };
};

export const clearAddedImageIds = () => {
  return { type: CLEAR_ADDED_IMAGE_IDS, payload: null };
};
