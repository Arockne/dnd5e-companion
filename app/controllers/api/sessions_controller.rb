class Api::SessionsController < ApplicationController

  skip_before_action :authorize, only: :create

  def create
    user = User.where('lower(username) = ?', params[:username]).first
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end
end