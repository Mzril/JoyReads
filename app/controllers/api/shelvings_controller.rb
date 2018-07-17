class Api::ShelvingsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy, :create, :update]

  def create
    @shelving = Shelving.new(shelving_params)
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
      render :show
    else
      render json: ["Shelving Doesn't exist"], status: 404
    end
  end

  private
  def shelving_params
    params.require(:shelving).permit(:book_id, :bookshelf_id)
  end
end
