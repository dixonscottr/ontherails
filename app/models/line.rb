class Line < ApplicationRecord
  has_many :stationlines
  has_many :stations, through: :stationlines
end
