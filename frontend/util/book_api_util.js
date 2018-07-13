export const fetchBook = (id)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/${id}`
  });
};

export const fetchBookByShelf = (bookshelfId)=>{
  return $.ajax({
    method: "GET",
    url: `/api/books/shelves/${bookshelfId}`
  });
};

export const fetchLimitedBooks = ()=>{
  return $.ajax({
    method: "GET",
    url: `/api/books`
  });
};
