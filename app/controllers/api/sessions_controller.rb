class Api::SessionsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy]

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      log_in!(@user)
      render "api/users/show"
    else
      render json: ["Invalid Email/Password"], status: 401
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
