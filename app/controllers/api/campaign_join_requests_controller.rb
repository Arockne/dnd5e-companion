class Api::CampaignJoinRequestsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  before_action :authorize_join_request, only: [:create]
  before_action :authorize_destroy_request, only: [:destroy]

  def create
    request = CampaignJoinRequest.create!(user: current_user, campaign_id: params[:campaign_id])
    render json: request, status: :ok  
  end

  def destroy
    campaign_join_request.destroy
    render json: campaign_join_request, status: :ok
  end

  private

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize_join_request
    render json: { errors: ['Cannot request to join as the owner'] }, status: :unprocessable_entity if campaign_owner?
    render json: { errors: ['Cannot request to join as a player'] }, status: :unprocessable_entity if player?
  end

  def authorize_destroy_request
    render json: { errors: ['Not authorized'] }, status: :unauthorized unless campaign_owner?
  end

  def campaign_user
    @campaign_user ||= campaign.campaign_users.find_by(user: current_user)
  end

  def player?
    !campaign_user.nil?
  end

  def campaign
    @campaign ||= Campaign.find(params[:campaign_id])
  end

  def campaign_owner?
    current_user == campaign.owner
  end

  def campaign_join_request
    @campaign_join_request ||= CampaignJoinRequest.find(params[:id])
  end

  def render_not_found
    render json: { errors: ['The campaign join request does not exist'] }, status: :not_found
  end
end