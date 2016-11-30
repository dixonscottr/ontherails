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
//= require materialize
//= require materialize/extras/nouislider
// //= require_tree .
//

function timeConverter(UNIX_timestamp){
  var ax = new Date(UNIX_timestamp * 1000);
  var offset = -(ax.getTimezoneOffset()/60);
  var a = new Date(ax.getTime()+(offset+5)*3600*1000)
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = (a.getMinutes() < 10 ? '0' : '') + a.getMinutes();
  var time = month + '/' + date + '/' + year + ' ' + hour + ':' + min;
  return time;
}

function minutesFromNow(unixTimestamp){
  var currentTime = Math.floor(new Date() / 1000);
  var minutes = (unixTimestamp - currentTime) / 60;
  return minutes.toFixed(2);
}

function findStationName(stop_id) {
  var stationFound = stations2.find(function(station){
    return station.title === stop_id
  })
  return stationFound.label
}
