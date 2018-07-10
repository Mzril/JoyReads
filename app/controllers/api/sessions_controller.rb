class Api::SessionsController < ApplicationController

  # before_action :ensure_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      log_in!(@user)
      render json: {id: @user.id, username:@user.username}
    else
      render json: ["Invalid Credentials"], status: 401
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
