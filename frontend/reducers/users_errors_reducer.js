import { RECEIVE_USER_ERRORS, RECEIVE_A_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const usersErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_A_USER:
      return [];
    case RECEIVE_USER_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default usersErrorsReducer;
