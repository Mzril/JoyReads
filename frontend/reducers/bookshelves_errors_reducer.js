import
 { RECEIVE_BOOKSHELF_ERRORS,
   RECEIVE_ONE_BOOKSHELF,
   RECEIVE_USER_BOOKSHELVES } from '../actions/bookshelf_actions';
import { merge } from 'lodash';

const bookshelvesErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ONE_BOOKSHELF:
    case RECEIVE_USER_BOOKSHELVES:
      return [];
    case RECEIVE_BOOKSHELF_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default bookshelvesErrorsReducer;
