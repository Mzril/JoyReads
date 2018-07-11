import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import bookshelvesReducer from './bookshelves_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  bookshelves: bookshelvesReducer
});

export default entitiesReducer;
