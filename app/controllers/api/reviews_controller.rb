class Api::ReviewsController < ApplicationController

  before_action :ensure_logged_in, only: [:handle, :destroy, :update]
  before_action :ensure_status_presence, only: [:handle, :create]

  def handle
    @review = Review.find_by(book_id: params[:review][:book_id], user_id: params[:review][:user_id])
    if @review && @review.update(review_params)
      render :show
    else
      @review = Review.new(rating: params[:review][:rating], book_id: params[:review][:book_id], user_id: params[:review][:user_id], status_id: @status.id)
      if @review.save
        render :show
      else
        render json: @review.errors.full_messages , status: 411
      end
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review && @review.update(review_params)
      render :update
    else
      render json: @review.errors.full_messages , status: 411
    end
  end

  def destroy
    @review = Review.find_by(book_id: params[:review][:book_id], user_id: params[:review][:user_id])
    if @review
      @review.destroy
      render :showdestroyed
    else
      render json: ["Review doesn't exist"] , status: 404
    end
  end

  def ensure_status_presence
    @status = Status.find_by(book_id: params[:review][:book_id], user_id: params[:review][:user_id])
    unless @status
      @status = Status.create(book_id: params[:review][:book_id], user_id: params[:review][:user_id], value: 0)
      @shelving = Shelving.create(status_id: @status.id, book_id: params[:review][:book_id], bookshelf_id: User.find(params[:review][:user_id]).bookshelf_ids.first)
      @review = Review.create(rating: params[:review][:rating], book_id: params[:review][:book_id], user_id: params[:review][:user_id], status_id: @status.id)
      render :showshelving
    end
  end

  private
  def review_params
    params.require(:review).permit(:book_id, :user_id, :rating, :body)
  end

end
