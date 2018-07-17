class User < ApplicationRecord

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_many :bookshelves,
    class_name: "Bookshelf",
    foreign_key: :user_id,
    dependent: :destroy

  has_many :books, -> { distinct },
    through: :bookshelves,
    source: :books

  has_many :reviews,
    dependent: :destroy

  has_one_attached :photo

  attr_reader :password
  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return @user if @user && @user.is_password?(password)
    return nil
  end

  def ensure_session_token
    self.session_token||= self.class.generate_session_token
  end

  def reset_session_token
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest= BCrypt::Password.create(password)
  end
end
