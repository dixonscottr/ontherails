function setPanningBounds(map){
// Bounds for North America
   var allowedBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(28.70, -127.50),
     new google.maps.LatLng(48.85, -55.90));

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
     if (allowedBounds.contains(map.getCenter())) return;

     // Out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = allowedBounds.getNorthEast().lng(),
         maxY = allowedBounds.getNorthEast().lat(),
         minX = allowedBounds.getSouthWest().lng(),
         minY = allowedBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
   });
}
