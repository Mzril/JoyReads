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

book1 = Book.new(title: "Nintendo", description: "Examines the company Nintendo and the people who took it from a card company to a leader in the video gaming world." ,author: "Mary Firestone", isbn_13: "978167148095", published_date: "2011-01-01")
file1 = EzDownload.open('https://books.google.com/books/content?id=Cp2iohZHy8oC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
book1.photo.attach(io: file1, filename: 'book1.jpg')
book1.save

shelving1 = Shelving.create(book_id: book1.id, bookshelf_id: shelf9.id)
