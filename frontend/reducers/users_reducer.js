import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_BOOKSHELF, RECEIVE_ONE_BOOKSHELF} from '../actions/bookshelf_actions';
import { REMOVE_SHELVING, RECEIVE_SHELVING} from '../actions/bookshelf_actions';
import { RECEIVE_ONE_BOOK } from '../actions/book_actions';
import { RECEIVE_REVIEW, DELETE_REVIEW , RECEIVE_STATUS, DELETE_STATUS} from '../actions/review&status_actions';
import { RECEIVE_A_USER } from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  let newState;
  let userShelves;
  let userReviews;
  let userBookInfo;
  let userStatuses;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_A_USER:
      return merge( {}, state, {[action.user.id]: action.user} );
    case REMOVE_BOOKSHELF:
      newState = merge({}, state);
      userShelves = newState[action.bookshelf.user_id].bookshelf_ids;
      userShelves.splice( userShelves.indexOf(action.bookshelf.id), 1);
      return newState;
    case RECEIVE_ONE_BOOKSHELF:
      newState = merge({}, state);
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
      newState = merge({}, state);
      userBookInfo = newState[action.review.user_id].bookInfo;
      if(!userBookInfo[action.review.book_id]){
        userBookInfo[action.review.book_id] = {statusId: action.status.id};
        userStatuses = newState[action.review.user_id].status_ids.push(action.status.id);
      }
      userBookInfo[action.review.book_id].reviewId = action.review.id;
      userReviews = newState[action.review.user_id].review_ids;
      let reviewExists = userReviews.indexOf(action.review.id);
      if(reviewExists === -1){
        userReviews.push(action.review.id);
      }
      return newState;
    case DELETE_REVIEW:
      newState = merge({}, state);
      userBookInfo = newState[action.review.user_id].bookInfo;
      delete userBookInfo[action.review.book_id].reviewId;
      userReviews = newState[action.review.user_id].review_ids;
      userReviews.splice(userReviews.indexOf(action.review.id), 1);
      return newState;
    case RECEIVE_STATUS:
      newState = merge({}, state);
      userBookInfo = newState[action.status.user_id].bookInfo;
      userBookInfo[action.status.book_id] = {statusId: action.status.id};
      return newState;
    case RECEIVE_SHELVING:
      if(action.status){
        newState = merge({}, state);
        userBookInfo = newState[action.status.user_id].bookInfo;
        userBookInfo[action.status.book_id] = {statusId: action.status.id};
        return newState;
      }
      return state;
    case DELETE_STATUS:
      newState = merge({}, state);
      userBookInfo = newState[action.status.user_id].bookInfo;
      delete userBookInfo[action.status.book_id];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
