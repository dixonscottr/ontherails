var uptownGreen = '/img/up-triangle-green.png'
var downtownGreen = '/img/down-triangle-green.png'
var atStationGreen = '/img/stop-green.png'

var uptownRed = '/img/up-triangle-red.png'
var downtownRed = '/img/down-triangle-red.png'
var atStationRed = '/img/stop-red.png'

function stopIcon(routeId) {
  if (routeId == '1' || routeId == '2' || routeId == '3') {
    return atStationRed;
  } else {
    return atStationGreen;
  }
}

function movementIcon(routeId, direction) {
  if (routeId == '1' || routeId == '2' || routeId == '3') {
    if (direction == 'N') {
      return uptownRed;
    } else {
      return downtownRed;
    }
  } else {
    if (direction == 'N') {
      return uptownGreen;
    } else {
      return downtownGreen;
    }
  }
}
