class Api::ShelvingsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy, :create, :update]
  before_action :ensure_status_presence, only: [:create]

  def create
    @shelving = Shelving.new(book_id: params[:shelving][:book_id], bookshelf_id: params[:shelving][:bookshelf_id], status_id: @status.id)
    if @shelving.save
      render :show
    else
      render json: ["You already have this book in your shelf"], status: 401
    end
  end

  def update
    @shelving = Shelving.find(params[:id])
    if @shelving
      @previous = {book_id: @shelving.book_id, bookshelf_id: @shelving.bookshelf_id}
      if @shelving.update(shelving_params)
        render :updated
      else
        render json: @shelving.errors.full_messages, status: 401
      end
    else
      render json: ["Can't be found"], status: 404
    end
  end

  def destroy
    @shelving = Shelving.find_by(book_id: params[:book_id], bookshelf_id: params[:bookshelf_id])
    if @shelving
      @shelving.destroy
      render :showlimited
    else
      render json: ["Shelving Doesn't exist"], status: 404
    end
  end

  def ensure_status_presence
    # Micro opt, can't I just look up the user in the state?
    @user = Bookshelf.find(params[:shelving][:bookshelf_id]).user
    @status = Status.find_by(book_id: params[:shelving][:book_id], user_id: @user.id)
    unless @status
      @status = Status.create(book_id: params[:shelving][:book_id], user_id: @user.id, value: 0)
      @status_shelving = Shelving.create(book_id: params[:shelving][:book_id], status_id: @status.id, bookshelf_id: @user.bookshelf_ids.min)
      @created = true
    end
  end

  private
  def shelving_params
    params.require(:shelving).permit(:book_id, :bookshelf_id, :status_id)
  end
end
