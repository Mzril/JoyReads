import {RECEIVE_STATUS, DELETE_STATUS, UPDATE_STATUS} from "./../actions/review&status_actions";
import { RECEIVE_ONE_BOOK, RECEIVE_BOOKS, RECEIVE_INDEX, RECEIVE_USER_BOOKS} from '../actions/book_actions';
import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from './../actions/session_actions';
import { RECEIVE_A_USER } from '../actions/user_actions';

const statusReducer = (state = {}, action) => {
  //remove all the new stat initialization for optimization
  let newState;
  switch (action.type) {
    case RECEIVE_STATUS:
      return merge({}, state, {[action.status.id]: action.status});
    case DELETE_STATUS:
      newState = merge({}, state);
      delete newState[action.status.id];
      return newState;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_A_USER:
      const merging={};
      action.statuses.forEach((status)=>{merging[status.id] = status;});
      return merge({}, state, merging);
    default:
      return state;
  }
};

export default statusReducer;
