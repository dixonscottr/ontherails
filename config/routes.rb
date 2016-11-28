Rails.application.routes.draw do
  root to: 'stations#index'
  resources :stations, only: [:index]
  get '/update_trains' => 'trains#update_trains'
  post '/find_previous_station' => 'stupid#find_previous_station'
  get '/update_line_service' => 'stupid#update_line_service'
end
