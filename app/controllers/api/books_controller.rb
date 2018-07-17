class Api::BooksController < ApplicationController

  before_action :ensure_logged_in, only: [:create]

  def index
    @books = Book.all.order("id DESC")
    unless @books.empty?
      render :results
    else
      render json: ["Books Not Found"], status: 404
    end
  end

  def user
    @user = User.includes(:books).find(params[:user_id])
    if @user.books
      render "api/users/show"
    else
      render json: ["No Such User"], status: 404
    end
  end

  def search
    @books = Book.where("title LIKE ?", "#{params[:title]}%")
    unless @books.empty?
      render :index
    else
      render json: ["Books Not Found"], status: 404
    end
  end

  def shelf
    @books = Book.in_shelf(params[:bookshelf_id])

    unless @books.empty?
      render :index
    else
      render json: ["Books Not Found"], status: 404
    end
  end

  def show
    @book = Book.find(params[:id])
    if @book
      render :show
    else
      render json: ["Book Not Found"], status: 404
    end
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render :show
    else
      render json: @book.errors.full_messages , status: 411
    end
  end

  def create_from_api
    @book_array = params[:google_data].values
    @books = []
    Book.transaction do
      begin
        @book_array.each do |book|
          next unless book["volumeInfo"]["authors"] && book["volumeInfo"]["description"] && book["volumeInfo"]["industryIdentifiers"] && book["volumeInfo"]["imageLinks"]
          httpsurl = book["volumeInfo"]["imageLinks"]["thumbnail"].insert(4,"s")
          isbn_13 = book["volumeInfo"]["industryIdentifiers"].values.select {|hash| hash["type"] = "ISBN_13"}[0]["identifier"]
          created_book = Book.create!(title: book["volumeInfo"]["title"],
            description: book["volumeInfo"]["description"], author: book["volumeInfo"]["authors"][0],
            published_date: book["volumeInfo"]["publishedDate"], isbn_13: isbn_13, image_url: book["volumeInfo"]["imageLinks"]["thumbnail"])
          # book_image = EzDownload.open(book["volumeInfo"]["imageLinks"]["thumbnail"])
          # created_book.photo.attach(io: book_image, filename: "#{book["etag"]}.jpg")
          # created_book.save!
          @books.push(created_book)
        end

        render :results
      rescue ActiveRecord::RecordInvalid => invalid
        render json: ["Book/Books already exist"], status: 411
      end
    end
  end

  private
  def book_params
    params.require(:book).permit(:title, :description, :isbn_13, :author, :published_date,:review_ids)
  end

end
