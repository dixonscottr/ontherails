require 'csv'
#OTHER DATAT SET FROM WEBSITE
# csv_text = File.read(Rails.root.join('lib', 'seeds', 'StationEntrances.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   station = Station.new
#   station.division = row['Division'];
#   station.line = row['Line'];
#   station.name = row['Station_Name'];
#   station.latitude = row['Station_Latitude'];
#   station.longitude = row['Station_Longitude'];
#   station.r1 = row['Route_1'];
#   station.r2 = row['Route_2'];
#   station.r3 = row['Route_3'];
#   station.r4 = row['Route_4'];
#   station.r5 = row['Route_5'];
#   station.r6 = row['Route_6'];
#   station.r7 = row['Route_7'];
#   station.r8 = row['Route_8'];
#   station.r9 = row['Route_9'];
#   station.r10 = row['Route_10'];
#   station.r11 = row['Route_11'];
#   station.save
# end


csv_text = File.read(Rails.root.join('lib', 'seeds', 'stops.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  station = Station.new
  station.stop_id = row['stop_id'];
  station.code = row['stop_code'];
  station.name = row['stop_name'];
  station.latitude = row['stop_lat'];
  station.longitude = row['stop_lon'];
  station.stop_desc = row['stop_desc'];
  station.parent_station = row['parent_station'];
  station.save
end
line1 = Line.new(line_identifier:"1", day:"all", time:"all")
line1.stations = Station.where(id: 1..38)
line1.save!

lineL = Line.new(line_identifier:"L", day:"all", time:"all")
lineL.stations = Station.where(id: 155..178)
lineL.save!

line6 = Line.new(line_identifier:"L", day:"all", time:"all")
line6.stations = Station.where(id: 117..154)
line6.save!

line2day = Line.new(line_identifier:"2", day:"all", time:"day")
line2day.stations = Station.where(id: [39..62,18,21,25,26,30,35,63..81])
line2day.save!

line2night = Line.new(line_identifier:"2", day:"all", time:"night")
line2night.stations = Station.where(id: [39..62,18..35,63..81])
line2night.save!

line3day = Line.new(line_identifier:"3", day:"all", time"day")
line3day.stations = Station.where(id: [92..93,59..62,18,21,25,26,30,35,63..91])

line3night = Line.new(line_identifier:"3", day:"all", time"night")
line3night.stations = Station.where(id: [92..93,59..62,18,21,25])

# line4

# line5

# csv_text = File.read(Rails.root.join('lib', 'seeds', 'trips.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   trip = Trip.new
#   trip.route_id = row['route_id'];
#   trip.service_id = row['service_id'];
#   trip.trip_id = row['trip_id'];
#   trip.trip_headsign = row['trip_headsign'];
#   trip.direction_id = row['direction_id'];
#   trip.block_id = row['block_id'];
#   trip.shape_id = row['shape_id'];
#   trip.save
# end
#
# csv_text = File.read(Rails.root.join('lib', 'seeds', 'routes.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   route = Route.new
#   route.route_id = row['route_id'];
#   route.agency_id = row['agency_id'];
#   route.route_short_name = row['route_short_name'];
#   route.route_long_name = row['route_long_name'];
#   route.route_desc = row['route_desc'];
#   route.route_type = row['route_type'];
#   route.route_url = row['route_url'];
#   route.route_text_color = row['route_text_color'];
#
#   route.save
# end

# csv_text = File.read(Rails.root.join('lib', 'seeds', 'stop_times.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   stoptime = Stoptime.new
#   stoptime.trip_id = row['trip_id'];
#   stoptime.arrival_time = row['arrival_time'];
#   stoptime.departure_time = row['departure_time'];
#   stoptime.stop_id = row['stop_id'];
#   stoptime.stop_sequence = row['stop_sequence'];
#   stoptime.stop_headsign = row['stop_headsign'];
#   stoptime.pickup_type = row['pickup_type'];
#   stoptime.drop_off_type = row['drop_off_type'];
#   stoptime.shape_dist_traveled = row['shape_dist_traveled'];
#
#
#   stoptime.save
# end
