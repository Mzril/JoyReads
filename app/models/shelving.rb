class Shelving < ApplicationRecord


  validates :book_id, :bookshelf_id, :status_id, presence: true
  validates :book_id, uniqueness: {scope: :bookshelf_id, message: "can't have multiple books of same title"}

  belongs_to :bookshelf
  belongs_to :book
  belongs_to :status

  has_one :owner,
    through: :bookshelf,
    source: :user

end
