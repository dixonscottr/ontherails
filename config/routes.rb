Rails.application.routes.draw do
  root to: 'stations#index'
  resources :stations, only: [:index]
  get '/update_trains' => 'trains#update_trains'
  post '/find_previous_station' => 'lines#find_previous_station'
end
