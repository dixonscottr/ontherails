class StationsController < ApplicationController

  def index
    @stations = Station.all
    # @lines = Line.all
    # Stationline.pluck(:line_id).uniq.each do |stationline|
    @routes =Line.getStationsInOrder

  end
end
