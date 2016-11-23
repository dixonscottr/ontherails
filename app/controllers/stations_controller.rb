class StationsController < ApplicationController


  def index
    data=Net::HTTP.get(URI.parse("http://datamine.mta.info/mta_esi.php?key=5a44f5292fb0076e8f17017858ce3c58"))
    feed = Transit_realtime::FeedMessage.decode(data)
    @trains = JSON.parse(feed.to_json)
    @stations = Station.all
  end
end
