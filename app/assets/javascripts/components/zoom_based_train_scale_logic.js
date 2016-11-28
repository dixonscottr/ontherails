function setTrainIconSize(zoomLevel) {
  var sizesToMatchZooms = {
    12: 1,
    13: 2,
    14: 4,
    15: 6,
    16: 8
  };
 return sizesToMatchZooms[zoomLevel];
};
