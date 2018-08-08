json.shelving do
  json.extract! @shelving, :id, :book_id, :bookshelf_id, :status_id
end

if @created
  json.status do
    json.extract! @status, :id, :book_id, :user_id, :value
  end

  json.status_shelving do
    json.extract! @status_shelving, :id, :book_id, :bookshelf_id
  end
end
