export const RECEIVE_A_USER = "RECEIVE_A_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

import * as UserAPIUtil from './../util/user_api_util';

export const receiveUser = (payload) => {
  return {
    type: RECEIVE_A_USER,
    user: payload.user,
    bookshelves : payload.bookshelves,
    books : payload.books,
    reviews: payload.reviews,
    statuses: payload.statuses
  };
};

export const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors: errors
  };
};

export const getUserById = (id) => {
  return dispatch => {
    return UserAPIUtil.getUserById(id).then(
      (payload) => {
        return dispatch(receiveUser(payload));
      },
      (errors) => dispatch(receiveUserErrors(errors.responseJSON))
    );
  };
};

export const getUserByUsername = (username) => {
  return dispatch => {
    return UserAPIUtil.getUserByUsername(username).then(
      (payload) => {
        return dispatch(receiveUser(payload));
      },
      (errors) => dispatch(receiveUserErrors(errors.responseJSON))
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
