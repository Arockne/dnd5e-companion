require 'rails_helper'

RSpec.describe "Api::CampaignUsers", type: :request do
  let(:user_1) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      password: 'test1234'
    )
  end
    
  let(:user_2) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      password: 'test1234'
    )
  end

  let(:user_3) do
    User.create!(
      username: 'sam',
      email: 'sam@gmail.com',
      password: 'test1234'
    )
  end

  let!(:campaign_1) do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'Somewhere in Camelot', 
      owner: user_1, 
    )
  end

  let!(:campaign_2) do
    Campaign.create!(
      name: 'Star Wards', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'In a hospital far far away', 
      owner: user_2,
    )
  end

  let!(:campaign_3) do
    Campaign.create!(
      name: 'The Unending Maze', 
      image_url: 'https://cdnb.artstation.com/p/assets/images/images/023/999/093/large/gregory-nunkovics-dark-fantasy-landscape.jpg?1580994868',
      setting: 'The maze keeps going on and on and on and...', 
      owner: user_3,
    )
  end

  let!(:campaign_1_user_2) do
    CampaignUser.create!(
      campaign_id: campaign_1.id,
      user_id: user_2.id
    )
  end

  let!(:campaign_1_user_3) do
    CampaignUser.create(
      campaign_id: campaign_1.id,
      user_id: user_3.id
    )
  end
  
  let!(:campaign_2_user_1) do
    CampaignUser.create!(
      campaign_id: campaign_2.id,
      user_id: user_1.id
    )
  end

  let!(:campaign_2_user_3) do
    CampaignUser.create!(
      campaign_id: campaign_2.id,
      user_id: user_3.id
    )  
  end

  let!(:character_1_campaign_2_user_1) do
    Character.create!(
      name: 'Ally',
      background: 'Merchant',
      race: 'Orc',
      klass: 'Barbarian',
      alignment: 'Neutral',
      experience: 0,
      image_url: 'https://i.pinimg.com/736x/4c/bf/af/4cbfafee43753bcf121ccf636c034a7a.jpg',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      visible: false,
      user: user_1,
      campaign: campaign_2
    )
  end

  let!(:character_2_campaign_2_user_1) do
    Character.create!(
      name: 'Gimly',
      background: 'Noble',
      race: 'Elf',
      klass: 'Wizard',
      alignment: 'Neutral Good',
      experience: 0,
      image_url: 'https://i.pinimg.com/736x/4c/bf/af/4cbfafee43753bcf121ccf636c034a7a.jpg',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      user: user_1,
      campaign: campaign_2
    )
  end

  let!(:character_1_campaign_1_user_1) do
    Character.create!(
      name: 'Frodo',
      background: 'Sitter',
      race: 'Gnome',
      klass: 'Theif',
      alignment: 'Neutral Good',
      experience: 0,
      image_url: 'https://i.pinimg.com/736x/4c/bf/af/4cbfafee43753bcf121ccf636c034a7a.jpg',
      strength: (rand(1..6) * 3),
      dexterity: (rand(1..6) * 3),
      constitution: (rand(1..6) * 3),
      intelligence: (rand(1..6) * 3),
      wisdom: (rand(1..6) * 3),
      charisma: (rand(1..6) * 3),
      user: user_2,
      campaign: campaign_1
    )
  end

  describe 'DELETE /campaign_users/:id' do
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password}
      end

      context 'not as the campaign owner' do
        context 'removing themselves from a campaign' do
          it 'decreases the amount of CampaignUser' do
            expect { delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_1.id}" }.to change(CampaignUser, :count).by(-1)
          end
          
          it 'removes the associated characters' do
            delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_1.id}"
            expect(Character.where(campaign: campaign_2, user: user_1)).to be_empty
          end
  
          it 'returns the CampaignUser' do
            delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_1.id}"
            expect(response.body).to include_json({
              id: campaign_2_user_1.id,
              user_id: campaign_2_user_1.user_id,
              campaign_id: campaign_2_user_1.campaign_id
            })
          end

          it 'returns a status of 200 (Ok)' do
            delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_1.id}"
            expect(response).to have_http_status(:ok)
          end
        end

        context 'removing others from a campaign' do
          it 'does not decrease amount of CampaignUser' do
            expect { delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_3.id}" }.to_not change(CampaignUser, :count)
          end

          it 'returns a status of 401 (Unauthorized)' do
            delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_3.id}"
            expect(response).to have_http_status(:unauthorized)
          end

          it 'returns error messages' do
            delete "/api/campaigns/#{campaign_2.id}/campaign_users/#{campaign_2_user_3.id}"
            expect(response.body).to include_json({
              errors: a_kind_of(Array)
            })
          end
        end
      end

      context 'as the campaign owner' do
        context 'removing users' do
          it 'decreases the amount of CampaignUser' do
            expect { delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}" }.to change(CampaignUser, :count).by(-1)
          end

          it 'removes the associated characters' do
            delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}"
            expect(Character.where(campaign: campaign_1, user: user_2)).to be_empty
          end

          it 'returns the CampaignUser' do
            delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}"
            expect(response.body).to include_json({
              id: campaign_1_user_2.id,
              user_id: campaign_1_user_2.user_id,
              campaign_id: campaign_1_user_2.campaign.id
            })
          end

          it 'returns a status of 200 (Ok)' do
            delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}"
            expect(response).to have_http_status(:ok)
          end
        end
      end
    end

    context 'without logged in user' do
      it 'returns a status of 401 (Unauthorized)' do
        delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}"
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns error messsages' do
        delete "/api/campaigns/#{campaign_1.id}/campaign_users/#{campaign_1_user_2.id}"
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end
end
