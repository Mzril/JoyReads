import React from 'react';
import ReactDOM from 'react-dom';
import {signup, login, logout} from "./actions/session_actions";
import configureStore from "./store/store";
import Root from './components/root';
import {fetchBookshelf, createBookshelf, deleteBookshelf} from "./actions/bookshelf_actions";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.payload) {
    const initialshelf = {};
    const initialbooks = {};
    const initialreviews = {};
    const initialstatuses = {};
    window.payload.bookshelves.forEach(shelf=>initialshelf[shelf.id]=shelf);
    window.payload.books.forEach(book=>initialbooks[book.id]=book);
    window.payload.reviews.forEach(review=>initialreviews[review.id]=review);
    window.payload.statuses.forEach(status=>initialstatuses[status.id]=status);
    const preloadedState = {
      entities: {
        users: { [window.payload.user.id]: window.payload.user },
        bookshelves: initialshelf,
        books: initialbooks,
        reviews: initialreviews,
        statuses: initialstatuses
      },
      session: {
        currentUserId: window.payload.user.id
      },
      ui: {visitedUsers: {[window.payload.user.id]: true}, visitedBooks: {}, style: 0}
    };
    store = configureStore(preloadedState);
    delete window.payload;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, root);
});
