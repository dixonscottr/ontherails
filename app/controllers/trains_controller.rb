class TrainsController < ApplicationController

  def update_trains
    uri = URI.parse("http://datamine.mta.info/mta_esi.php?key=#{ENV['mta_key']}")
    response = Net::HTTP.get_response(URI(uri))
    data = Net::HTTP.get(uri)

    if (response.kind_of?(Net::HTTPSuccess))
      feed = Transit_realtime::FeedMessage.decode(data)
      trip_ids_with_vehicle = get_trip_id_array(feed)
      entities_with_vehicles = find_entities_with_vehicles(feed)
      entities_with_trip_update = find_entities_with_trip_update(feed)
      entities_on_tracks = find_entities_on_tracks(entities_with_trip_update, trip_ids_with_vehicle)
      hashed_train_data = find_arrival_departure_times(entities_on_tracks)
      add_timestamp(hashed_train_data, feed)
      render json: hashed_train_data
    else

      error_json = {error: 'inform time stamp'}
      render json: error_json

    end

  end

  def previous_station
    line = params[:line]
    direction = params[:direction]
    stop_id = params[:station]
    timestamp = params[:time].to_i
    lines_to_search = Line.where(line_identifier: line)
    line_found = find_line_running_now(lines_to_search, timestamp)
    prev_stn = line_found.find_previous_station(stop_id, direction)
    hash_to_send = {}
    if prev_stn
      hash_to_send[:prev_station] = prev_stn.stop_id
    end
    render json: hash_to_send
  end

  private

    def find_line_running_now(lines_array, current_unix_time)
      found_lines = lines_array.select do |line|
        ((Time.parse(line.time_start)).to_i < current_unix_time) && ((Time.parse(line.time_stop)).to_i > current_unix_time)
      end
      found_lines.first
    end

    def find_entities_with_vehicles(feed)
      feed.entity.select do |entity|
        entity.vehicle
      end
    end

    def add_timestamp(hashed_entities, feed)
      hashed_entities[:time_updated] = feed.header.timestamp
    end

    def get_trip_id_array(feed)
      feed.entity.map do |entity|
        entity.vehicle.trip.trip_id if entity.vehicle
      end
    end

    def find_entities_on_tracks(entities, trip_id_array)
      entities.select do |entity|
        trip_id_array.compact.include?(entity.trip_update.trip.trip_id)
      end
    end

    def find_entities_with_trip_update(feed)
      feed.entity.select do |entity|
        entity.trip_update
      end
    end

    def find_arrival_departure_times(entities)
      entities_hash = {}
      entities.each_with_index do |entity, idx|
        entities_hash[idx] = {}
        entities_hash[idx][:route_id] = entity.trip_update.trip.route_id
        entities_hash[idx][:trip_id] = entity.trip_update.trip.trip_id
        entities_hash[idx][:stop_time] = {}
        entity.trip_update.stop_time_update.each_with_index do |stop_time, idx_b|
          entities_hash[idx][:stop_time][idx_b] = {}
          if stop_time.arrival
            entities_hash[idx][:stop_time][idx_b][:arrival] = stop_time.arrival.time
          end
          if stop_time.departure
            entities_hash[idx][:stop_time][idx_b][:departure] = stop_time.departure.time
          end
          entities_hash[idx][:stop_time][idx_b][:stop_id] = stop_time.stop_id
        end
      end
      entities_hash
    end

    def find_latest_stop(entities_with_trip_update)
      entities = {}
      entities_with_trip_update.each_with_index do |entity, idx|
        entities[idx] = {}
        entities[idx][:stop_id] = entity.trip_update.stop_time_update.first.stop_id
      end
      entities
    end
end
