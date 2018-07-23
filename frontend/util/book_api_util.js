export const fetchBook = (id)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/${id}`
  });
};

export const fetchBooksByShelf = (bookshelfId)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/shelves/${bookshelfId}`
  });
};

export const fetchBooksByUser= (userId)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/users/${userId}`
  });
};

export const fetchLimitedBooks = ()=>{
  return $.ajax({
    method: "GET",
    url: `/api/books`
  });
};

export const createApiBooks = (data)=>{
  return $.ajax({
    method: "POST",
    url: `/api/books/google`,
    data: {google_data: data}
  });
};

export const fetchBooksByQuery = (query)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/search/${query}`
  });
};

export const fetchFromApi = (query) =>{
  return $.ajax({
    method: "GET" ,
    url : "https://www.googleapis.com/books/v1/volumes?q=" + query
  });
};
