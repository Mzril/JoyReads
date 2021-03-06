export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const RECEIVE_STATUS = "RECEIVE_STATUS";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const DELETE_STATUS = "DELETE_STATUS";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";
export const RECEIVE_STATUS_ERRORS = "RECEIVE_STATUS_ERRORS";

//Maybe turn stuff like review_ids and stuff into objects instead for optimization purposes.

import * as ReviewStatusAPIUtil from "./../util/review&status_api_util.js";

export const receiveReview = ({review, status, shelving})=>{
  return {
    type: RECEIVE_REVIEW,
    review: review,
    status: status,
    shelving: shelving
  };
};
export const updateTheReview = (review)=>{
  return {
    type: UPDATE_REVIEW,
    review: review
  };
};
export const deleteReview = (review)=>{
  return {
    type: DELETE_REVIEW,
    review: review
  };
};
export const receiveStatus = (payload)=>{
  return {
    type: RECEIVE_STATUS,
    status: payload.status,
    shelving: payload.shelving
  };
};
export const updateStatus2 = (payload)=>{
  return {
    type: UPDATE_STATUS,
    status: payload.status,
    shelving: payload.shelving,
    previous_shelf: payload.previous_shelf
  };
};

export const deleteStatus = (payload)=>{
  return {
    type: DELETE_STATUS,
    status: payload.status,
    review: payload.review,
    bookshelf_ids: payload.bookshelf_ids
  };
};

export const receiveReviewErrors = (errors)=>{
  return {
    type: RECEIVE_REVIEW_ERRORS,
    errors: errors
  };
};

export const receiveStatusErrors = (error)=>{
  return {
    type: RECEIVE_STATUS_ERRORS,
    errors: errors
  };
};

export const handleReview = (data) => {
  return dispatch => {
    return ReviewStatusAPIUtil.handleReview(data).then(
      (payload) => {
        return dispatch(receiveReview(payload));
      },
      (errors) => dispatch(receiveReviewErrors(errors.responseJSON))
    );
  };
};

export const updateReview = (data) => {
  return dispatch => {
    return ReviewStatusAPIUtil.updateReview(data).then(
      (review) => {
        return dispatch(updateTheReview(review));
      },
      (errors) => dispatch(receiveReviewErrors(errors.responseJSON))
    );
  };
};

export const removeReview = (data) => {
  return dispatch => {
    return ReviewStatusAPIUtil.deleteReview(data).then(
      (review) => {
        return dispatch(deleteReview(review));
      },
      (errors) => dispatch(receiveReviewErrors(errors.responseJSON))
    );
  };
};


export const createReview = (data) => {
  return dispatch => {
    return ReviewStatusAPIUtil.handleReview(data).then(
      (status) => {
        return dispatch(receiveShelving(shelving));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};

export const createStatus = (data) =>{
  return dispatch => {
    return ReviewStatusAPIUtil.createStatus(data).then(
      (payload) => {
        return dispatch(receiveStatus(payload));
      },
      (errors) => dispatch(receiveStatusErrors(errors.responseJSON))
    );
  };
};

export const updateStatus = (data) =>{
  return dispatch => {
    return ReviewStatusAPIUtil.updateStatus(data).then(
      (payload) => {
        return dispatch(updateStatus2(payload));
      },
      (errors) => dispatch(receiveStatusErrors(errors.responseJSON))
    );
  };
};

export const removeStatus = (id)=>{
  return dispatch => {
    return ReviewStatusAPIUtil.deleteStatus(id).then(
      (payload) => {
        return dispatch(deleteStatus(payload));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
