export const RECEIVE_A_USER = "RECEIVE_A_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

import * as UserAPIUtil from './../util/user_api_util';

export const receiveCurrentUser = (payload) => {
  return {
    type: RECEIVE_A_USER,
    user: payload.user,
    bookshelves : payload.bookshelves,
    books : payload.books,
    reviews: payload.reviews
  };
};

export const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors: errors
  };
};

export const getUser = (username) => {
  return dispatch => {
    return UserAPIUtil.getUser(username).then(
      (payload) => {
        return dispatch(receiveCurrentUser(payload));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const updateUser = (data) => {
  return dispatch => {
    return UserAPIUtil.updateUser(data).then(
      (payload) => {
        return dispatch(receiveCurrentUser(payload));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
