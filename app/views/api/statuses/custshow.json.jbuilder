
json.bookshelf_ids do
  json.extract! @status.associated_bookshelf_ids
end

json.status do
  json.extract! @status, :id, :book_id, :user_id, :value
end

if @review
  json.review do
    json.extract! @review, :id, :rating, :user_id, :book_id, :body
  end
end
