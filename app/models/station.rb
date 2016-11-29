class Station < ApplicationRecord

  has_many :stationlines
  has_many :lines, through: :stationlines

  validates :latitude, uniqueness: { scope: :longitude }

  validate :trains_at_station

  def terminal_station?
    self.lines.any? do |line|
      line.stations_in_order.first == self || line.stations_in_order.first == self
    end
  end

  def trains_at_station
    if ([stop_id[0]] & ["1","2","3","4","5","6"]).empty?
      errors.add(:train_invalid, "no valid trains go to this station")
    end
  end
end
