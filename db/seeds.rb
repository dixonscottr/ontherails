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
  if (row['stop_lat'].length == 9)
    station.latitude = row['stop_lat'];

  else
    station.latitude = row['stop_lat'].concat("0");
  end
  if (row['stop_lon'].length == 9)
    station.longitude = row['stop_lon'];

  else
    station.longitude = row['stop_lon'].concat("0");
  end
  station.stop_desc = row['stop_desc'];
  station.parent_station = row['parent_station'];
  station.save
end

standardStartTime = "12:00:00 AM"
standardEndTime = "11:59:59 PM"


line1 = Line.new(line_identifier:"1", day:"all", time_start: standardStartTime, time_stop: standardEndTime)
line1.stations = Station.where(id: 1..38)
line1.save!

# lineL = Line.new(line_identifier:"L", day:"all", time_start: standardStartTime, time_stop: standardEndTime)
# lineL.stations = Station.where(id: 155..178)
# lineL.save!
#
dayStart = "06:00:00 AM"
dayEnd = "11:59:59 PM"

line2day = Line.new(line_identifier:"2", day:"all", time_start: dayStart, time_stop: dayEnd)
line2day.stations << Station.where(id: [39..62])
line2day.stations << Station.where(id: [18])
line2day.stations << Station.where(id: [21])
line2day.stations << Station.where(id: [25])
line2day.stations << Station.where(id: [26])
line2day.stations << Station.where(id: [30])
line2day.stations << Station.where(id: [35])
line2day.stations << Station.where(id: [63..81])
line2day.save!

lateNightStart = "12:00:01 AM"
lateNightEnd = "06:00:00 AM"

line2night = Line.new(line_identifier:"2", day:"all", time_start: lateNightStart, time_stop: lateNightEnd)
line2night.stations << Station.where(id: [39..62])
line2night.stations << Station.where(id: [18..35])
line2night.stations << Station.where(id: [63..81])

line2night.save!

dayStart = "06:00:00 AM"
dayEnd = "11:30:00 PM"



line3day = Line.new(line_identifier:"3", day:"all", time_start: dayStart, time_stop: dayEnd)
line3day.stations << Station.where(id: [92..93])
line3day.stations << Station.where(id: [59..62])
line3day.stations << Station.where(id: [18,21,25,26,30,35])
line3day.stations << Station.where(id: [63..74])
line3day.stations << Station.where(id: [82..91])

line3day.save!

timeStart = "11:30:00 PM"
timeEnd = "11:59:59 AM"

line3night = Line.new(line_identifier:"3", day:"all", time_start: timeStart, time_stop: timeEnd)
line3night.stations << Station.where(id: [92..93])
line3night.stations << Station.where(id: [59..62])
line3night.stations << Station.where(id: [18,21,25])

line3night.save!
late3NightStart = "12:00:00 AM"
late3NightEnd = "06:00:00 AM"


line3night = Line.new(line_identifier:"3", day:"all", time_start: late3NightStart, time_stop: late3NightEnd)
line3night.stations << Station.where(id: [92..93])
line3night.stations << Station.where(id: [59..62])
line3night.stations << Station.where(id: [18,21,25])

line3night.save!

line6 = Line.new(line_identifier:"6", day:"all", time_start: standardStartTime, time_stop: standardEndTime)
line6.stations << Station.where(id: 117..154)
line6.save!

# line4
# has stations it skips during rush hour 7-9 & 4:45-6:20 PM
# has stations it stops at late night only

line4day1Start = "07:00:00 AM"
line4day1End = "09:00:00 AM"

line4day1 = Line.new(line_identifier:"4", day:"all", time_start: line4day1Start, time_stop: line4day1End)
line4day1.stations << Station.where(id: [94..106])
line4day1.stations << Station.where(id: [135,140,143,145,149,154])
line4day1.stations << Station.where(id: [108..111])
line4day1.stations << Station.where(id: [69..70])
line4day1.stations << Station.where(id: [74,84])

line4day1.save!

line4day2Start = "04:45:00 AM"
line4day2End = "06:20:00 PM"

line4day2 = Line.new(line_identifier:"4", day:"all", time_start: line4day2Start, time_stop: line4day2End)
line4day2.stations << Station.where(id: [94..106])
line4day2.stations << Station.where(id: [135,140,143,145,149,154])
line4day2.stations << Station.where(id: [108..111])
line4day2.stations << Station.where(id: [69..70])
line4day2.stations << Station.where(id: [74,84])
line4day2.save!



start = "06:00:00 AM"
endTime = "7:00:00 AM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135,140,143,145,149,154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..70])
line4NRH.stations << Station.where(id: [74,84])
line4NRH.save!

start = "06:20:00 PM"
endTime = "11:00:00 PM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135,140,143,145,149,154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..70])
line4NRH.stations << Station.where(id: [74,84])
line4NRH.save!

start = "09:00:00 AM"
endTime = "04:45:00 PM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135,140,143,145,149,154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..70])
line4NRH.stations << Station.where(id: [74,84])
line4NRH.save!

# MANHATTAN AND BROOKLYN LATENIGHT
start = "01:00:00 AM"
endTime = "05:00:00 AM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135..154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..74])
line4NRH.stations << Station.where(id: [82..91])
line4NRH.save!

# BROOKLYN BUT NOT MANHATTAN
start = "11:00:00 PM"
endTime = "11:59:59 PM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135, 140, 143, 145, 149, 154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..74])
line4NRH.stations << Station.where(id: [82..91])
line4NRH.save!

start = "12:00:00 AM"
endTime = "01:00:00 AM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135, 140, 143, 145, 149, 154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..74])
line4NRH.stations << Station.where(id: [82..91])
line4NRH.save!

start = "05:00:00 AM"
endTime = "06:00:00 AM"

line4NRH = Line.new(line_identifier:"4", day:"all", time_start: start, time_stop: endTime)
line4NRH.stations << Station.where(id: [94..107])
line4NRH.stations << Station.where(id: [135, 140, 143, 145, 149, 154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..74])
line4NRH.stations << Station.where(id: [82..91])
line4NRH.save!

# DOESNT WORK YET
# NEED MORE LOGIC HERE
line4NRH = Line.new(line_identifier:"5", day:"all", time_start: standardStartTime, time_stop: standardEndTime)
line4NRH.stations << Station.where(id: [112..116])
line4NRH.stations << Station.where(id: [49..58])
line4NRH.stations << Station.where(id: [135,140,143,145,149,154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..70])
line4NRH.stations << Station.where(id: [74..81])
line4NRH.save!

line4NRH = Line.new(line_identifier:"5x", day:"all", time_start: standardStartTime, time_stop: standardEndTime)
line4NRH.stations << Station.where(id: [40..58])
line4NRH.stations << Station.where(id: [135,140,143,145,149,154])
line4NRH.stations << Station.where(id: [108..111])
line4NRH.stations << Station.where(id: [69..70])
line4NRH.stations << Station.where(id: [74..81])
line4NRH.save!


Stationline.all.each do |stationline|
  stationline.station.train_lines += stationline.line.line_identifier
  stationline.station.save
end
Station.all.each do |station|
  station.train_lines = station.train_lines.chars.uniq.join
  station.save
end




csv_text = File.read(Rails.root.join('lib', 'seeds', 'newShapes.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  point = Point.create(shape_id: row['shape_id'], latitude: row['shape_pt_lat'].to_f, longitude: row['shape_pt_lon'].to_f, sequence: row['shape_pt_sequence'])
end


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

csv_text = File.read(Rails.root.join('lib', 'seeds', 'times.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  stoptime = Stoptime.new
  stoptime.trip_id = row['trip_id'];
  stoptime.time= Time.parse(row['arrival_time']).to_i;
  stoptime.stop_id = row['stop_id'];
  stoptime.sequence = row['sequence'];
  stoptime.save
end
