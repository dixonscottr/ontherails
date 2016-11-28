class LinesController < ApplicationController

    def update_line_service

      mta_service_txt_file = 'http://web.mta.info/status/serviceStatus.txt'
      uri = URI.parse(mta_service_txt_file)
      html_txt = Net::HTTP.get(uri)
      clean_data = html_txt.gsub(/(\n|\r)/, "")
      service_txt = Nokogiri::HTML(clean_data)
      lines = service_txt.css('line')
      train_status = {}
      west_side_status = lines[0].css('status').text
      east_side_status = lines[1].css('status').text
      update_train_status(west_side_status, east_side_status, train_status)
      # debugger
      render json: train_status
    end

    def find_previous_station
      line = params[:line];
      direction = params[:direction]
      stop_id = params[:station]
      timestamp = params[:time].to_i
      lines_to_search = Line.where(line_identifier: line)
      line_found = find_current_running_line(lines_to_search, timestamp)
      if (line_found==nil)
        debugger
      end
      prev_stn = line_found.find_previous_station(stop_id, direction)
      info = {}
      if prev_stn
        info[:prev_station] = prev_stn.stop_id
        info[:station]= params[:station]
        info[:line]= params[:line]
        info[:time]= params[:time]
        info[:direction]= params[:direction]
        info[:fullrouteID]= params[:fullrouteID]
        info[:arrivalTime]= params[:arrivalTime]
        info[:departureTime]= params[:departureTime]

        info[:trip_id]= params[:trip_id]

      end
      render json: info
    end

    private

    def find_current_running_line(lines_array, current_time)
      found_lines = lines_array.select do |line|
        ((Time.parse(line.time_start)).to_i < current_time) && ((Time.parse(line.time_stop)).to_i > current_time)
      end
      if (!found_lines)
        debugger
      end
      found_lines.first
    end

    def update_train_status(status_for_123, status_for_456, status_hash)

      if status_for_123 == 'GOOD SERVICE'
        status_hash[:'1'] = 'On Time'
        status_hash[:'2'] = 'On Time'
        status_hash[:'3'] = 'On Time'
      else
        status_hash[:'1'] = "<a href='http://www.mta.info/status/subway/123' target='_blank'>#{status_for_123.capitalize}</a>"
        status_hash[:'2'] = "<a href='http://www.mta.info/status/subway/123' target='_blank'>#{status_for_123.capitalize}</a>"
        status_hash[:'3'] = "<a href='http://www.mta.info/status/subway/123' target='_blank'>#{status_for_123.capitalize}</a>"
      end
      if status_for_456 == 'GOOD SERVICE'
        status_hash[:'4'] = 'On Time'
        status_hash[:'5'] = 'On Time'
        status_hash[:'6'] = 'On Time'
      else
        status_hash[:'4'] = "<a href='http://www.mta.info/status/subway/456' target='_blank'>#{status_for_456.capitalize}</a>"
        status_hash[:'5'] = "<a href='http://www.mta.info/status/subway/456' target='_blank'>#{status_for_456.capitalize}</a>"
        status_hash[:'6'] = "<a href='http://www.mta.info/status/subway/456' target='_blank'>#{status_for_456.capitalize}</a>"
      end

    end
end
