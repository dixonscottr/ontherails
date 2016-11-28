function initStations(args){
  var bounds = new google.maps.LatLngBounds();
  stations = []
  stations2 = []
  totalTrains =[]


  args.forEach(function(station){
    var stationPos = station.stationPos
    var symbolOne = {
          path: 'M -10,0 0,-10 10,0 0,10 z',
          strokeColor: '#FFC',
          fillColor: '#FFC',
          fillOpacity: 1
        };
    var marker = new google.maps.Marker({
      position: stationPos,
      map: map,
      icon: symbolOne,
      title: String(station.stop_id),
      // label: String(station.name),
      label: String(station.stop_id),
      trainLines: String(station.train_lines)
    });
    var marker2 = new google.maps.Marker({
      position: stationPos,
      map: map,
      icon: symbolOne,
      // title: String(station.name),
      title: String(station.stop_id),
      // label: String(station.stop_id),
      trainLines: String(station.train_lines)
    });
    bounds.extend(marker.position);
    marker2.addListener('click', function() {
      showStationInfo(marker, station);
    })
    stations.push(marker2)
    stations2.push(marker)

  })
  // map.fitBounds(bounds);
  return stations
}

function initRoutes(args)
{
  linePaths = []
  curvePaths = []
  args.forEach(function(route){
    var coordinates = [];
      route.stations.forEach(function(station){
        coordinates.push(station.stationPos);
      })
    var linePath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: 'Green',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      title: route.line_identifier
    });
    linePaths.push(linePath)
    coordinates = [];
    linePath.setMap(map);
    linePath.setVisible(false);

  })
  return linePaths
}

function setLineColor(lineID) {
      var lineColors = {
        '1': '#f47671',
        '2': '#EE352E',
        '3': '#d41811',
        '4': '#00cc52',
        '5': '#00933C',
        '5X': '#00933C',
        '6': '#004d1f'
      };
      Object.keys(lineColors).forEach(function (key) {
        if (lineID === key) {
          lineColor = lineColors[key]
        }
      })
 return lineColor;
}

function setLineWeight(lineID) {
  var lineWeights = {
    '1': 4,
    '2': 4,
    '3': 4,
    '4': 4,
    '5': 4,
    '5X': 4,
    '6': 4
  };
  Object.keys(lineWeights).forEach(function (key) {
    if (lineID === key) {
      lineWeight= lineWeights[key]
    }
  })
return lineWeight;
}
function initCurves(args)
{
  var tryingThisThing = args.slice(0);
  curveCoordinatesArray = args.slice(0);
  args.forEach(function(curve){
    var lineColor = setLineColor(curve.curveId);
    var lineWeight = setLineWeight(curve.curveId);
    var linePath = new google.maps.Polyline({
      path: curve.coordinates,
      geodesic: true,
      strokeColor: lineColor,
      strokeOpacity: 1.0,
      strokeWeight: lineWeight,
      title: curve.curveId
    });
    coordinates = [];
    curvePaths.push(linePath)
    linePath.setMap(map);

  })
  return tryingThisThing
}

function initTimes(args)
{
  timesArray = args;
}
