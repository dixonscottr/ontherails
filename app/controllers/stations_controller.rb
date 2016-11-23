class StationsController < ApplicationController

  def index

    # feed.entity.each_with_index do |item,i|
    #   p "trip_update #{item.trip_update.stop_time_update[-1].stop_id} #{i}" if item.trip_update
    #   p "vehicle #{item.vehicle.stop_id} #{i}" if item.vehicle
    # end

    # entities_with_trip_update = feed.entity.select do |item|
    #   item if item.trip_update
    # end
    #
    # hashed_entities = find_arrival_departure_times(entities_with_trip_update)

    # departures = x.select do |item|
    #   item if (item.trip_update.stop_time_update[-1].departure == nil)
    # end
    # arrivals = x.select do |item|
    #   item if (item.trip_update.stop_time_update[-1].arrival)
    # end
    #
    # y = feed.entity.select do |item|
    #   item if item.vehicle
    # end

    # byebug
    # @trains = JSON.parse(feed.to_json)
    @stations = Station.all
  end


  # def update_trains
  #   data=Net::HTTP.get(URI.parse("http://datamine.mta.info/mta_esi.php?key=5a44f5292fb0076e8f17017858ce3c58"))
  #   feed = Transit_realtime::FeedMessage.decode(data)
  #
  #   entities_with_trip_update = feed.entity.select do |item|
  #     item if item.trip_update
  #   end
  #
  #   hashed_entities = find_arrival_departure_times(entities_with_trip_update)
  #   @thing = hashed_entities.to_json
  # end


  # private
  #
  # def find_arrival_departure_times(entities_with_trip_update)
  #   entities = {}
  #   entities_with_trip_update.each_with_index do |entity, idx|
  #     entities[idx] = {}
  #     entities[idx][:route_id] = entity.trip_update.trip.route_id
  #     entities[idx][:trip_id] = entity.trip_update.trip.trip_id
  #     entities[idx][:stop_time] = {}
  #     entity.trip_update.stop_time_update.each_with_index do |stop_time, idx_b|
  #       entities[idx][:stop_time][idx_b] = {}
  #       if stop_time.arrival
  #         entities[idx][:stop_time][idx_b][:arrival] = Time.at(stop_time.arrival.time)
  #       end
  #       if stop_time.departure
  #         entities[idx][:stop_time][idx_b][:departure] = Time.at(stop_time.departure.time)
  #       end
  #       entities[idx][:stop_time][idx_b][:stop_id] = stop_time.stop_id
  #     end
  #   end
  #   entities
  # end

  # def parseData()
  #    @trains["entity"].each do |train|
  #      if train.key?("trip_update")
  #        if train["trip_update"].key?("stop_time_update")
  #          prevLoc = train["trip_update"]["stop_time_update"][-2] ;
  #          currentLoc = train["trip_update"]["stop_time_update"][-1];
  #          if currentLoc.key?("departure")
  #          elsif currentLoc.key?("arrival")
  #            station = Station.find_by(stop_id: train["trip_update"]["stop_time_update"][-1]["stop_id"][0..2])
  #            if station
  #             var location = {lat:=station.latitude, lng: =station.longitude};
  #             var marker = new google.maps.Marker({
  #               position: location,
  #               map: map,
  #               title: 'BLURBLURBLURB'
  #             });
  #             bounds.extend(marker.position);
  #            end
  #          end
  #        end
  #      end
  #    end
  # end
end
