class Api::ShelvingsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy, :create, :update]

  def create
    @shelving = Shelving.new(shelving_params)
    if @shelving.save
      render :show
    else
      render json: ["Cannot Create"], status: 401
    end
  end

  def create
    @shelving = Shelving.find(params[:id])
    if @shelving && @shelving.update(shelving_params)
      render :show
    else
      render json: ["Cannot Update"], status: 401
    end
  end

  def destroy
    @shelving = Shelving.find(params[:id])
    @shelving.destroy
    render :show
  end

  private
  def shelving_params
    params.require(:shelving).permit(:book_id, :bookshelf_id)
  end
end
