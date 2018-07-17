export const createStatus = (data)=>{
  return $.ajax({
    method: "POST",
    url: `/api/statuses`,
    data: {status: data}
  });
};

export const deleteStatus = (data)=>{
  return $.ajax({
    method: "POST",
    url: `/api/statuses`,
    data: {status: data}
  });
};

export const updateStatus = (data)=>{
  return $.ajax({
    method: "PATCH",
    url: `/api/statuses`,
    data: {status: data}
  });
};
