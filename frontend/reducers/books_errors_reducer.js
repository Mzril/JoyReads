import
 { RECEIVE_BOOK_ERRORS,
   RECEIVE_ONE_BOOK,
   RECEIVE_BOOKS,
   RECEIVE_SEARCH_BOOKS} from '../actions/book_actions';

const booksErrorsReducer = (state = [], action) => {

  switch (action.type) {
    case RECEIVE_ONE_BOOK:
    case RECEIVE_BOOKS:
    case RECEIVE_SEARCH_BOOKS:
      return [];
    case RECEIVE_BOOK_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default booksErrorsReducer;
