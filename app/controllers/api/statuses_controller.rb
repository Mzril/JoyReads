class Api::StatusesController < ApplicationController

  before_action :ensure_logged_in, only: [:create, :update, :destroy]

  def create
    @status = Status.new(status_params)
    if @status.save
      @shelving = Shelving.create(book_id: params[:status][:book_id], bookshelf_id: params[:status][:bookshelf_id], status_id: @status.id)
      render :show
    else
      render json: @status.errors.full_messages, status: 404
    end
  end

  def update
    @status = Status.includes(:associated_bookshelves).find(params[:id])
    if @status && @status.value != params[:status][:value].to_i
      @shelving = Shelving.find(@status.shelving_ids.min)
      @previous_shelf = @shelving.bookshelf_id;
      array = @status.user.bookshelf_ids.sort
      @shelving.update(bookshelf_id: array[params[:status][:value].to_i])
      @status.update(status_params)
      render :update
    else
      render json: ["Status doesn't exist/Same value"]  ,status: 404
    end
  end

  def destroy
    @status= Status.find(params[:id])
    if @status
      @review = @status.review
      render :custshow
    else
      render json: ["Status doesn't exist"] , status: 404
    end
  end

  private
  def status_params
    params.require(:status).permit(:book_id, :user_id, :value)
  end

end
