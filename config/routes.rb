Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get '/me', to: 'users#show'
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/campaigns/currently_owned', to: 'campaigns#currently_owned'
    get '/campaigns/currently_playing', to: 'campaigns#currently_playing'
    resources :campaigns, only: [:index, :show, :create, :update, :destroy] do
      get '/players', to: 'campaigns#players'
      patch '/password', to: 'campaigns#password_update'
      resources :campaign_users, only: [:create, :destroy]
      resources :characters, only: [:show, :create, :update, :destroy] do
        resources :character_profiles, only: [:update]
      end
      resources :campaign_join_requests, only: [:index, :create, :destroy] do
        post '/accept', to: 'campaign_join_requests#accept'
      end
    end
    resources :characters, only: [:index]
  end

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
