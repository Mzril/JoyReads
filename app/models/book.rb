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

  def avg_score
    reviews = self.reviews
    length = reviews.length
    if length < 1
      return 0
    end
    sum = 0
    reviews.each do |review|
      sum += review.rating
    end
    float = sum/length.to_f
    return float.round(2)
  end

end
