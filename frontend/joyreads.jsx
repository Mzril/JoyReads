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
    window.payload.bookshelves.forEach(shelf=>initialshelf[shelf.id]=shelf);
    const preloadedState = {
      entities: {
        users: { [window.payload.user.id]: window.payload.user },
        bookshelves: initialshelf
      },
      session: { currentUserId: window.payload.user.id }
    };
    store = configureStore(preloadedState);
    delete window.payload;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  window.fetchBookshelf = fetchBookshelf;
  window.createBookshelf = createBookshelf;
  window.deleteBookshelf = deleteBookshelf;

  ReactDOM.render(<Root store={store} />, root);
});
