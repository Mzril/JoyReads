json.status do
  json.extract! @status, :id, :user_id, :book_id, :value
end

json.shelving do
  json.extract! @shelving, :id, :bookshelf_id, :book_id, :status_id
end

json.previous_shelf @previous_shelf
