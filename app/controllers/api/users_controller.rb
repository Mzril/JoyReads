class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      Bookshelf.create(title: "Read", user_id: @user.id, exclusive: true)
      Bookshelf.create(title: "Currently Reading", user_id: @user.id, exclusive: true)
      Bookshelf.create(title: "Want to Read", user_id: @user.id, exclusive: true)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def show_by_username
    @user = User.find_by(username: params[:username])
    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :profile_url, :password, :session_token)
  end

end
