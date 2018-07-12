class Api::BooksController < ApplicationController

  before_action :ensure_logged_in, only: [:create]

  def index
    @books = Books.all
    if @books
      render :index
    else
      render json: ["Books Not Found"], status: 404
    end
  end

  def show
    @book = Bookshelf.find(params[:id])
    if @book
      render :show
    else
      render json: ["Book Not Found"], status: 404
    end
  end

  private
  def book_params
    params.require(:book).permit(:title, :review_ids)
  end

end
