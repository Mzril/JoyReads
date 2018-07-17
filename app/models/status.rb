class Status < ApplicationRecord

  validates :status, presence: true, inclusion: {in: [1,2,3]}
  # One for Read, 2 for Currently Reading, 3 for Want to Read.
  validates :book_id, uniqueness: {scope: :user_id, message: "one status per user"}

  belongs_to :book
  belongs_to :user

end
