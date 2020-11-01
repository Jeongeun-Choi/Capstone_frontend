import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  postsLoading: false, //모집글 불러오는 중
  postsDone: false,
  postsError: false,
  addPostLoading: false, //모집글 작성 시도중
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false, //모집글 수정 시도중
  updatePostDone: false,
  updatePostError: null,
  posts: []
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const loadPostsRequestAction = createAction(LOAD_POSTS_REQUEST);
export const loadPostsSuccessAction = createAction(LOAD_POSTS_SUCCESS);
export const loadPostsFailureAction = createAction(LOAD_POSTS_FAILURE);

export const addPostRequestAction = createAction(ADD_POST_REQUEST);
export const addPostSuccessAction = createAction(ADD_POST_SUCCESS);
export const addPostFailureAction = createAction(ADD_POST_FAILURE);

export const updatePostRequestAction = createAction(UPDATE_POST_REQUEST);
export const updatePostSuccessAction = createAction(UPDATE_POST_SUCCESS);
export const updatePostFailureAction = createAction(UPDATE_POST_FAILURE);

export const deletePostRequestAction = createAction(DELETE_POST_REQUEST);
export const deletePostSuccessAction = createAction(DELETE_POST_SUCCESS);
export const deletePostFailureAction = createAction(DELETE_POST_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST: {
        draft.postsLoading = true;
        draft.postsError = null;
        draft.postsDone = false;
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        draft.postsLoading = false;
        draft.postsDone = true;
        draft.posts.push(...action.data);
        break;
      }
      case LOAD_POSTS_FAILURE: {
        draft.postsLoading = false;
        draft.postsError = action.err;
        break;
      }
      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      }
      case UPDATE_POST_REQUEST: {
        draft.updatePostLoading = true;
        draft.updatePostError = null;
        draft.updatePostDone = false;
        break;
      }
      case UPDATE_POST_SUCCESS: {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        break;
      }
      case UPDATE_POST_FAILURE: {
        draft.updatePostLoading = false;
        draft.updatePostError = action.err;
        break;
      }
      case DELETE_POST_REQUEST: {
        break;
      }
      case DELETE_POST_SUCCESS: {
        //   draft.posts =  대충 filter써서 걸러낸다.
        break;
      }
      case DELETE_POST_FAILURE: {
        draft.deletePostError = action.err;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
