json.user do
  json.extract! user, :id , :username, :bookshelf_ids, :book_ids, :review_ids, :status_ids
end

json.bookshelves do
  json.array! user.bookshelves, partial: 'api/bookshelves/bookshelf.json.jbuilder', as: :bookshelf
end

json.books do
  json.array! user.books, partial: 'api/books/booklimited.json.jbuilder', as: :book
end

json.reviews do
  json.array! user.reviews, partial: 'api/reviews/review.json.jbuilder', as: :review
end

json.statuses do
  json.array! user.statuses, partial: 'api/statuses/status.json.jbuilder', as: :status
end
