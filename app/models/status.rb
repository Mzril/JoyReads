class Status < ApplicationRecord

  validates :status, presence: true, inclusion: {in: [0,1,2]}
  validates :book_id, uniqueness: {scope: :user_id, message: "one status per user"}

  belongs_to :book
  belongs_to :user

end
