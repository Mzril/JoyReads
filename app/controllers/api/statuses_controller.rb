class Api::StatusesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  def create
    @status = Status.new(status_params)
    if @status.save
      render :show
    else
      render json: @status.errors.full_messages, status: 404
    end
  end

  def update
    @status= Status.find_by(book_id: params[:book_id], user_id: params[:user_id])
    if @status && status.update(status_params)
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

end
