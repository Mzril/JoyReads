export const RECEIVE_USER_BOOKSHELVES = "RECEIVE_USER_BOOKSHELVES";
export const RECEIVE_BOOKSHELF_ERRORS = "RECEIVE_BOOKSHELF_ERRORS";
export const RECEIVE_ONE_BOOKSHELF = "RECEIVE_ONE_BOOKSHELF";
export const REMOVE_BOOKSHELF = "REMOVE_BOOKSHELF";
import * as BookshelfAPIUtil from './../util/bookshelf_api_util';

export const receiveBookshelves = (bookshelves) => {
  return {
    type: RECEIVE_USER_BOOKSHELVES,
    bookshelves: bookshelves
  };
};

export const receiveBookshelf= (bookshelf) => {
  return {
    type: RECEIVE_ONE_BOOKSHELF,
    bookshelf: bookshelf
  };
};

export const removeBookshelf = (bookshelf)=>{
  return {
    type: REMOVE_BOOKSHELF,
    bookshelf: bookshelf
  };
};

export const receiveErrors= (errors) => {
  return {
    type: RECEIVE_BOOKSHELF_ERRORS,
    errors: errors
  };
};

export const fetchBookshelves = (user) => {
  return dispatch => {
    return BookshelfAPIUtil.fetchBookshelves(user).then(
      (bookshelves) => {
        return dispatch(receiveBookshelves(bookshelves));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchBookshelf = (id) => {
  return dispatch => {
    return BookshelfAPIUtil.fetchBookshelf(id).then(
      (bookshelf) => {
        return dispatch(receiveBookshelf(bookshelf));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const createBookshelf = (bookshelf) => {
  return dispatch => {
    return BookshelfAPIUtil.createBookshelf(bookshelf).then(
      (bookshelf) => {
        return dispatch(receiveBookshelf(bookshelf));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const updateBookshelf = (bookshelf) => {
  return dispatch => {
    return BookshelfAPIUtil.updateBookshelf(bookshelf).then(
      (bookshelf) => {
        return dispatch(receiveBookshelf(bookshelf));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const deleteBookshelf = (id) => {
  return dispatch => {
    return BookshelfAPIUtil.deleteBookshelf(id).then(
      (bookshelf) => {
        return dispatch(removeBookshelf(bookshelf));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
