json.review do
  json.extract! @review, :id, :rating, :user_id, :book_id, :body
end

json.status do
  json.extract! @status, :id, :user_id, :book_id, :value
end
