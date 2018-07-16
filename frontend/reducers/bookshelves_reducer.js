import { RECEIVE_USER_BOOKSHELVES, RECEIVE_ONE_BOOKSHELF, REMOVE_BOOKSHELF,
REMOVE_SHELVING, RECEIVE_SHELVING, UPDATE_SHELVING } from '../actions/bookshelf_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const bookshelvesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_USER_BOOKSHELVES:
    case RECEIVE_CURRENT_USER:
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
      removingfrom.book_ids = removingfrom.book_ids.splice(removingfrom.book_ids.indexOf(action.shelving.book_id) , 1);
      return newState;
    case RECEIVE_SHELVING:
      newState = merge({},state);
      const receivingshelf = newState[action.shelving.bookshelf_id];
      receivingshelf.push(action.book_id);
      return newState;
    default:
      return state;
  }
};

export default bookshelvesReducer;
