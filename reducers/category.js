import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  categorysLoading: false,
  categorysDone: false,
  categorysError: false,
  detailCategorysLoading: false,
  detailCategorysDone: false,
  detailCategorysError: false,

  categories: undefined
};

export const LOAD_CATEGORYS_REQUEST = 'LOAD_CATEGORYS_REQUEST';
export const LOAD_CATEGORYS_SUCCESS = 'LOAD_CATEGORYS_SUCCESS';
export const LOAD_CATEGORYS_FAILURE = 'LOAD_CATEGORYS_FAILURE';

export const loadCategorysRequestAction = createAction(LOAD_CATEGORYS_REQUEST);
export const loadCategorysSuccessAction = createAction(LOAD_CATEGORYS_SUCCESS);
export const loadCategorysFailureAction = createAction(LOAD_CATEGORYS_FAILURE);

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
    }
  });
};

export default reducer;
