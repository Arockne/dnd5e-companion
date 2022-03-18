class Api::CharactersController < ApplicationController

  def index
    characters = current_user.characters
    render json: characters, status: :ok
  end

  def create
    if membership || owner?
      character = current_user.characters.new(character_params)
      if character.save
        render json: character, status: :created, serializer: CharacterShowSerializer
      else
        render json: { errors: character.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
    end
  end

  private

  def character_params
    params.require(:character).permit(:name, :background, :race, :profession, :alignment, :experience, :strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma, :image_url, :campaign_id)
  end
  
  def campaign
    @campaign ||= character_params[:campaign_id] && Campaign.find_by(id: character_params[:campaign_id])
  end

  def membership
    @membership ||= current_user.campaign_users.find_by(campaign: campaign)
  end

  def owner?
    campaign.owner == current_user unless campaign.nil?
  end

end
