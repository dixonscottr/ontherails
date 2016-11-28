class Line < ApplicationRecord
  # scope :getStationsInOrder
  has_many :stationlines
  has_many :stations, through: :stationlines

  def self.getStationsInOrder
    self.all.map do |line|
      {line_identifier: line.line_identifier, stations: line.stationlines.order('created_at').map do |station|
        Station.find(station.station_id)
      end}
    end
  end


  def poopsicle(stop_id, direction)
    # curS = Station.find_by(stop_id: stop_id).id
    # current_station_line = Stationline.find_by(line_id: self.id.to_s, station_id: curS)
    # if !current_station_line
    #   if self.id == 17
    #     current_station_line = Stationline.find_by(line_id: "18", station_id: curS)
    #   elsif self.id ==18
    #     current_station_line = Stationline.find_by(line_id: "17", station_id: curS)
    #   else
    #   end
    #   debugger
    # end
    # curSLid = current_station_line.id
    #
    # if direction == 'N'
    #   Stationline.find(curSLid + 1).station
    # else
    #   Stationline.find(current_station_line.id - 1).station
    # end
  end

    # station = Station.find_by(stop_id: stop_id)
    # ordered_stations = self.stationlines.order('created_at').map do |station|
    #   Station.find(station.station_id)
    # end
    # if direction == 'N'
    #     if (ordered_stations.index(station))
    #       ordered_stations[ordered_stations.index(station) + 1]
    #     else
    #       false
    #     end
    # else
    #   if (ordered_stations.index(station))
    #     ordered_stations[ordered_stations.index(station) - 1]
    #   else
    #     false
    #   end
    # end
end
