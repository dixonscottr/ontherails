class LinesController < ApplicationController

    def update_line_service
      mta_service_txt_file = 'http://web.mta.info/status/serviceStatus.txt'
      uri = URI.parse(mta_service_txt_file)
      html_txt = Net::HTTP.get(uri)
      clean_data = html_txt.gsub(/(\n|\r)/, "")
      service_txt = Nokogiri::HTML(clean_data)
      lines = service_txt.css('line')
      train_status_hash = {}
      east_side_status = lines[1].css('status').text
      west_side_status = lines[0].css('status').text
      # text_123 = lines[0].css('text').text
      # text_456 = lines[1].css('text').text
      # service_details = text_123 + text_456
      update_train_status(west_side_status, east_side_status, train_status_hash)
      render json: train_status_hash
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

      curS_station = Station.find_by(stop_id: stop_id)
      curS = curS_station.id
      new_line_id = ''
      current_station_line = Stationline.find_by(line_id: line_found.id.to_s, station_id: curS)
      if (current_station_line==nil)
        # debugger
        # if line_found.id == 17
        #   current_station_line = Stationline.find_by(line_id: "18", station_id: curS)
        #   new_line_id= '5X'
        # elsif line_found.id ==18
        #   current_station_line = Stationline.find_by(line_id: "17", station_id: curS)
        #   new_line_id= '5'
        # elsif line_found.id ==2
        #   current_station_line = Stationline.find_by(line_id: "18", station_id: curS)
        #   new_line_id= '5X'
        # else
        # end
        linesArray =["1","2","3","4","5","5X","6"];
        tempVal = curS_station.train_lines
        until (current_station_line != nil) || tempVal.length==0
          if (tempVal.include?("5X"))
            lines_to_search = Line.where(line_identifier: "5X")
            new_line_id = "5X"
            line_found = find_current_running_line(lines_to_search, timestamp)
            current_station_line = Stationline.find_by(line_id: line_found.id.to_s, station_id: curS)
            tempVal.remove("5X")
          else
            tempVal = tempVal.split('').uniq
            lines_to_search = Line.where(line_identifier: tempVal[0])
            new_line_id = tempVal.shift[0]
            line_found = find_current_running_line(lines_to_search, timestamp)
            current_station_line = Stationline.find_by(line_id: line_found.id.to_s, station_id: curS)
          end
        end
      end

      # if current_station_line == nil
      #   debugger
      # end

      curSLid = current_station_line.id

      if direction == 'N'
        prev_stn=Stationline.find(curSLid + 1).station
      else
        prev_stn=Stationline.find(current_station_line.id - 1).station
      end



      info = {}
      if prev_stn
        if (new_line_id != '')
          info[:line]=new_line_id
          info[:fullrouteID]=new_line_id
          info[:oldRouteID]= params[:fullrouteID]
          info[:lineFoundId]= line_found.id
        else
          info[:fullrouteID]= params[:fullrouteID]
          info[:line]= params[:line]
        end

        info[:prev_station] = prev_stn.stop_id
        info[:station]= params[:station]
        info[:time]= params[:time]
        info[:direction]= params[:direction]
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

    def mentions_train?(text, train)
      word_found = text.split(' ').find do |word|
        word == "[#{word}]"
      end
      !!word_found
    end
    #
    # def update_train_status(train_service_text, status_for_123, status_for_456, status_hash)
    #
    #   trains_to_check = ['1','2','3','4','5','6']
    #
    #   trains_to_check.each do |train_line|
    #     if (train_line == '1' || train_line == '2' || train_line == '3')
    #       status = status_for_123
    #       link = 'http://www.mta.info/status/subway/123'
    #     else
    #       status = status_for_456
    #       link = 'http://www.mta.info/status/subway/456'
    #     end
    #
    #     if mentions_train?(train_service_text, train_line)
    #       status_hash[train_line] = "On Time"
    #     else
    #       status_hash[train_line] = "<a href='#{link}' target='_blank'>#{status.capitalize}</a>"
    #     end
    #   end
    #
    # end

    def update_train_status(status_for_123, status_for_456, status_hash)
      if status_for_123 == 'GOOD SERVICE'
        status_hash[:'1'] = "<i class='material-icons'>check</i>"
        status_hash[:'2'] = "<i class='material-icons'>check</i>"
        status_hash[:'3'] = "<i class='material-icons'>check</i>"
      else
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
      end
      if status_for_456 == 'GOOD SERVICE'
        status_hash[:'4'] = "<i class='material-icons'>check</i>"
        status_hash[:'5'] = "<i class='material-icons'>check</i>"
        status_hash[:'6'] = "<i class='material-icons'>check</i>"
      else
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
        status_hash[:'1'] = "<i class='material-icons'>warning</i>"
      end
    end
end
