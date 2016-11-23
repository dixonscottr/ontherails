class StationsController < ApplicationController

  def index
    @stations = Station.all
    @lines = []
    # Stationline.pluck(:line_id).uniq.each do |stationline|
      @lines << Stationline.where(line:5).order("created_at").map do |station|
        Station.find(station.station_id)
      # end
    end

  end
end
