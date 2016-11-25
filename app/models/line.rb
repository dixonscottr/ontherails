class Line < ApplicationRecord
  # scope :getStationsInOrder
  has_many :stationlines
  has_many :stations, through: :stationlines

  def self.getStationsInOrder
    self.all.map do |line|
      line.stationlines.order('created_at').map do |station|
        Station.find(station.station_id)
      end
    end
  end


  def find_previous_station(stop_id, direction)
    station = Station.find_by(stop_id: stop_id)
    ordered_stations = self.stationlines.order('created_at').map do |station|
      Station.find(station.station_id)
    end
    if direction == 'N'
        if (ordered_stations.index(station))
          ordered_stations[ordered_stations.index(station) + 1]
        else
          false
        end
    else
      if (ordered_stations.index(station))
        ordered_stations[ordered_stations.index(station) - 1]
      else
        false
      end
    end
  end
end
