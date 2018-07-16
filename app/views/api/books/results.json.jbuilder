json.array! @books do |book|
  json.extract! book, :id, :title, :description, :isbn_13, :published_date, :author
  json.photoUrl book.image_url
end
