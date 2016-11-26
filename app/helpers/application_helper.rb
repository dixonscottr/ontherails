module ApplicationHelper
  def convertStations(stations)
    stations.map do |station|
      {stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f}, stop_id: station.stop_id, train_lines: station.train_lines}
    end.to_json.html_safe
  end

  def convertRoutes(routes)
    routes.map do |route|
      {line_identifier: route[:line_identifier], stations: route[:stations].map do |station|
        {stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f}, stop_id: station.stop_id, train_lines: station.train_lines}
      end}
    end.to_json.html_safe
  end
  def convertCurves(curves)
    arrayval=["1","2","3","4","5","5x","6"]
    curves.map.with_index do |points, i|
      {curveId: arrayval[i], coordinates: points.map do |point|
        {lat: point.latitude, lng: point.longitude}
      end}
    end.to_json.html_safe
  end

end
