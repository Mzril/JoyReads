class Bookshelf < ApplicationRecord

  validates :title, presence: true
  validates :title, uniqueness: {scope: :user_id}

  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id

end
