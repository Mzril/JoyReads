class Book < ApplicationRecord

  validates :title, :description, :author, :isbn_13, presence: true
  validates :isbn_13, uniqueness: true

  has_many :shelvings,
    class_name: :Shelving,
    foreign_key: :book_id,
    dependent: :destroy

end
