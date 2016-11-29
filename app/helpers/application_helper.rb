module ApplicationHelper

  def convertStations(stations)
    stations_hash = stations.map do |station|
      {
        stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f},
        stop_id: station.stop_id,
        train_lines: station.train_lines,
        name: station.name
      }
    end
    stations_hash.to_json.html_safe
  end

  def convertRoutes(routes)
    routes.map do |route|
      {line_identifier: route[:line_identifier], stations: route[:stations].map do |station|
        {stationPos: {lat: station.latitude.to_f, lng: station.longitude.to_f}, stop_id: station.stop_id, train_lines: station.train_lines}
      end}
    end.to_json.html_safe
  end

  def convertCurves(curves)
    train_routes={"1..N03R" => "1",
                  "2..N01R" => "2",
                  "3..N01R" => "3",
                  "4..N01R" => "4",
                  "5..N02R" => "5X",
                  "5..N06R" => "5",
                  "6..N02R" => "6"}
    curve_points = curves.map.with_index do |points, i|
      {
        curveId: train_routes[points[0].shape_id],
        coordinates: points.map { |point| {lat: point.latitude, lng: point.longitude} }
      }
    end
    curve_points.to_json.html_safe
  end

  def convertTimes(times)
    train_routes=["1","2","3","4","5","5X","6"]
    debugger
    time_hash = times.map.with_index do |time, i|
      {
        line_id: train_routes[i],
        data: time.map { |x| {time: x.time, stop_id: x.stop_id} }
      }
    end
    time_hash.to_json.html_safe
  end

end
