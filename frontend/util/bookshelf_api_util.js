export const fetchBookshelf = (id)=>{
  return $.ajax({
    method: "GET",
    url: `/api/bookshelves/${id}`
  });
};

export const fetchBookshelves = (user)=>{
  return $.ajax({
    method: "GET",
    url: `/api/bookshelves`,
    data: {user_id: user.id}
  });
};

export const updateBookshelf = (bookshelf) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/bookshelves/${bookshelf.id}`,
    data: {bookshelf: bookshelf}
  });
};

export const deleteBookshelf = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/bookshelves/${id}`
  });
};

export const createBookshelf = (bookshelf) => {
  return $.ajax({
    method: "POST",
    url: `/api/bookshelves`,
    data: {bookshelf:bookshelf}
  });
};

export const createShelving = (data) => {
  return $.ajax({
    method: "POST",
    url: `/api/shelvings`,
    data: {shelving: data}
  });
};

export const updateShelving = (data) => {
  return $.ajax({
    method: "POST",
    url: `/api/shelvings`,
    data: {shelving: data}
  });
};

export const deleteShelving = (data) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/shelvings/`,
    data: data
  });
};
