# data=NET::HTTP.get(URI.parse('http://datamine.mta.info/mta_esi.php?key=5a44f5292fb0076e8f17017858ce3c58'))

require 'csv'
require 'json'

features = []

coordinates = []

shape_id = nil

# ONLY FOR SHAPES.txt IN THE SAME FILE

CSV.foreach('shapes.txt', headers: true) do |row|
  if row['shape_id'] != shape_id
    # new shape!
    if shape_id
      features << {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }
    end
    coordinates = []
    shape_id = row['shape_id']
  end

  coordinates << [row['shape_pt_lon'].to_f, row['shape_pt_lat'].to_f]
end

File.open('shapes.json', 'w') do |f|
  f.write(JSON.pretty_generate({type: 'FeatureCollection', features: features}))
end
