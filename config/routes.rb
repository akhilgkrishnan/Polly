Rails.application.routes.draw do
  resources :polls, only: %i[index create show update destroy]
  resources :users, only: %i[create index]
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
