export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const RECEIVE_STATUS = "RECEIVE_STATUS";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const DELETE_STATUS = "DELETE_STATUS";


import * as ReviewStatusAPIUtil from "./../util.review&status_api_util.js";

export const receiveReview = (review)=>{
  return {
    type: RECEIVE_REVIEW,
    review: review
  };
};
export const updateReview = (review)=>{
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
export const receiveStatus = (status)=>{
  return {
    type: RECEIVE_STATUS,
    status: status
  };
};
export const updateStatus = (status)=>{
  return {
    type: UPDATE_STATUS,
    status: status
  };
};
export const deleteStatus = (status)=>{
  return {
    type: DELETE_STATUS,
    status: status
  };
};

export const createReview = (data) => {
  return dispatch => {
    return ReviewStatusAPIUtil.handleReview(data).then(
      (shelving) => {
        return dispatch(receiveShelving(shelving));
      },
      (errors) => dispatch(receiveErrors(errors.responseJSON))
    );
  };
};
