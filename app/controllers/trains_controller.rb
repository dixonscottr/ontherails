class TrainsController < ApplicationController

  def update_trains
    data=Net::HTTP.get(URI.parse("http://datamine.mta.info/mta_esi.php?key=5a44f5292fb0076e8f17017858ce3c58"))
    feed = Transit_realtime::FeedMessage.decode(data)

    entities_with_trip_update = feed.entity.select do |item|
      item if item.trip_update
    end

    hashed_entities = find_arrival_departure_times(entities_with_trip_update)
    # updated_stations = hashed_entities.map do |entity|
    #   entity[:stop_time][entity.length-1][:stop_id]
    # end
    # debugger;
    render json: hashed_entities
  end

  private

  def find_arrival_departure_times(entities_with_trip_update)
    entities = {}
    entities_with_trip_update.each_with_index do |entity, idx|
      entities[idx] = {}
      entities[idx][:route_id] = entity.trip_update.trip.route_id
      entities[idx][:trip_id] = entity.trip_update.trip.trip_id
      entities[idx][:stop_time] = {}
      entity.trip_update.stop_time_update.each_with_index do |stop_time, idx_b|
        entities[idx][:stop_time][idx_b] = {}
        if stop_time.arrival
          entities[idx][:stop_time][idx_b][:arrival] = Time.at(stop_time.arrival.time)
        end
        if stop_time.departure
          entities[idx][:stop_time][idx_b][:departure] = Time.at(stop_time.departure.time)
        end
        entities[idx][:stop_time][idx_b][:stop_id] = stop_time.stop_id
      end
    end
    entities
  end
end
