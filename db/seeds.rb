# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Bookshelf.destroy_all
Book.destroy_all
Shelving.destroy_all
Review.destroy_all
Status.destroy_all

user1 = User.create(username: "Mzril", email: "wnbs36@gmail.com", password: "password1")
user2 = User.create(username: "Beepo", email: "beepo@gmail.com", password: "password1")
user3 = User.create(username: "Morty", email: "morty@gmail.com", password: "password1")

shelf1 = Bookshelf.create(title: "Read", user_id: user1.id)
shelf2 = Bookshelf.create(title: "Currently Reading", user_id: user1.id)
shelf3 = Bookshelf.create(title: "Want to Read", user_id: user1.id)
shelf4 = Bookshelf.create(title: "Read", user_id: user2.id)
shelf5 = Bookshelf.create(title: "Currently Reading", user_id: user2.id)
shelf6 = Bookshelf.create(title: "Want to Read", user_id: user2.id)
shelf7 = Bookshelf.create(title: "Read", user_id: user3.id)
shelf8 = Bookshelf.create(title: "Currently Reading", user_id: user3.id)
shelf9 = Bookshelf.create(title: "Want to Read", user_id: user3.id)
shelf10 = Bookshelf.create(title: "Favorites", user_id: user1.id)
