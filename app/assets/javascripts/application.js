// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
// //= require_tree .
//

function initMap(){
  center = {lat: 40.774, lng: -73.955}
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 11,
    styles:
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  });
  // map.addListener('center_changed', function() {
  //            map.panTo(marker.getPosition());
  //        });
   google.maps.event.addDomListener(window, "resize", function() {
       google.maps.event.trigger(map, "resize");
       map.setCenter(center);
   });
return map
}



function initStations(args){
  var bounds = new google.maps.LatLngBounds();
  stations = []
  args.forEach(function(station){
    var stationPos = station.stationPos
    var symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#F00',
          fillColor: '#F00',
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
          //AT THIS POINT WE ARE GETTING THE INFORMATION FROM MTA ABOUT THE TRAIN LOCATIONS AND STATION ARRIVALS
        // var infowindow = new google.maps.InfoWindow({
        //   content: contentString
        //   infowindow.open(map, marker);
      // });
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
function initCurves(args)
{
  curveCoordinatesArray=args
  args.forEach(function(curve){
    var linePath = new google.maps.Polyline({
      path: curve.coordinates,
      geodesic: true,
      strokeColor: 'Red',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      title: curve.curveId
    });
    coordinates = [];
    curvePaths.push(linePath)
    linePath.setMap(map);
  })

}

function handleClick(line){
  line.classList.toggle('checked');
  var trainLinesToHide = trainLineChecker();
  updateStations(trainLinesToHide);
  updateRoutes(trainLinesToHide);
  updateTrainsForLine(trainLinesToHide, line.value)
}

function trainLineChecker() {
  var checked = [];
  var $linesToCheck = $('.checked')
  $linesToCheck.each(function(i){
    checked[i] = $linesToCheck[i].value;
  });
  return checked;
}

function intersection(a, b) {
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

function updateStations(options) {
  stations.forEach(function(marker){
    if (intersection(options, marker.trainLines.split('').sort()).length)
    {
      marker.setVisible(true);
    }
    else {
      marker.setVisible(false);
    }
  })
}
function updateRoutes(options)
{
  curvePaths.forEach(function(line){
    if (options.indexOf(line.title[0])==-1)
    {
      line.setVisible(false);
    }
    else{
      line.setVisible(true);
    }
  })
}

function updateTrainsForLine(lineID_array, lineToHide) {
  trains.forEach(function(marker) {
    if(lineID_array.indexOf(marker.label[0]) === -1) {
      marker.setVisible(false);
    }
    else {
      marker.setVisible(true);
    }
  });
}

function updateTrainPosition(responseJSON){
  var realData = []
  trains.forEach(function(train){
    train.setMap(null);
  })
  trains = []
  var keys = Object.keys(responseJSON).slice(0,-1);
  var timestamp = responseJSON.time_updated;
  keys.forEach(function(key){
    var train = responseJSON[key]
    // take the x from 6x
    var fullrouteID = train.route_id
    var routeId = train.route_id[0];
    var stopTimes = train.stop_time;
    if (stopTimes[0].arrival && stopTimes[0].departure){
      //Assume in this case, they are in the station at stopTimes[0]
      if (stopTimes[0].departure != stopTimes[0].arrival){

        realData.push(train)
        var stopId = stopTimes[0].stop_id.substr(0,3);
        var direction =stopTimes[0].stop_id.substr(3);

        var currentStation = stations.filter(function(station){
          return (station.label === stopId)
        })
        var trainMarker = new google.maps.Marker({
          position: {lat:currentStation[0].getPosition().lat(), lng:currentStation[0].getPosition().lng()},
          icon: stopIcon(routeId),
          map: map,
          label: routeId + direction
        });
        trains.push(trainMarker);
      }
      else {
        //HERE WE ASSUME TRAIN IS MOVING
        var stopId = stopTimes[0].stop_id.substr(0,3);
        var direction =stopTimes[0].stop_id.substr(3);
        var nextStation = stations.filter(function(station){
          return (station.label === stopId)
        })
        $.ajax({
          url: '/find_previous_station',
          method: 'post',
          data: {
            'station': stopId,
            'line': routeId,
            'time': timestamp,
            'direction': direction
          }
        }).done(function(response) {

          var prevStation = stations.filter(function(station){
            return (station.label === response.prev_station)
          })
          //HALFWAY BETWEEN TWO STATIONS (OLD LINE VERSION)
          // if (response.prev_station){
          //   var lat = (prevStation[0].getPosition().lat() + nextStation[0].getPosition().lat())/2
          //   var lng = (prevStation[0].getPosition().lng() + nextStation[0].getPosition().lng())/2
          //
          //   var trainMarker = new google.maps.Marker({
          //     position:{lat: lat, lng:lng},
          //     map: map,
          //     label: routeId + " " + direction + " On Go"
          //   });
          //   trains.push(trainMarker);
          // }

          //NEW CURVE FOLLOWING CODE

          //Select the curve which matches the current path which the train is on. For example if our train is the 5X train we are looking for the curve that corresponds with this train.

          //This means we need to make sure we have a curve for every train possibility. Which I am not sure if we do. Here we have the current curve, and previous station and next station variable so we can find the chunk of track which we are supposed to be on. We need to use the current timestamp and the expected arrival time to estimate where we are on the array of points. If ~250 points is 3 minutes then every point is 1.4 seconds. This means if we are 60 seconds away we are 60/1.4 points away. And we move 1.4 points every second.\
          if (response.prev_station){


            // var trainMarker = new google.maps.Marker({
            //   position:{lat: lat, lng:lng},
            //   icon: movementIcon(routeId, direction),

            var currentCurve = curveCoordinatesArray.filter(function(curve){
              return (curve.curveId == fullrouteID)
            })
            prevStationCoords = getCoordinatesOfStation(prevStation);
            nxtStationCoords = getCoordinatesOfStation(nextStation);
            var tempCoords = currentCurve[0].coordinates
            var prevIndexOnCurve='';
            var nxtIndexOnCurve='';
            for (var i =0; i < tempCoords.length;i++)
            {
              if ((prevStationCoords.lat.toFixed(5) == tempCoords[i].lat.toFixed(5)) && (prevStationCoords.lng.toFixed(5) == tempCoords[i].lng.toFixed(5))){
                prevIndexOnCurve = i;
              }
              if ((nxtStationCoords.lat.toFixed(5) == tempCoords[i].lat.toFixed(5)) && (nxtStationCoords.lng.toFixed(5) == tempCoords[i].lng.toFixed(5))){
                nxtIndexOnCurve = i;
              }
            }

            //NOW WE HAVE THE TWO INDICIES ON THE CURVE OF THE PREVIOUS AND NEXT STATION
            // If the two indicies are 1 apart, take the average
            if (Math.abs(prevIndexOnCurve - nxtIndexOnCurve) == 1){
              var prevCord = new google.maps.LatLng(tempCoords[prevIndexOnCurve]);
              var nxtCord = new google.maps.LatLng(tempCoords[nxtIndexOnCurve]);

              //Degrees from the NORTH which we need to travel to find the other point (AKA SLOPE)
              var heading = google.maps.geometry.spherical.computeHeading(prevCord,nxtCord);

              var orthogonalHeading = heading + 270;

              var offset = 0.00003;

              var newPos = getFinalPoint(tempCoords[prevIndexOnCurve], tempCoords[nxtIndexOnCurve],offset,orthogonalHeading)
              // if (direction == "N"){
              //   if (slope>0){
              //     latOffset *= -1;
              //     lngOffset *= -1;
              //   }
              //   else{
              //     latOffset *= -1;
              //   }
              //
              // }
              // else {
              //   if (slope<0){
              //     lngOffset *= -1;
              //
              //   }
              //   else{
              //   }
              //
              //
              // }

            }
            else{
              var pos = tempCoords[(prevIndexOnCurve + nxtIndexOnCurve)/2]
            }


          }
          var trainMarker = new google.maps.Marker({
              position:newPos,
              icon: movementIcon(routeId, direction),
              map: map,
              label: routeId + direction
            });
          trains.push(trainMarker);
        });

      }
    }
  })
}
function getFinalPoint(coord1, coord2, offset, heading){
    Math.degrees = function(rad) {
        return rad * (180 / Math.PI);
    }
    Math.radians = function(deg) {
        return deg * (Math.PI / 180);
    }
    var lat1 = Math.radians(coord1.lat);
    var lng1 = Math.radians(coord1.lng);
    var lat2 = Math.radians(coord2.lat);
    var lng = Math.radians(coord2.lng);
    var bx = Math.cos(lat2) * Math.cos(lng - lng1)
    var by = Math.cos(lat2) * Math.sin(lng - lng1)
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + Math.pow(by, 2)));
    var lon3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx);

    var midpoint = {lat:Math.round(Math.degrees(lat3), 5), lng:Math.round(Math.degrees(lon3), 5)};

    var latFinal = Math.asin(Math.sin(lat3) * Math.cos(offset) +
                       Math.cos(lat3) * Math.sin(offset) * Math.cos(heading));
    var lonFinal = lon3 + Math.atan2(Math.sin(heading) * Math.sin(offset) *
                      Math.cos(lat3),
                      Math.cos(offset) - Math.sin(lat3) *
                      Math.sin(latFinal));
    return new google.maps.LatLng(Math.degrees(latFinal), Math.degrees(lonFinal));

}

function getCoordinatesOfStation(station){
  return {lat:station[0].getPosition().lat(), lng:station[0].getPosition().lng()}
}

//SCOTTS BUTTON
$('document').ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var url = $form.attr('action');
    $.ajax({
      url: url,
      method: 'get'
    }).done(function(responseJSON){
      updateTrainPosition(responseJSON);
      $('span#update_time').text(Date);

      // var stationPos = {lat:-40, lng:40}
      //
      // var marker = new google.maps.Marker({
      //   position: stationPos,
      //   map: map,
      //   title: 'STATION'
      // });
      // debugger;
      // for(var i = 0; i < Object.keys(responseJSON).length; i++) {
      //   var route_id = responseJSON[i]['route_id'];
      //   var trip_id = responseJSON[i]['trip_id'];
      //   var numStops = Object.keys(responseJSON[i]['stop_time']).length
      //   var lastStop = responseJSON[i]['stop_time'][0].stop_id
      //   var time = responseJSON[i]['stop_time'][0].arrival
      //   // $('.train-locations').append(responseJSON);
      //   $('.train-locations').append(
      //
      //     '<p>Number ' + i +  ':<p></p> route_id: ' + route_id + '</p><p>trip_id: ' + trip_id + '<p>latest stop: ' + lastStop + '</p><br />'
      //   )

    });
    });
});
