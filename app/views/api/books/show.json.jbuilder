
json.extract! @book, :id, :title, :description, :isbn_13, :published_date
json.photoUrl @book.image_url
