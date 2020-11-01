import { HYDRATE } from 'next-redux-wrapper'; //redux SSR

import user from './user';
import post from './post';
import category from './category';
import group from './group';
import { combineReducers } from 'redux';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        post,
        category,
        group,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
