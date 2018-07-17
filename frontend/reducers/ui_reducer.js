import { RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_INDEX, RECEIVE_USER_BOOKS} from '../actions/book_actions';
import { RECEIVE_SHELVING, REMOVE_SHELVING} from '../actions/bookshelf_actions';
import { merge } from 'lodash';

const default_state = {visitedUsers: {}, visitedIndex: false, indexBookIds:[], updated: false};

export const uiReducer = (state = default_state, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
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
    case RECEIVE_USER_BOOKS:
      newState = merge({}, state);
      newState.visitedUsers[action.userId] = true;
      newState.updated = false;
      return newState;
    case RECEIVE_SHELVING:
    case REMOVE_SHELVING:
      newState = merge({}, state);
      newState.updated = true;
      return newState;
    default:
      return state;
  }
};
