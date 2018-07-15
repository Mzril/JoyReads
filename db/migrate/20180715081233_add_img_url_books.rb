class AddImgUrlBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :image_url, :string
  end
end
