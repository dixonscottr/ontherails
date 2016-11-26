class StationsController < ApplicationController

  def index
    @stations = Station.all
    # @lines = Line.all
    # Stationline.pluck(:line_id).uniq.each do |stationline|
    @routes =Line.getStationsInOrder
    curveId = Point.pluck(:shape_id).uniq
    usingCurves = [curveId[0], curveId[9], curveId[17], curveId[22], curveId[46],curveId[49], curveId[78]]
    @curves = usingCurves.map do |curve|
      Point.where(shape_id: curve).order(:id)
    end

  end
end
