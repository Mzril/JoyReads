class CreateShelvings < ActiveRecord::Migration[5.2]
  def change
    create_table :shelvings do |t|
      t.integer :book_id, null:false
      t.integer :bookshelf_id, null:false

      t.timestamps
    end
    add_index :shelvings, :book_id
    add_index :shelvings, [:book_id, :bookshelf_id], unique: true
  end
end
