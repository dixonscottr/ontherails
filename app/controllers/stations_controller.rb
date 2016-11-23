class StationsController < ApplicationController

  def index
    @stations = Station.all
  end
end
