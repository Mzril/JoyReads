import { RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_INDEX, RECEIVE_USER_BOOKS} from '../actions/book_actions';
import { merge } from 'lodash';

const default_state = {visitedUsers: {}, visitedIndex: false, indexBookIds:[], updated: false};

export const uiReducer = (state = default_state, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge({}, state);
      newState.visitedUsers[action.user.id] = true;
      return newState;
    case RECEIVE_INDEX:
      newState = merge({}, state);
      const bookIdArray = action.books.map((book) =>{
        return book.id;
      });
      newState.visitedIndex = true;
      newState.indexBookIds = bookIdArray;
      return newState;
    case RECEIVE_USER_BOOKS:
      newState = merge({}, state);
      newState.visitedUsers[action.userId] = true;
      return newState;
    default:
      return state;
  }
};
