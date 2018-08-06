export const createStatus = (data)=>{
  return $.ajax({
    method: "POST",
    url: `/api/statuses`,
    data: {status: data}
  });
};

export const deleteStatus = (id)=>{
  return $.ajax({
    method: "DELETE",
    url: `/api/statuses/${id}`
  });
};

export const updateStatus = (data)=>{
  return $.ajax({
    method: "PATCH",
    url: `/api/statuses/${data.id}`,
    data: {status: data}
  });
};

export const handleReview = (data)=>{
  return $.ajax({
    method: "POST",
    url: `/api/reviews`,
    data: {review: data}
  });
};

export const updateReview = (data)=>{
  return $.ajax({
    method: "PATCH",
    url: `/api/reviews/${data.id}`,
    data: {review: data}
  });
};

export const deleteReview = (data)=>{
  return $.ajax({
    method: "DELETE",
    url: `/api/reviews`,
    data: {review: data}
  });
};
