class Book < ApplicationRecord

  validates :title, :description, :author, :isbn_13, presence: true
  validates :isbn_13, uniqueness: true

  has_many :shelvings,
    class_name: :Shelving,
    foreign_key: :book_id,
    dependent: :destroy

  def self.in_shelf(id)
    Book.joins(:shelvings).where("shelvings.bookshelf_id = ?", id)
  end

end
