class Changebookstable < ActiveRecord::Migration[5.2]
  def change
    remove_column :books, :isbn_13
    add_column :books, :isbn_13, :string
    add_index :books, :isbn_13, unique: true
  end
end
