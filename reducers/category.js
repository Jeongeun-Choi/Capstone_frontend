import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  categorysLoading: false,
  categorysDone: false,
  categorysError: false,
  detailCategorysLoading: false,
  detailCategorysDone: false,
  detailCategorysError: false,

  categorys: [],
  detailCategorys: []
};

export const LOAD_CATEGORYS_REQUEST = 'LOAD_CATEGORYS_REQUEST';
export const LOAD_CATEGORYS_SUCCESS = 'LOAD_CATEGORYS_SUCCESS';
export const LOAD_CATEGORYS_FAILURE = 'LOAD_CATEGORYS_FAILURE';

export const LOAD_DETAILCATEGORYS_REQUEST = 'LOAD_DETAILCATEGORYS_REQUEST';
export const LOAD_DETAILCATEGORYS_SUCCESS = 'LOAD_DETAILCATEGORYS_SUCCESS';
export const LOAD_DETAILCATEGORYS_FAILURE = 'LOAD_DETAILCATEGORYS_FAILURE';

export const ADD_LOCATIONCATEGORY_REQUEST = 'ADD_LOCATIONCATEGORY_REQUEST';
export const ADD_LOCATIONCATEGORY_SUCCESS = 'ADD_LOCATIONCATEGORY_SUCCESS';
export const ADD_LOCATIONCATEGORY_FAILURE = 'ADD_LOCATIONCATEGORY_FAILURE';

export const loadCategorysRequestAction = createAction(LOAD_CATEGORYS_REQUEST);
export const loadCategorysSuccessAction = createAction(LOAD_CATEGORYS_SUCCESS);
export const loadCategorysFailureAction = createAction(LOAD_CATEGORYS_FAILURE);

export const loadDetailCategorysRequestAction = createAction(
  LOAD_DETAILCATEGORYS_REQUEST
);
export const loadDetailCategorysSuccessAction = createAction(
  LOAD_DETAILCATEGORYS_SUCCESS
);
export const loadDetailCategorysFailureAction = createAction(
  LOAD_DETAILCATEGORYS_FAILURE
);

export const addLocationCategoryRequestAction = createAction(
  ADD_LOCATIONCATEGORY_REQUEST
);
export const addLocationCategorySuccessAction = createAction(
  ADD_LOCATIONCATEGORY_SUCCESS
);
export const addLocationCategoryFailureAction = createAction(
  ADD_LOCATIONCATEGORY_FAILURE
);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORYS_REQUEST: {
        draft.categorysLoading = true;
        draft.categorysDone = false;
        draft.categorysError = null;
        break;
      }
      case LOAD_CATEGORYS_SUCCESS: {
        draft.categorysLoading = false;
        draft.categorysDone = true;
        draft.categorys = action.data;
        break;
      }
      case LOAD_CATEGORYS_FAILURE: {
        draft.categorysDone = false;
        draft.categorysError = action.err;
        break;
      }
      case LOAD_DETAILCATEGORYS_REQUEST: {
        draft.detailCategorysLoading = true;
        draft.detailCategorysDone = false;
        draft.detailCategorysError = null;
        break;
      }
      case LOAD_DETAILCATEGORYS_SUCCESS: {
        draft.detailCategorysLoading = false;
        draft.detailCategorysDone = true;
        draft.detailCategorys = action.data;
        break;
      }
      case LOAD_DETAILCATEGORYS_FAILURE: {
        draft.detailCategorysDone = false;
        draft.detailCategorysError = action.err;
        break;
      }
      case ADD_LOCATIONCATEGORY_REQUEST: {
        draft.categorysLoading = true;
        draft.categorysDone = false;
        draft.categorysError = null;
        break;
      }
      case ADD_LOCATIONCATEGORY_SUCCESS: {
        draft.categorysLoading = false;
        draft.categorysDone = true;
        break;
      }
      case ADD_LOCATIONCATEGORY_FAILURE: {
        draft.categorysDone = false;
        draft.categorysError = action.err;
        break;
      }
    }
  });
};

export default reducer;
