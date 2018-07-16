json.extract! :id :book_id, :bookshelf_id

json.previous_book @previous[:book_id]
json.previous_shelf @previous[:bookshelf_id]
