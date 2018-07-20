class Status < ApplicationRecord

  validates :value, presence: true, inclusion: {in: [0,1,2]}
  # 0 for Read, 1 for Currently Reading, 2 for Want to Read.
  validates :book_id, uniqueness: {scope: :user_id, message: "one status per user"}

  belongs_to :book
  belongs_to :user

  has_many :shelvings,
    dependent: :destroy

  has_one :review,
    dependent: :destroy

  has_many :associated_bookshelves,
    through: :shelvings,
    source: :bookshelf

end
