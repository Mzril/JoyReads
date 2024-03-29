import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import bookshelvesReducer from './bookshelves_reducer';
import booksReducer from './books_reducer';
import reviewsReducer from './reviews_reducer';
import statusReducer from './status_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  bookshelves: bookshelvesReducer,
  books: booksReducer,
  reviews: reviewsReducer,
  statuses: statusReducer
});

export default entitiesReducer;
