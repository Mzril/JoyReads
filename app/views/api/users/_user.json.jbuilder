json.user do
  json.extract! user, :id , :username, :bookshelf_ids
end

json.bookshelves do
  json.array! user.bookshelves, partial: 'api/bookshelves/bookshelf.json.jbuilder', as: :bookshelf
end

json.books do
  json.array! user.books, partial: 'api/books/booklimited.json.jbuilder', as: :book
end
