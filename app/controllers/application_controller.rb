class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    User.includes(:books, :reviews).find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user)
    session[:session_token] = user.reset_session_token
  end

  def logout!
    current_user.reset_session_token
    session[:session_token] = nil
  end

  def ensure_logged_in
    unless logged_in?
      render json: ["You must be logged in"], status: 404
    end
  end
end
