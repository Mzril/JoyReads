import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const default_state = {currentUserId: null};

export const sessionReducer = (state = default_state, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge( {}, state, {currentUserId: action.user.id});
    case LOGOUT_CURRENT_USER:
      return merge({}, state, default_state);
    default:
      return state;
  }
};
