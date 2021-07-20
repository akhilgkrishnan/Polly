Rails.application.routes.draw do
  resources :polls, only: %i[index create show update destroy]
  resources :users, only: %i[create index]
  resource :sessions, only: %i[create destroy]
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
