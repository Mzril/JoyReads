import React from 'react';
import ReactDOM from 'react-dom';
import {signup, login, logout} from "./actions/session_actions";
import configureStore from "./store/store";
import Root from './components/root';
import {fetchBookshelf, createBookshelf, deleteBookshelf} from "./actions/bookshelf_actions";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { currentUserId: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
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
