require 'rails_helper'

RSpec.describe "Campaigns", type: :request do
  let!(:user_1) do 
    User.create!(
      username: 'arthur',
      email: 'arthur@camelot.com',
      email_confirmation: 'arthur@camelot.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end
    
  let!(:user_2) do
    User.create!(
      username: 'bob',
      email: 'bob@gmail.com',
      email_confirmation: 'bob@gmail.com', 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  before do
    Campaign.create!(
      name: 'Knights of the Round Table', 
      setting: 'Somewhere in Camelot', 
      owner: user_1, 
      password: 'king', 
      password_confirmation: 'king'
    )
    Campaign.create!(
      name: 'Star Wards', 
      setting: 'In a hospital far far away', 
      owner: user_2, 
      password: 'test123', 
      password_confirmation: 'test123'
    )
  end

  describe "GET /index" do
    context 'with logged in user' do
      before do
        post '/api/login', params: { username: user_1.username, password: user_1.password }
      end

      it 'returns all the campaigns with owner' do
        get '/api/campaigns'
        expect(response.body).to include_json([
          {
            id: a_kind_of(Integer),
            name: 'Knights of the Round Table',
            owner: {
              id: a_kind_of(Integer),
              username: user_1.username
            }
          },
          {
            id: a_kind_of(Integer),
            name: 'Star Wards',
            owner: {
              id: a_kind_of(Integer),
              username: user_2.username
            }
          }
        ])
      end

      it 'returns a status of 200 (ok)' do
        get '/api/campaigns'
        expect(response).to have_http_status(:ok)
      end

    end

    context 'without logged in user' do
      it 'returns a status of 401 (Unauthorized)' do
        get '/api/campaigns'
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns error messages' do
        get '/api/campaigns'
        expect(response.body).to include_json({
          errors: a_kind_of(Array)
        })
      end
    end
  end
end
