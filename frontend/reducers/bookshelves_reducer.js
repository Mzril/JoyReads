import { RECEIVE_USER_BOOKSHELVES, RECEIVE_ONE_BOOKSHELF, REMOVE_BOOKSHELF } from '../actions/bookshelf_actions';
import { merge } from 'lodash';

const bookshelvesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_BOOKSHELVES:
      const merging={};
      action.bookshelves.forEach((bookshelf)=>{ merging[bookshelf.id]=bookshelf;});
      return merge({}, state, merging);
    case RECEIVE_ONE_BOOKSHELF:
      return merge( {}, state, {[action.bookshelf.id]: action.bookshelf} );
    case REMOVE_BOOKSHELF:
      const newState = merge({}, state);
      delete newState[action.bookshelf.id];
      return newState;
    default:
      return state;
  }
};

export default bookshelvesReducer;
