class Book < ApplicationRecord

  validates :title, :description, :author, :isbn_13, :image_url, presence: true
  validates :isbn_13, uniqueness: true

  has_many :shelvings,
    class_name: :Shelving,
    foreign_key: :book_id,
    dependent: :destroy

  has_many :reviews,
    dependent: :destroy

  has_many :reviewed_users,
    through: :reviews,
    source: :user

  has_many :statuses,
    dependent: :destroy

  # has_one_attached :photo

  def self.in_shelf(id)
    Book.joins(:shelvings).where("shelvings.bookshelf_id = ?", id)
  end

  def average_score
    length = self.reviews.where.not(rating: null).length
    if length < 1
      return ""
    end
    sum = 0
    self.reviews.where.not(rating: null).each do |review|
      sum += review.rating
    end
    return sum/length
  end

end
