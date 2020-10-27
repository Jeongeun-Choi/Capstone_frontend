import { HYDRATE } from 'next-redux-wrapper'; //redux SSR

import user from './user';
import post from './post';
import category from './category';
import group from './group';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  //SSR 위해서 생성
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        // console.log('HYDRATE', action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
  category,
  group
});

export default rootReducer;
