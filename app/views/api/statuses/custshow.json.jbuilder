
json.bookshelf_ids @status.associated_bookshelf_ids

json.status do
  json.extract! @status, :id, :book_id, :user_id, :value
end

if @review
  json.review do
    json.extract! @review, :id, :rating, :user_id, :book_id, :body
  end
end

@status.destroy
