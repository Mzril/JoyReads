export const RECEIVE_BOOKS = "RECEIVE_BOOKS";
export const RECEIVE_BOOK_ERRORS = "RECEIVE_BOOK_ERRORS";
export const RECEIVE_ONE_BOOK = "RECEIVE_ONE_BOOK";
export const RECEIVE_INDEX = "RECEIVE_INDEX";
export const RECEIVE_USER_BOOKS = "RECEIVE_USER_BOOKS";
import * as BookAPIUtil from './../util/book_api_util';

export const receiveBooks = (books) => {
  return {
    type: RECEIVE_BOOKS,
    books: books
  };
};

export const receiveUserBooks = (books, userId) => {
  return {
    type: RECEIVE_USER_BOOKS,
    books: books,
    userId: userId
  };
};

export const receiveIndex = (books) => {
  return {
    type: RECEIVE_INDEX,
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
      (book) => {
        return dispatch(receiveBook(book));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchLimitedBooks = () => {
  return dispatch => {
    return BookAPIUtil.fetchLimitedBooks().then(
      (books) => {
        return dispatch(receiveIndex(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchBooksByShelf = (bookshelfId) => {
  return dispatch => {
    return BookAPIUtil.fetchBooksByShelf(bookshelfId).then(
      (books) => {
        return dispatch(receiveBooks(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchBooksByUser = (userId) => {
  return dispatch => {
    return BookAPIUtil.fetchBooksByUser(userId).then(
      (payload) => {
        return dispatch(receiveUserBooks(payload.books, payload.user.id));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const fetchBooksByQuery = (query) => {
  return dispatch => {
    return BookAPIUtil.fetchBooksByQuery(query).then(
      (books) => {
        return dispatch(receiveBooks(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const createApiBooks = (data) => {
  return dispatch => {
    return BookAPIUtil.createApiBooks(data).then(
      (books) => {
        return dispatch(receiveBooks(books));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
