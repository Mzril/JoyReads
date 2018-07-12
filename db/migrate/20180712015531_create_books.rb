class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :author, null: false
      t.integer :isbn_13, null: false
      t.date :published_date

      t.timestamps
    end
    add_index :books, :isbn_13, unique: true
  end
end
