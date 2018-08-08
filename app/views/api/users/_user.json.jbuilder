json.bookshelves do
  json.array! user.bookshelves, partial: 'api/bookshelves/bookshelf.json.jbuilder', as: :bookshelf
end

bookInfo = {}

user.book_ids.each do |book_id|
  bookInfo[book_id] = {}
end

user.statuses.each do |status|
  bookInfo[status.book_id]["statusId"] = status.id
end

user.reviews.each do |review|
  bookInfo[review.book_id]["reviewId"] = review.id
end

json.statuses do
  json.array! user.statuses, partial: 'api/statuses/status.json.jbuilder', as: :status
end

json.books do
  json.array! user.books, partial: 'api/books/booklimited.json.jbuilder', as: :book
end

json.reviews do
  json.array! user.reviews, partial: 'api/reviews/review.json.jbuilder', as: :review
end

json.user do
  json.extract! user, :id , :username, :book_ids, :review_ids, :status_ids
  json.bookshelf_ids user.bookshelf_ids.sort
  json.bookInfo bookInfo
end
