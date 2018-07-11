class Api::BookshelvesController < ApplicationController

  before_action :ensure_logged_in, only: [:create]
  before_action :bookshelf_owner, only: [:destroy, :update]

  def index
    @bookshelves = Bookshelf.where(user_id: params[:user_id])
    if @bookshelves
      render :index
    else
      render json: ["Shelves Not Found"], status: 404
    end
  end

  def show
    @bookshelf = Bookshelf.find(params[:id])
    if @bookshelf
      render :show
    else
      render json: ["Shelf Not Found"], status: 404
    end
  end

  def create
    @bookshelf = Bookshelf.new(bookshelf_params)
    @bookshelf.user_id = current_user.id
    if @bookshelf.save
      render :show
    else
      render json: @bookshelf.errors.full_messages, status: 401
    end
  end

  def update
    if @bookshelf.update(bookshelf_params)
      render :show
    else
      render json: @bookshelf.errors.full_messages, status: 401
    end
  end

  def destroy
    if ["Read", "Want to Read", "Currently Reading"].include?(@bookshelf.title)
      render json: ["You cannot destroy default shelves"], status: 401
    else
      @bookshelf.destroy
      render :show
    end
  end

  private
  def bookshelf_params
    params.require(:bookshelf).permit(:title, :book_ids)
  end

  def bookshelf_owner
    @bookshelf = Bookshelf.find(params[:id])
    unless @bookshelf.user == current_user
      render json: ["You Are Not the Owner"], status: 401
    end
  end

end
