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


  def find_previous_station(stop_id, direction)
    current_station_line = Stationline.find_by(line: self, station: Station.find_by(stop_id: stop_id))
    if direction == 'N'
      Stationline.find(current_station_line.id + 1).station
    else
      Stationline.find(current_station_line.id - 1).station
    end
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
