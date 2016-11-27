function initStations(args){
  var bounds = new google.maps.LatLngBounds();
  stations = []
  stations2 = []


  args.forEach(function(station){
    var stationPos = station.stationPos
    var symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#FFC',
          fillColor: '#FFC',
          fillOpacity: 1
        };
    var marker = new google.maps.Marker({
      position: stationPos,
      map: map,
      icon: symbolOne,
      title: String(station.stop_id),
      label: String(station.name),
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
    marker.addListener('click', function() {
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

// function setLineColor(lineID) {
//   if(lineID === "1" || lineID === "2" || lineID === "3"){
//     lineColor = 'Red';
//   }
//   else {
//     lineColor = 'Green';
//   }
//   return lineColor;
// }
function setLineColor(lineID) {
      var lineColors = {
        '1': '#9400D3',
        '2': '#0000FF',
        '3': '#00FF00',
        '4': '#FFFF00',
        '5': '#FF7F00',
        '5X': '#FF7F00',
        '6': '#FF0000'
      };
      Object.keys(lineColors).forEach(function (key) {
        console.log(key);
        console.log(key==lineID);
        if (lineID === key) {
          lineColor = lineColors[key]
        }
      })
 return lineColor;
}

function setLineWeight(lineID) {
  if(lineID === "1" || lineID === "2" || lineID === "3"){
    lineWeight = 5;
  }
  else {
    lineWeight = 2;
  }
  return lineWeight;
}

function initCurves(args)
{
  var tryingThisThing = args.slice(0);
  curveCoordinatesArray=args.slice(0);
  args.forEach(function(curve){
    var lineColor = setLineColor(curve.curveId);
    var lineWeight = setLineWeight(curve.curveId);
    var linePath = new google.maps.Polyline({
      path: curve.coordinates,
      geodesic: true,
      strokeColor: lineColor,
      // strokeColor: 'Red',
      strokeOpacity: 1.0,
      strokeWeight: lineWeight,
      // strokeWeight: 2,
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
