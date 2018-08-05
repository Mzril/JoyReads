class Api::StatusesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  def create
    @status = Status.new(status_params)
    if @status.save
      @shelving = Shelving.new(params[:status][:book_id])
      render :show
    else
      render json: @status.errors.full_messages, status: 404
    end
  end

  def update
    @status = Status.find_by(book_id: params[:status][:book_id], user_id: params[:status][:user_id])
    if @status && (@status.value != params[:status][:value])
      @shelving = Shelving.includes(:owner).find(@status.shelving_ids.first)
      array = @shelving.owner.bookshelf_ids;
      @shelving.update(bookshelf_id: array[params[:status][:value]])
      @previous_status = @status.value
      @status.update(status_params)
      debugger
      render :show
    else
      render json: ["Status doesn't exist"]  ,status: 404
    end
  end


  def destroy
    @status= Status.find_by(book_id: params[:status][:book_id], user_id: params[:status][:user_id])
    if @status
      @shelvings = @status.shelvings
      @review = @status.review
      @status.destroy
      render :custshows
    else
      render json: ["Status doesn't exist"] , status: 404
    end
  end

  private
  def status_params
    params.require(:status).permit(:book_id, :user_id, :value)
  end

end
