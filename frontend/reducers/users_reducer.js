import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_BOOKSHELF, RECEIVE_ONE_BOOKSHELF} from '../actions/bookshelf_actions';
import { REMOVE_SHELVING, RECEIVE_SHELVING} from '../actions/bookshelf_actions';
import { RECEIVE_ONE_BOOK } from '../actions/book_actions';
import { RECEIVE_REVIEW, DELETE_REVIEW } from '../actions/review&status_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  let userShelves;
  let userReviews;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge( {}, state, {[action.user.id]: action.user} );
    case REMOVE_BOOKSHELF:
      userShelves = newState[action.bookshelf.user_id].bookshelf_ids;
      userShelves.splice( userShelves.indexOf(action.bookshelf.id), 1);
      return newState;
    case RECEIVE_ONE_BOOKSHELF:
      userShelves = newState[action.bookshelf.user_id].bookshelf_ids;
      let exists = userShelves.indexOf(action.bookshelf.id);
      if(exists === -1){
        userShelves.push(action.bookshelf.id);
      }
      return newState;
    case RECEIVE_ONE_BOOK:
      let merging = {};
      action.users.forEach((user)=>{merging[user.id]=user;});
      return merge({}, state, merging);
    case RECEIVE_REVIEW:
      userReviews = newState[action.review.user_id].review_ids;
      let reviewExists = userReviews.indexOf(action.review.id);
      if(reviewExists === -1){
        userReviews.push(action.review.id);
      }
      return newState;
    case DELETE_REVIEW:
      userReviews = newState[action.review.user_id].review_ids;
      userReviews.splice(userReviews.indexOf(action.review.id), 1);
    return newState;
    default:
      return state;
  }
};

export default usersReducer;
