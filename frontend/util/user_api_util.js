
export const getUserById = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  });
};

export const getUserByUsername = (username) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/username/${username}`
  });
};


export const updateUser = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: 'api/users',
    data: {user: data}
  });
};
