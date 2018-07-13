export const RECEIVE_BOOKS = "RECEIVE_BOOKS";
export const RECEIVE_BOOK_ERRORS = "RECEIVE_BOOK_ERRORS";
export const RECEIVE_ONE_BOOK = "RECEIVE_ONE_BOOK";
import * as BookAPIUtil from './../util/book_api_util';

export const receiveBooks = (books) => {
  return {
    type: RECEIVE_BOOKS,
    books: books
  };
};

export const receiveBook= (book) => {
  return {
    type: RECEIVE_ONE_BOOK,
    book: book
  };
};

export const receiveErrors= (errors) => {
  return {
    type: RECEIVE_BOOK_ERRORS,
    errors: errors
  };
};

export const fetchBook = (id) => {
  return dispatch => {
    return BookAPIUtil.fetchBook(id).then(
      (bookshelf) => {
        return dispatch(receiveBook(book));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchLimitedBooks = () => {
  return dispatch => {
    return BookAPIUtil.fetchLimitedBooks().then(
      (bookshelf) => {
        return dispatch(receiveBooks(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchBooksByShelf = (bookshelfId) => {
  return dispatch => {
    return BookAPIUtil.fetchBooksByShelf(bookshelfId).then(
      (bookshelf) => {
        return dispatch(receiveBooks(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
