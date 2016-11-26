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

  def convertTimes(times)
    arrayval=["1","2","3","4","5","5x","6"]
    times.map.with_index do |time, i|
      {line_id: arrayval[i], data: time.map do |x|
        {time: x.time, stop_id: x.stop_id}
      end}
    end.to_json.html_safe
  end

  def timed_auto_update
    sleep 10 #seconds
    update_trains
    # Wow I thought this would be, like, a huge contribution. Stupid Ruby and it's concise code.
  end

end
