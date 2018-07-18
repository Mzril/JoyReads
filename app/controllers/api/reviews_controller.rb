class Api::ReviewsController < ApplicationController

  before_action :ensure_logged_in, only: [:handle :destroy]

  def handle
    @review = Review.find_by(book_id: params[:book_id], user_id: params[:user_id])
    if @review && review.update(review_params)
      render :show
    else
      @review = Review.new(review_params)
      if @review.save
        render :show
      else
        render json: @review.errors.full_messages , status: 411
      end
    end
  end

  def destroy
    @review= Review.find_by(book_id: params[:book_id], user_id: params[:user_id])
    if @review
      @review.destroy
    else
      render json: ["Review doesn't exist"] , status: 404
    end
  end

  private
  def review_params
    params.require(:review).permit(:book_id, :user_id, :rating, :body)
  end

end
