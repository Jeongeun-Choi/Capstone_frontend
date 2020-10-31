import { createAction } from '../utils/createAction';
import produce from 'immer';

export const initialState = {
  groupsLoading: false, //모집글 불러오는 중
  groupsDone: false,
  groupsError: false,
  addGroupLoading: false, //모집글 작성 시도중
  addGroupDone: false,
  addGroupError: null,
  updateGroupLoading: false, //모집글 수정 시도중
  updateGroupDone: false,
  updateGroupError: null,
  groups: []
};

export const LOAD_GROUPS_REQUEST = 'LOAD_GROUPS_REQUEST';
export const LOAD_GROUPS_SUCCESS = 'LOAD_GROUPS_SUCCESS';
export const LOAD_GROUPS_FAILURE = 'LOAD_GROUPS_FAILURE';

export const ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST';
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS';
export const ADD_GROUP_FAILURE = 'ADD_GROUP_FAILURE';

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE';

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';

export const loadGroupsRequestAction = createAction(LOAD_GROUPS_REQUEST);
export const loadGroupsSuccessAction = createAction(LOAD_GROUPS_SUCCESS);
export const loadGroupsFailureAction = createAction(LOAD_GROUPS_FAILURE);

export const addGroupRequestAction = createAction(ADD_GROUP_REQUEST);
export const addGroupSuccessAction = createAction(ADD_GROUP_SUCCESS);
export const addGroupFailureAction = createAction(ADD_GROUP_FAILURE);

export const updateGroupRequestAction = createAction(UPDATE_GROUP_REQUEST);
export const updateGroupSuccessAction = createAction(UPDATE_GROUP_SUCCESS);
export const updateGroupFailureAction = createAction(UPDATE_GROUP_FAILURE);

export const deleteGroupRequestAction = createAction(DELETE_GROUP_REQUEST);
export const deleteGroupSuccessAction = createAction(DELETE_GROUP_SUCCESS);
export const deleteGroupFailureAction = createAction(DELETE_GROUP_FAILURE);

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_GROUPS_REQUEST: {
        draft.groupsLoading = true;
        draft.groupsError = null;
        draft.groupsDone = false;
        break;
      }
      case LOAD_GROUPS_SUCCESS: {
        draft.groupsLoading = false;
        draft.groupsDone = true;
        draft.groups = action.data.groups;
        break;
      }
      case LOAD_GROUPS_FAILURE: {
        draft.groupsLoading = false;
        draft.groupsError = action.err;
        break;
      }
      case ADD_GROUP_REQUEST: {
        draft.addGroupLoading = true;
        draft.addGroupError = null;
        draft.addGroupDone = false;
        break;
      }
      case ADD_GROUP_SUCCESS: {
        draft.addGroupLoading = false;
        draft.addGroupDone = true;
        draft.groups.push(action.data);
        break;
      }
      case ADD_GROUP_FAILURE: {
        draft.addGroupLoading = false;
        draft.addGroupError = action.error;
        break;
      }
      case UPDATE_GROUP_REQUEST: {
        draft.updateGroupLoading = true;
        draft.updateGroupError = null;
        draft.updateGroupDone = false;
        break;
      }
      case UPDATE_GROUP_SUCCESS: {
        draft.updateGroupLoading = false;
        draft.updateGroupDone = true;
        const index = draft.groups.findIndex(
          group => group.id === action.data.groupId
        );
        draft.groups.splice(index, 1, action.data);
        break;
      }
      case UPDATE_GROUP_FAILURE: {
        draft.updateGroupLoading = false;
        draft.updateGroupError = action.err;
        break;
      }
      case DELETE_GROUP_REQUEST: {
        break;
      }
      case DELETE_GROUP_SUCCESS: {
        draft.groups.filter(group => group.id !== action.data.groupId);
        break;
      }
      case DELETE_GROUP_FAILURE: {
        draft.deleteGroupError = action.err;
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
