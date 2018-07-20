class AddExclusivetoBokshelf < ActiveRecord::Migration[5.2]
  def change
    add_column :bookshelves, :exclusive, :boolean, default: false
  end
end
