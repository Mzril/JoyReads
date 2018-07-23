class Review < ApplicationRecord
  validates :rating, presence: true
  validates :book_id, uniqueness: {scope: :user_id, message: "one review per user"}

  belongs_to :book
  belongs_to :user
  belongs_to :status

end
