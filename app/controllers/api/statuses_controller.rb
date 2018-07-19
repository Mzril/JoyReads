class Api::StatusesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  def create
    @status = Status.new(status_params)
    if @status.save
      @relatedshelf = User.find(params[:status][:user_id])).bookshelf_ids[params[:status][:status]]
      @shelving = @shelving.new(bookshelf_id: )
      render :show
    else
      render json: @status.errors.full_messages, status: 404
    end
  end

  def update
    @status= Status.find_by(book_id: params[:status][:book_id], user_id: params[:status][:user_id])
    if @status
      @status.update(status_params)
      render :show
    else
      render json: ["Status doesn't exist"]  ,status: 404
    end
  end

  def destroy
    @status= Status.find_by(book_id: params[:book_id], user_id: params[:user_id])
    if @status
      @status.destroy
    else
      render json: ["Status doesn't exist"] , status: 404
    end
  end

  private
  def status_params
    params.require(:status).permit(:book_id, :user_id, :status)
  end

end
