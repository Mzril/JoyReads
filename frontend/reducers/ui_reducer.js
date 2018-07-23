import { RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_INDEX, RECEIVE_USER_BOOKS, RECEIVE_BOOKS, RECEIVE_ONE_BOOK, RECEIVE_SEARCH_BOOKS} from '../actions/book_actions';
import { RECEIVE_SHELVING, REMOVE_SHELVING} from '../actions/bookshelf_actions';
import { RECEIVE_A_USER } from '../actions/user_actions';
import { merge } from 'lodash';

const default_state = {visitedUsers: {}, searchBookIds: [] ,visitedIndex: false, indexBookIds: [], updated: false, visitedBooks: {}, style: 1};

export const uiReducer = (state = default_state, action) => {

  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_A_USER:
    case RECEIVE_USER_BOOKS:
      newState = merge({}, state);
      newState.visitedUsers[action.user.id] = true;
      newState.updated = false;
      return newState;
    case RECEIVE_INDEX:
      newState = merge({}, state);
      const bookIdArray = action.books.map((book) =>{
        return book.id;
      });
      newState.visitedIndex = true;
      newState.updated = false;
      newState.indexBookIds = bookIdArray;
      return newState;
    case RECEIVE_BOOKS:
      newState = merge({}, state);
      newState.updated = true;
      return newState;
    case RECEIVE_SEARCH_BOOKS:
      newState = merge({}, state);
      const bookSearchArray = action.books.map((book) =>{
        return book.id;
      });
      newState.searchBookIds = bookSearchArray;
      return newState;
    case RECEIVE_ONE_BOOK:
      newState = merge({}, state);
      newState.visitedBooks[action.book.id]=true;
      return newState;
    case "TOGGLE_VIEW":
      newState = merge({}, state);
      newState.style = action.style;
      return newState;
    default:
      return state;
  }
};
