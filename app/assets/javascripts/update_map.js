//SCOTTS BUTTON
$('document').ready(function() {
  $(".button-collapse").sideNav({
    menuWidth: 100,
     edge: 'left',
     closeOnClick: true,
     draggable: true
   });

 $('.trainButtonToggle').click(function(e) {
    e.stopPropagation();
});

  $('form#train-updater').submit(function(event) {
    event.preventDefault();
    var $form = $('form#train-updater');
    var url = $form.attr('action');
    $.ajax({
      url: url,
      method: 'get'
    })
    .done(function(responseJSON){
      if(responseJSON.error){
        showErrorMessage();
      }
      else {
        updateTrainPosition(responseJSON);
        var mtaTimestamp = responseJSON.time_updated;
        updateTimestamp(mtaTimestamp);
        showSuccessMessage();
      }
    })
    .fail(function(responseJSON){
      showErrorMessage();
    });
  });



  $('form#service-updater').submit(function(event){
    event.preventDefault();
    var $form = $('form#service-updater');
    var url = $form.attr('action');
    $.ajax({
      url: url,
      method: 'get'
    })
    .done(function(responseJSON){
      Object.keys(responseJSON).forEach(function(line){
        var $status = $('#' + line + '-service');
        $status.children().html(responseJSON[line]);
      })
      showSuccessMessage();
    })
    .fail(function(){
      showErrorMessage();
    })
  });
  $('form#train-updater').submit();
  $('form#service-updater').submit();

});

function showSuccessMessage() {
  $('#toast-container').empty();
  Materialize.toast('<i class="material-icons">done</i> MTA data was successfully updated', 3000, 'green rounded toast-message')
}

function showErrorMessage() {
  $('#toast-container').empty();
  $('p#mta-timestamp').text('Caution: MTA data could not be accessed');
  Materialize.toast('<i class="material-icons">warning</i> MTA data was not updated. Try again later.', 3000, 'red rounded toast-message');
}

function handleClick(line) {
  line.classList.toggle('checked');
  var trainLinesToHide = trainLineChecker();
  updateStations(trainLinesToHide);
  updateRoutes(trainLinesToHide);
  updateTrainsForLine(trainLinesToHide, line.value)
  line.classList.toggle('opaque');
}

function updateStations(options) {
  stations.forEach(function(marker){
    if (intersection(options, marker.trainLines.split('').sort()).length && inBounds(marker))
    {
      if (marker.getMap() == null){
        // marker.setVisible(true);
        marker.setMap(map);
      }
    }
    else {
      // marker.setVisible(false);
      if (marker.getMap() != null){
        marker.setMap(null);
        marker = null;

      }
    }
  })
  stations2.forEach(function(marker){
    if (intersection(options, marker.trainLines.split('').sort()).length && inBounds(marker))
    {
      if (marker.getMap() == null){
        // marker.setVisible(true);
        marker.setMap(map);
      }
      // marker.setMap(map)

    }
    else {
      // marker.setMap(null)
      if (marker.getMap() != null){
        // marker.setVisible(false);
        marker.setMap(null);
        marker = null;
      }
    }
  })
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

function updateRoutes(options)
{
  curvePaths.forEach(function(line){
    if (options.indexOf(line.title[0]) === -1)
    {
      // line.setVisible(false);
      if (line.getMap() != null){
        // marker.setVisible(false);
        line.setMap(null);
        line = null;
      }
      // line.setMap(null)

    }
    else{
      // line.setVisible(true);
      if (line.getMap() == null){
        line.setMap(map)
        // marker.setVisible(false);
        // marker.setMap(null);
        // marker = null;
      }

    }
  })
}
function inBounds(marker){
  return map.getBounds().contains(marker.getPosition());
}


function updateTrainsForLine(lineID_array, lineToHide) {
  newTrains.forEach(function(marker) {
    if(trainLineChecker().indexOf(marker.label2[0]) === -1) {
      // marker.setVisible(false);
      if (marker.getMap() != null){
        // marker.setVisible(false);
        marker.setMap(null);
        marker = null;
      }

    }
    else {
      // marker.setVisible(true);
      if (marker.getMap() == null && inBounds(marker)){
        // marker.setVisible(false);
        marker.setMap(map)
      }

    }
  });
}

function trainLineChecker() {
  var checkedLines = [];
  var linesToCheck = $('.checked')
  linesToCheck.each(function(i){
    checkedLines[i] = $(linesToCheck[i]).text();
  });

  return checkedLines;
}

function updateTimestamp(unixTimestamp) {
  var readableTimestamp = timeConverter(unixTimestamp)
  var currentTime = Math.floor((new Date()).getTime() / 1000)
  if((currentTime - unixTimestamp) > 60) {
    $('p#mta-timestamp').text('Advisory: Train locations may not be accurate. MTA data was last updated at: ' + readableTimestamp);
  }
  else {
    $('span#update_time').text(readableTimestamp);
  }
}

function clearTrainLocations(trainsArray) {
  trainsArray.forEach(function(train) {
    if (train.getMap() != null){
      // marker.setVisible(false);
      train.setMap(null);
      train = null;
    }
  });
}

function hideMarker(marker) {
  // marker.setVisible(false);

  if (marker.getMap()!=null){
    marker.setMap(null);
    marker = null;
  }

}

function showMarker(marker) {
  // marker.setVisible(true);
  if (marker.getMap()==null){
    marker.setMap(map);
  }

}

function showOrHideMarkers(marker) {
  if((inBounds(marker)==false) || (trainLineChecker().indexOf(marker.label2[0]) === -1 )) {
    hideMarker(marker)
  }
  else {
    showMarker(marker)
  }
}

function updateTrainPosition(responseJSON){
  var currentTrainsTracked =["1","2","3","4","5","5X","6"];
  if (newTrains.length != 0)
  {
     diffTrains = diffTrains.concat($(trains).not(newTrains).get());

    if (diffTrains.length > 0 && diffTrains.length <4)
      {
        diffTrains.forEach(function(train){
          train.icon.fillColor = 'black'
        })
      }
      else if (diffTrains.length>4) {
        clearTrainLocations(diffTrains);
        diffTrains = [];
      }
    trains = newTrains.slice();
    totalTrains.push(trains)
  }
  newTrains = []
  var keys1 = Object.keys(responseJSON).slice(0,-1);
  var timestamp = responseJSON.time_updated;
  keys1.forEach(function(key){
    if (key)
    var train = responseJSON[key]

    if ((intersection([train.route_id],currentTrainsTracked).length>0) && train.route_id!=''){

    var fullrouteID = train.route_id
    // take the x from 6x
    if(train.route_id === undefined){
      debugger;
    }
    var routeId = train.route_id[0];
    var stopTimes = train.stop_time;
    if (stopTimes[0].arrival && stopTimes[0].departure){
      //Assume in this case, they are in the station at stopTimes[0]
        //HERE WE ASSUME TRAIN IS MOVING
      var stopId = stopTimes[0].stop_id.substr(0,3);
      var direction =stopTimes[0].stop_id.substr(3);
      var nextStation = stations.filter(function(station){
        return (station.title === stopId)
      })
      var trip_id = train.trip_id
      $.ajax({
        url: '/find_previous_station',
        method: 'post',
        data: {
          'station': stopId,
          'line': fullrouteID,
          'time': timestamp,
          'direction': direction,
          'fullrouteID': fullrouteID,
          'arrivalTime': stopTimes[0].arrival,
          'departureTime': stopTimes[0].departure,
          'trip_id': trip_id
        }
      }).done(function(response) {
        var prevStation = stations.filter(function(station){
          return (station.title === response.prev_station)
        })
        //NEW CURVE FOLLOWING CODE

        //Select the curve which matches the current path which the train is on. For example if our train is the 5X train we are looking for the curve that corresponds with this train.

        //This means we need to make sure we have a curve for every train possibility. Which I am not sure if we do. Here we have the current curve, and previous station and next station variable so we can find the chunk of track which we are supposed to be on. We need to use the current timestamp and the expected arrival time to estimate where we are on the array of points. If ~250 points is 3 minutes then every point is 1.4 seconds. This means if we are 60 seconds away we are 60/1.4 points away. And we move 1.4 points every second.\
        if (response.prev_station){
          var localCurveCoordinates = JSON.parse(JSON.stringify(curveCoordinatesArray));
          var currentCurve = localCurveCoordinates.filter(function(curve){
            return (curve.curveId == response.fullrouteID);
          })
          // var currentCurvePath = curvePaths.filter(function(curve){
          //   return curve.title === fullrouteID;
          // })
          prevStationCoords = getCoordinatesOfStation(prevStation);
          prevStationCoords.lat = prevStationCoords.lat.toFixed(6);
          prevStationCoords.lng = prevStationCoords.lng.toFixed(6);
          nxtStationCoords = getCoordinatesOfStation(nextStation);
          nxtStationCoords.lat = nxtStationCoords.lat.toFixed(6);
          nxtStationCoords.lng = nxtStationCoords.lng.toFixed(6);

          var tempCoords = currentCurve[0].coordinates
          var tempCoords1 = currentCurve[0].coordinates

          var prevIndexOnCurve='';
          var nxtIndexOnCurve='';
          for (var i =0; i < tempCoords.length;i++)
          {

            if ((prevStationCoords.lat == tempCoords[i].lat.toFixed(6)) && (prevStationCoords.lng == tempCoords[i].lng.toFixed(6))){
              prevIndexOnCurve = i;
            }
            if ((nxtStationCoords.lat == tempCoords[i].lat.toFixed(6)) && (nxtStationCoords.lng == tempCoords[i].lng.toFixed(6))){
              nxtIndexOnCurve = i;
            }
          }
          // variables prevIndexOnCurve  nxtIndexOnCurve, tempCoords is an array of the coordinates for the index
          var newPath = '';
          var segmentLine = ''
          if (response.direction == "N"){
            newPath = tempCoords1.splice(prevIndexOnCurve,(nxtIndexOnCurve-prevIndexOnCurve)+1)
            segmentLine = new google.maps.Polyline({
              path: newPath
            });
          }
          else {
            newPath = tempCoords1.splice(nxtIndexOnCurve,(prevIndexOnCurve-nxtIndexOnCurve)+1)
            segmentLine = new google.maps.Polyline({
              path: newPath
            });
          }
          //AT THIS POINT WE HAVE A TIME WHICH THIS TRAIN IS AWAY FROM A STATION
          //THIS IS THE TIME LEFT TO GET TO THIS STATION
          var waitTime = response.arrivalTime - response.time;
          var currentTimeArray = timesArray.filter(function(timeArr){
            return (timeArr.line_id === response.fullrouteID)
          })
          var station1Time = '';
          var station2Time ='';
          var tempVal = currentTimeArray[0].data;
          for (var i=0; i <tempVal.length;i++){

            if (tempVal[i].stop_id == response.prev_station){
              station1Time = tempVal[i].time;
            }
            else if(tempVal[i].stop_id == response.station){
              station2Time = tempVal[i].time;
            }
          }
          //TOTAL TRAVEL TIME BETWEEN THE TWO stations
          var travelTime = Math.abs(station1Time - station2Time)
          var percentToUse = Math.abs((waitTime/travelTime))
          if (response.direction == "N"){
            percentToUse = Math.abs(1-percentToUse);
            if (percentToUse > 1)
            {
              percentToUse =.99;
            }
            else if (percentToUse == 0)
            {
              percentToUse = 1;
            }
            else if (percentToUse <0)
            {
              console.log("TRAIN DELAY");
              percentToUse = .99;
            }
          }

          else if (response.direction == "S"){
            if (percentToUse > 1)
            {
              percentToUse =1;
            }
            if (percentToUse == 0)
            {
              percentToUse = 0.02;
            }
          }
          if (response.arrivalTime != response.departureTime){
            percentToUse = .001
          }
          //Current place on the curve
          var currentPos =  segmentLine.GetPointAtDistance(segmentLine.Distance()*(percentToUse));
          if (currentPos == null){
            debugger
          }
          if (segmentLine.Distance()*(percentToUse) == 0){
            debugger
          }
          var currentIndex =  segmentLine.GetIndexAtDistance(segmentLine.Distance()*(percentToUse));

          if (segmentLine.getPath().length ==1) {
          }
          var heading = segmentLine.Bearing(currentIndex)
          //DEBUGGER TO CATCH ERRORS. DO NOT REMOVE. IT WILL ONLY HIT IF WE HAVE ISSUE

          if (heading == null){
            debugger
          }
          var orthogonalHeading = heading;
          if (response.direction == "N"){
            orthogonalHeading +=90;
          }
          else{
            orthogonalHeading-=90;
          }

          var offset = 0.000025;
          if (response.line[0] == "1" || response.line[0] == '6'){offset = 0.000015;}
          if (response.line[0] == "2" || response.line[0] == '5'){offset = 0.000025;}
          if (response.line[0] == "3" || response.line[0] == '4'){offset = 0.000035;}

          //DEBUGGER TO CATCH ERRORS. DO NOT REMOVE. IT WILL ONLY HIT IF WE HAVE ISSUE
          if (currentPos == null){
            debugger
          }
          var newPos = getFinalPoint(currentPos, offset, orthogonalHeading)
          var rotation = 0;
          if (response.direction == "N"){
            rotation = heading;
          }
          else{
            rotation = heading + 180;
          }
          scaleSizeByZoomLevel = setTrainIconSize(map.getZoom())
          var customImage = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: scaleSizeByZoomLevel,
            fillColor: setLineColor(response.line),
            fillOpacity:1,
            strokeWeight: 2,
            strokeColor:"Black",
            rotation: rotation
          };
          var trainObj={
            position: newPos,
            map: map,
            icon: customImage,
            // label: routeId,
            label2: routeId,
            station: response.prev_station,
            nxtStation: response.station,
            identifier: response.trip_id,
            wait: waitTime,
            zoom_in_label: routeId,
            zoom_out_label: '',
            percentage: percentToUse,
            direction: direction
          };
          var testFalse = false;
          for (var i=0; i <trains.length;i++){
            if(trains[i].identifier === trainObj.identifier)
            {
              trains[i].setPosition(trainObj.position);
              trains[i].setIcon(customImage);
              trains[i].station = trainObj.station;
              trains[i].nxtStation = trainObj.nxtStation;
              trains[i].wait = trainObj.wait;
              trains[i].percentage = trainObj.percentage;



              var trainMarker = trains.splice(i,1)[0];
              newTrains.push(trainMarker);
              showOrHideMarkers(trainMarker);
              google.maps.event.clearInstanceListeners(trainMarker);

              google.maps.event.addListener(trainMarker, 'click', function() {
                showTrainInfo(trainMarker, nextStation);
              })
              testFalse= true;
              break;
            }
          }
          if (testFalse==false){
            var trainMarker = new google.maps.Marker({
                position:newPos,
                map: map,
                icon: customImage,
                // label: routeId,
                label2: routeId,
                station: response.prev_station,
                nxtStation: response.station,
                wait: waitTime,
                percentage: percentToUse,
                // label: response.trip_id + ' PERCENT ' + percentToUse,
                identifier: response.trip_id,
                direction: direction
              });
              google.maps.event.addListener(trainMarker, 'click', function() {
              showTrainInfo(trainMarker, nextStation);
            })
            newTrains.push(trainMarker);
            showOrHideMarkers(trainMarker);
          }
        }
    });
    }
  }//END IF THE IF INTERSECTION STATEMENT
  })
}

function showTrainInfo(marker, nextStation) {
  var nextStationName = nextStation[0].fullName;
  var percentage = marker.percentage;
  var trainName = marker.label2;
  var direction = marker.direction;
  var percentageleft = determinePercentageLeft(direction, percentage);
  var msg1 = "<h5 class='center-align'>" + trainName + ' train</h5>'
  var msg2 = "Next Stop:<br />" + nextStationName
  // var msg2 = percentageleft + "% of the way there!"
  infoWindow.setContent("<div class='black-text info-window'>" + msg1 + msg2 + "</div>");
  infoWindow.open(map, marker)
}

function determinePercentageLeft(direction, percentage) {
  if(direction == "S") {
    var percentageleft = (percentage * 100).toFixed(0);
  }
  else {
    var percentageleft = (100 - (percentage * 100)).toFixed(0);
  }
  return percentageleft;
}

function getFinalPoint(point, offset, degHeading){
    Math.degrees = function(rad) {
        return rad * (180 / Math.PI);
    }
    Math.radians = function(deg) {
        return deg * (Math.PI / 180);
    }
    var lat1 = Math.radians(point.lat());
    var lng1 = Math.radians(point.lng());

    var heading = Math.radians(degHeading);

    var latFinal = Math.asin(Math.sin(lat1) * Math.cos(offset) +
                       Math.cos(lat1) * Math.sin(offset) * Math.cos(heading));

    var lonFinal = lng1 + Math.atan2(Math.sin(heading) * Math.sin(offset) *
                      Math.cos(lat1),
                      Math.cos(offset) - Math.sin(lat1) *
                      Math.sin(latFinal));
    return new google.maps.LatLng(Math.degrees(latFinal), Math.degrees(lonFinal));
}

function getCoordinatesOfStation(station){
  return {lat:station[0].getPosition().lat(), lng:station[0].getPosition().lng()}
}

function showStationInfo(marker, station) {
  var message = []
  newTrains.forEach(function(train){
    if (train.nxtStation == station.stop_id){
      var waitTime = parseInt(train.wait);
      if (waitTime<=50)
      {
        waitText = "in < 1 minute";
      }
      else if(waitTime < 100) {
        waitText = "in < 2 minutes";
      }
      else {
        waitText = "in " + (waitTime / 60).toFixed(0).toString() + " minutes."
      }
      message.push({
        direction: train.direction,
        arrivalTime: waitTime,
        trainType: train.label2,
        displayArrivalTime: waitText
      })
    }
  })
  var northBoundMessages = message.filter(function(x){
    return x.direction == "N"
  })

  var southBoundMessages = message.filter(function(x){
    return x.direction == "S"
  })

  var sortedNorthBoundMessages = northBoundMessages.sort(dynamicSortMultiple("direction", "arrivalTime"));
  var sortedSouthBoundMessages = southBoundMessages.sort(dynamicSortMultiple("direction", "arrivalTime"));

  if (station.stop_id ==="222"){
    station.name = "149 St - Grand Concourse"
  }
  var messageDisplay = "<h5 class='center-align'>" + station.name + "<hr /></h5>";

  messageDisplay=messageDisplay.concat("<i class='material-icons'>call_made</i> Northbound Trains:<br />")

  var errorMessage = '<em>No information available.</em><br />';

  if(sortedNorthBoundMessages.length > 0) {
    messageDisplay=messageDisplay.concat(sortedNorthBoundMessages.map(function(m){
      return m.trainType + " Train is arriving " + m.displayArrivalTime + "<br />"
    }).join(''));
  }
  else {
    messageDisplay= messageDisplay.concat(errorMessage)
  }

  messageDisplay=messageDisplay.concat("<br /><i class='material-icons'>call_received</i> Southbound Trains:<br />");

  if(sortedSouthBoundMessages.length > 0) {
    messageDisplay=messageDisplay.concat(sortedSouthBoundMessages.map(function(m){
      return m.trainType + " Train is arriving " + m.displayArrivalTime + "<br />"
    }).join(''));
  }
  else {
    messageDisplay= messageDisplay.concat(errorMessage)
  }

  // messageDisplay=messageDisplay.concat(sortedNorthBoundMessages.map(function(m){
  //   return m.trainType + " Train is arriving " + m.arrivalTime + "<br />"
  // }).join(''));
  // messageDisplay=messageDisplay.concat(sortedSouthBoundMessages.map(function(m){
  //   return m.trainType + " Train is arriving " + m.arrivalTime + "<br />"
  // }).join(''));

  infoWindow.setContent("<div class='black-text info-window'>" + messageDisplay + "</div>");
  infoWindow.open(map, marker)
  }

  function addEmptyDataMessage(messagesArray) {
    var errorMessage = '<em>No information available.</em><br />';
    return messagesArray.concat(errorMessage);
  }

  function dynamicSortMultiple() {

      var props = arguments;
      return function (obj1, obj2) {
          var i = 0, result = 0, numberOfProperties = props.length;
          while(result === 0 && i < numberOfProperties) {
              result = dynamicSort(props[i])(obj1, obj2);
              i++;
          }
          return result;
      }
  }
  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


  function determineNextTrains(marker, responseJSON) {
    var data = responseJSON.replace('loadNewData()', '')
    var direction1 = [];
    var direction2 = [];
    var direction1Label;
    var direction2Label;
    var serverTimeStamp;
    var fileTimeStamp;
    var fileTimeFormat;
    var suspended;
    var ageOfDataAtRead;
    function tryAgain() {
      infoWindow.setContent('Data not avaiable. Please try again.')
      infoWindow.open(map, marker)
    }
    eval(data);
    if(direction1.length && direction2.length){
      console.log('Check station for upcoming trains')
      var uptownTrain = findNextTrain(Math.floor(new Date() / 1000), direction1)
      var downtownTrain = findNextTrain(Math.floor(new Date() / 1000), direction2)
      var uptownTrainName = uptownTrain.split(',')[0]
      var uptownTrainTime = uptownTrain.split(',')[1]
      var downtownTrainName = downtownTrain.split(',')[0]
      var downtownTrainTime = downtownTrain.split(',')[1]
      var messagePart1 = 'Next ' + direction1Label + ' train in ' + minutesFromNow(uptownTrainName) + ' minutes'
      var messagePart2 = 'Next ' + direction2Label + ' train in ' + minutesFromNow(downtownTrainTime) + ' minutes'
      infoWindow.setContent(messagePart1 + "<br />" + messagePart2)
      infoWindow.open(map, marker)
    }
    else{
      tryAgain();
    }
  }

  function findNextTrain(currentTime, trainArrivals) {
    var currentTime = new Date();
    var futureTrains = trainArrivals.filter(function(train){
      timeArray = train.split(',');
      arrival = new Date(Number(timeArray[1]));
      return minutesFromNow(arrival) > 0
    });
    return futureTrains[0];
  }
