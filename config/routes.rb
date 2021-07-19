Rails.application.routes.draw do
  resources :polls, only: %i[index create show]
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
