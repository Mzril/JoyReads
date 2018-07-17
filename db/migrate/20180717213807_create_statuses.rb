class CreateStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :statuses do |t|
      t.integer :value, null: false
      t.integer :book_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :statuses, :user_id
    add_index :statuses, [:user_id, :book_id], unique: true;
  end
end
