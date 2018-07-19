json.book do
  json.extract! @book, :id, :title, :description, :isbn_13, :published_date, :author, :review_ids, :avg_score
  json.photoUrl @book.image_url
end

json.users do
  json.array! @book.reviewed_users do |user|
    json.extract! user, :id , :username
  end
end

json.reviews do
  json.array! @book.reviews do |review|
    json.extract! review, :id, :rating, :body, :user_id, :book_id
  end
end
