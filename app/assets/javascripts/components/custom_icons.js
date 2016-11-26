var uptownGreen = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/up-triangle-green2.png'
var downtownGreen = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/up-triangle-green3-e1480133228331.png'
var atStationGreen = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/stop-green.png'

var uptownRed = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/up-triangle-red2-e1480133178965.png'
var downtownRed = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/up-triangle-red3-e1480133251527.png'
var atStationRed = 'https://jacobwilliamsonline.files.wordpress.com/2016/11/stop-red.png'

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
