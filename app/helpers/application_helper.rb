module ApplicationHelper
  def convertStations(stations)
    stations.map do |station|
      {stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f}, stop_id: station.stop_id, train_lines: station.train_lines}
    end.to_json.html_safe
  end

  def convertRoutes(routes)
    routes.map do |route|
      route.map do |station|
        {stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f}, stop_id: station.stop_id, train_lines: station.train_lines}
      end
    end.to_json.html_safe
  end
end
