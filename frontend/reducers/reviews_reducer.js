import {RECEIVE_REVIEW, DELETE_REVIEW, UPDATE_REVIEW, DELETE_STATUS} from "./../actions/review&status_actions";
import { RECEIVE_ONE_BOOK, RECEIVE_BOOKS, RECEIVE_INDEX, RECEIVE_USER_BOOKS} from '../actions/book_actions';
import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from './../actions/session_actions';
import { RECEIVE_A_USER } from '../actions/user_actions';

const reviewsReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
    case DELETE_STATUS:
      if(action.review){
        delete newState[action.review.id];
      }
      return newState;
    case RECEIVE_USER_BOOKS:
      return newState;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_ONE_BOOK:
    case RECEIVE_A_USER:
      const merging={};
      action.reviews.forEach((review)=>{merging[review.id] = review;});
      return merge({}, state, merging);
    default:
      return state;
  }
};

export default reviewsReducer;
