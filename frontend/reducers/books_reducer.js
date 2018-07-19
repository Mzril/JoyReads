import { RECEIVE_ONE_BOOK, RECEIVE_BOOKS, RECEIVE_INDEX, RECEIVE_USER_BOOKS} from '../actions/book_actions';
import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from './../actions/session_actions';
import {RECEIVE_REVIEW} from './../actions/review&status_actions';

const booksReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_BOOKS:
    case RECEIVE_INDEX:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER_BOOKS:
      const merging={};
      action.books.forEach((books)=>{merging[books.id]=books;});
      return merge({}, state, merging);
    case RECEIVE_ONE_BOOK:
      return merge( {}, state, {[action.book.id]: action.book} );
    default:
      return state;
    case RECEIVE_REVIEW:
      newState=merge({}, state);
      if(newState[action.review.book_id].review_ids && newState[action.review.book_id].review_ids.indexOf(action.review.id) === -1){
        newState[action.review.book_id].review_ids.push(action.review.id);
      }
      return newState;
  }
};

export default booksReducer;
