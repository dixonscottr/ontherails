class StationsController < ApplicationController

  def index
    @stations = Station.all
    # @lines = Line.all
    # Stationline.pluck(:line_id).uniq.each do |stationline|
    @routes =Line.getStationsInOrder
    curveId = Point.pluck(:shape_id).uniq

    @curves = curveId.map do |curve|
      Point.where(shape_id: curve).order(:id)
    end

  end
end
