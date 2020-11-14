import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  categorysLoading: false,
  categorysDone: false,
  categorysError: false,
  detailCategorysLoading: false,
  detailCategorysDone: false,
  detailCategorysError: false,
  category: [],
  categories: undefined,
};

export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

export const LOAD_DETAILCATEGORY_REQUEST = 'LOAD_DETAILCATEGORY_REQUEST';
export const LOAD_DETAILCATEGORY_SUCCESS = 'LOAD_DETAILCATEGORY_SUCCESS';
export const LOAD_DETAILCATEGORY_FAILURE = 'LOAD_DETAILCATEGORY_FAILURE';

export const LOAD_CATEGORYS_REQUEST = 'LOAD_CATEGORYS_REQUEST';
export const LOAD_CATEGORYS_SUCCESS = 'LOAD_CATEGORYS_SUCCESS';
export const LOAD_CATEGORYS_FAILURE = 'LOAD_CATEGORYS_FAILURE';

export const loadCategoryRequestAction = createAction(LOAD_CATEGORY_REQUEST);
export const loadCategorySuccessAction = createAction(LOAD_CATEGORY_SUCCESS);
export const loadCategoryFailureAction = createAction(LOAD_CATEGORY_FAILURE);

export const loadDetailCategoryRequestAction = createAction(
  LOAD_DETAILCATEGORY_REQUEST
);
export const loadDetailCategorySuccessAction = createAction(
  LOAD_DETAILCATEGORY_SUCCESS
);
export const loadDetailCategoryFailureAction = createAction(
  LOAD_DETAILCATEGORY_FAILURE
);

export const loadCategorysRequestAction = createAction(LOAD_CATEGORYS_REQUEST);
export const loadCategorysSuccessAction = createAction(LOAD_CATEGORYS_SUCCESS);
export const loadCategorysFailureAction = createAction(LOAD_CATEGORYS_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CATEGORY_REQUEST: {
        draft.categorysLoading = true;
        draft.categorysDone = false;
        draft.categorysError = null;
        break;
      }
      case LOAD_CATEGORY_SUCCESS: {
        draft.categorysLoading = false;
        draft.categorysDone = true;
        draft.category = action.data.categorys;
        break;
      }
      case LOAD_CATEGORY_FAILURE: {
        draft.categorysDone = false;
        draft.categorysError = action.err;
        break;
      }

      case LOAD_DETAILCATEGORY_REQUEST: {
        draft.categorysLoading = true;
        draft.categorysDone = false;
        draft.categorysError = null;
        break;
      }
      case LOAD_DETAILCATEGORY_SUCCESS: {
        draft.categorysLoading = false;
        draft.categorysDone = true;
        draft.detailCategory = [];
        break;
      }
      case LOAD_DETAILCATEGORY_FAILURE: {
        draft.categorysDone = false;
        draft.categorysError = action.err;
        break;
      }
      case LOAD_CATEGORYS_REQUEST: {
        draft.categorysLoading = true;
        draft.categorysDone = false;
        draft.categorysError = null;
        break;
      }
      case LOAD_CATEGORYS_SUCCESS: {
        draft.categorysLoading = false;
        draft.categorysDone = true;
        draft.categories = action.data.detailCategorys.reduce(
          (acc, category) => {
            const type = category.Category.type;
            acc[type]
              ? acc[type].push({ id: category.id, name: category.name })
              : (acc[type] = [{ id: category.id, name: category.name }]);
            return acc;
          },
          {}
        );
        break;
      }
      case LOAD_CATEGORYS_FAILURE: {
        draft.categorysDone = false;
        draft.categorysError = action.err;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
