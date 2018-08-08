import { RECEIVE_USER_BOOKSHELVES, RECEIVE_ONE_BOOKSHELF, REMOVE_BOOKSHELF,
REMOVE_SHELVING, RECEIVE_SHELVING, UPDATE_SHELVING } from '../actions/bookshelf_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_A_USER } from '../actions/user_actions';
import { merge } from 'lodash';
import { RECEIVE_STATUS, DELETE_STATUS, UPDATE_STATUS } from '../actions/review&status_actions';
import { RECEIVE_REVIEW } from '../actions/review&status_actions';

const bookshelvesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_USER_BOOKSHELVES:
    case RECEIVE_CURRENT_USER:
    case RECEIVE_A_USER:
      const merging={};
      action.bookshelves.forEach((bookshelf)=>{ merging[bookshelf.id]=bookshelf;});
      return merge({}, state, merging);
    case RECEIVE_ONE_BOOKSHELF:
      return merge( {}, state, {[action.bookshelf.id]: action.bookshelf} );
    case REMOVE_BOOKSHELF:
      newState = merge({}, state);
      delete newState[action.bookshelf.id];
      return newState;
    case REMOVE_SHELVING:
      newState = merge({},state);
      const removingfrom = newState[action.shelving.bookshelf_id];
      removingfrom.book_ids = removingfrom.book_ids.filter(id => id!==action.shelving.book_id);
      return newState;
    case RECEIVE_SHELVING:
      newState = merge({},state);
      const receivingshelf = newState[action.shelving.bookshelf_id];
      if(action.status_shelving){
        const readshelf = newState[action.status_shelving.bookshelf_id];
        readshelf.book_ids.push(action.status_shelving.book_id);
      }
      receivingshelf.book_ids.push(action.shelving.book_id);
      return newState;
    case RECEIVE_STATUS:
      newState = merge({},state);
      newState[action.shelving.bookshelf_id].book_ids.push(action.shelving.book_id);
      return newState;
    case UPDATE_STATUS:
      newState = merge({},state);
      newState[action.shelving.bookshelf_id].book_ids.push(action.shelving.book_id);
      newState[action.previous_shelf].book_ids.splice(newState[action.previous_shelf].book_ids.indexOf(action.status.book_id), 1);
      return newState;
    case DELETE_STATUS:
      newState = merge({},state);
      action.bookshelf_ids.forEach(bookshelf_id=>{
        newState[bookshelf_id].book_ids.splice(newState[bookshelf_id].book_ids.indexOf(action.status.book_id) , 1);
      });
      return newState;
    case RECEIVE_REVIEW:
      newState = merge({}, state);
      if(action.shelving){
        const receivingshelf = newState[action.shelving.bookshelf_id];
        receivingshelf.book_ids.push(action.shelving.book_id);
      }
      return newState;
    default:
      return state;
  }
};

export default bookshelvesReducer;
