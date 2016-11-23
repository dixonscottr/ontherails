class Station < ApplicationRecord

  # validates :division, uniqueness: { scope: [:name, :line] }
  # validate :trains_at_station
  #
  # def trains_at_station
  #   if ([r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11] & ["1","2","3","4","5","6","L"]).empty?
  #     errors.add(:train_invalid, "no valid trains go to this station")
  #   end
  # end
  has_many :stationlines
  has_many :lines, through: :stationlines

  validates :latitude, uniqueness: { scope: :longitude }

  validate :trains_at_station

  def trains_at_station
    if ([stop_id[0]] & ["1","2","3","4","5","6","L"]).empty?
      errors.add(:train_invalid, "no valid trains go to this station")
    end
  end
end
