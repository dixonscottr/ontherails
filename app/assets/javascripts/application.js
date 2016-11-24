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

$('document').ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var url = $form.attr('action');
    $.ajax({
      url: url,
      method: 'get'
    }).done(function(responseJSON){
      var stationPos = {lat:-40, lng:40}

      var marker = new google.maps.Marker({
        position: stationPos,
        map: map,
        title: 'STATION'
      });
      debugger;
      for(var i = 0; i < Object.keys(responseJSON).length; i++) {
        var route_id = responseJSON[i]['route_id'];
        var trip_id = responseJSON[i]['trip_id'];
        var numStops = Object.keys(responseJSON[i]['stop_time']).length
        var lastStop = responseJSON[i]['stop_time'][0].stop_id
        var time = responseJSON[i]['stop_time'][0].arrival
        // $('.train-locations').append(responseJSON);
        $('.train-locations').append(

          '<p>Number ' + i +  ':<p></p> route_id: ' + route_id + '</p><p>trip_id: ' + trip_id + '<p>latest stop: ' + lastStop + '</p><br />'
        )
      };
    });
  })
});
