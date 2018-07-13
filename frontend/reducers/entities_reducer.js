import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import bookshelvesReducer from './bookshelves_reducer';
import booksReducer from './books_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  bookshelves: bookshelvesReducer,
  books: booksReducer
});

export default entitiesReducer;
