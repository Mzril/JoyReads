import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_BOOKSHELF, RECEIVE_ONE_BOOKSHELF} from '../actions/bookshelf_actions';
import { REMOVE_SHELVING, RECEIVE_SHELVING} from '../actions/bookshelf_actions';
import { merge } from 'lodash';

const usersReducer = (state = {}, action) => {
  let newState;
  let userShelves;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
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
    default:
      return state;
  }
};

export default usersReducer;
