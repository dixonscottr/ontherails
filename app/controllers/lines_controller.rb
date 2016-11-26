class LinesController < ApplicationController

    def find_previous_station
      line = params[:line]
      direction = params[:direction]
      stop_id = params[:station]
      timestamp = params[:time].to_i
      lines_to_search = Line.where(line_identifier: line)
      line_found = find_current_running_line(lines_to_search, timestamp)
      prev_stn = line_found.find_previous_station(stop_id, direction)
      previous_station_info = {}
      if prev_stn
        previous_station_info[:prev_station] = prev_stn.stop_id
      end
      render json: previous_station_info
    end

    private

    def find_current_running_line(lines_array, current_time)
      found_lines = lines_array.select do |line|
        ((Time.parse(line.time_start)).to_i < current_time) && ((Time.parse(line.time_stop)).to_i > current_time)
      end
      found_lines.first
    end

end
