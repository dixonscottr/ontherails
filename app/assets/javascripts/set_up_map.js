function initStations(args){
  var bounds = new google.maps.LatLngBounds();
  stations = []
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
      title: String(station.name),
      label: String(station.stop_id),
      trainLines: String(station.train_lines)
    });
    bounds.extend(marker.position);
    marker.addListener('click', function() {
      $.ajax({
        url: "http://apps.mta.info/trainTime/getTimesByStation.aspx?stationID="+station.stop_id+"&time="+ (new Date).getTime(),
        method: 'get'
      }).done(function(responseJSON){
          var data = responseJSON.replace('loadNewData()', '')
          var direction1 = [];
          var direction2 = [];
          eval(data);
      });
    })
    stations.push(marker)
  })
  map.fitBounds(bounds);
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

function setLineToRedOrGreen(lineID) {
  if(lineID === "1" || lineID === "2" || lineID === "3"){
    lineColor = 'Red';
  }
  else {
    lineColor = 'Green';
  }
  return lineColor;
}

function initCurves(args)
{
  var tryingThisThing = args.slice(0);
  curveCoordinatesArray=args.slice(0);
  args.forEach(function(curve){
    var lineColor = setLineToRedOrGreen(curve.curveId);
    var linePath = new google.maps.Polyline({
      path: curve.coordinates,
      geodesic: true,
      strokeColor: lineColor,
      // strokeColor: 'Red',
      strokeOpacity: 1.0,
      strokeWeight: 2,
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
