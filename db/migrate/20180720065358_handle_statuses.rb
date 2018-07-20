class HandleStatuses < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :status_id, :integer
    add_column :shelvings, :status_id, :integer
    add_index :reviews, :status_id
    add_index :shelvings, :status_id
  end
end
