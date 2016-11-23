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
end
