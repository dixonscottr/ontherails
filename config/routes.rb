Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'stations#index'
  resources :stations
  get '/update_trains' => 'trains#update_trains'
  post '/previous_station' => 'trains#previous_station'

end
