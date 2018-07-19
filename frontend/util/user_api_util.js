
export const getUser = (username) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${username}`
  });
};


export const updateUser = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: 'api/users',
    data: {user: data}
  });
};
