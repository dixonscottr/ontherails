class TrainsController < ApplicationController

  def update_trains
    data=Net::HTTP.get(URI.parse("http://datamine.mta.info/mta_esi.php?key=5a44f5292fb0076e8f17017858ce3c58"))
    feed = Transit_realtime::FeedMessage.decode(data)

    entities_with_vehicle = feed.entity.select do |item|
      item.vehicle
    end

    entities_with_trip_update = feed.entity.select do |item|
      item.trip_update
    end

    entities = []
    feed.entity.each_with_index do |entity, idx|
      if entity.vehicle
        entities.push({})
        entities[-1][:trip_id] = entity.vehicle.trip.trip_id
        entities[-1][:route_id] = entity.vehicle.trip.route_id
        entities[-1][:timestamp] = Time.at(entity.vehicle.timestamp)
        entities[-1][:stop_id] = entity.vehicle.stop_id
      end
    end

    # debugger



    hashed_entities = find_arrival_departure_times(entities_with_trip_update)
    # debugger
    latest_stops = find_latest_stop(entities_with_trip_update)
    # @stations = hashed_entities.each_with_index do |entity|
    #   stop_to_find = entity[1][:stop_time][0][:stop_id]
    #   Station.where(stop_id: entity[:stop_time][0][:stop_id])
    # end
    render json: hashed_entities

    # debugger
    # @updated_trips = entities
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

    def find_latest_stop(entities_with_trip_update)
      entities = {}
      entities_with_trip_update.each_with_index do |entity, idx|
        # debugger
        entities[idx] = {}
        entities[idx][:stop_id] = entity.trip_update.stop_time_update.first.stop_id
      end
      entities
    end
end
