json.shelving do
  json.extract! @shelving, :id, :book_id, :bookshelf_id, :status_id
end

json.status do
  json.extract! @status, :id, :book_id, :user_id, :value
end

json.created do
  @created
end
