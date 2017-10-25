'use strict';

function getStringFromBoolean(bool) {
  if(bool) {
    return 'Oui';
  } else {
    return 'Non';
  }
}

function getCSSClass(bool) {
  if(bool) {
    return 'red';
  }
  else {
    return 'green';
  }
}

// Display Info into table
function displayStationInfo(station) {
  $('#location-name').text(station.name);
  $('#station-id').text(station.id);

  $('#station-blocked')
    .removeClass("green red")
    .addClass(getCSSClass(station.blocked))
    .text(getStringFromBoolean(station.blocked));
  $('#station-suspended')
    .removeClass("green red")
    .addClass(getCSSClass(station.suspended))
    .text(getStringFromBoolean(station.suspended));
  $('#station-ooo')
    .removeClass("green red")
    .addClass(getCSSClass(station.out_of_order))
    .text(getStringFromBoolean(station.out_of_order));

  $('#station-bicycles-availaible')
    .removeClass("green red")
    .text(station.bicycles_available);

  $('#station-bicycles-availaible').addClass(getCSSClass(station.bicycles_available == 0));

  $('#station-terminals-availaible')
    .removeClass("green red")
    .text(station.terminals_available);

  $('#station-terminals-availaible').addClass(getCSSClass(station.terminals_available == 0));

  $('#station-bicycles-unavailaible').text(station.bicycles_unavailable);
  $('#station-terminals-unavailaible').text(station.terminals_unavailable);
}

function updateMarker(markers, map, pos) {
  markers.forEach(function(marker){
    marker.setMap(null);
  });
  let marker = new google.maps.Marker({
	  position: pos,
	  map: map
	});
  markers = []
  markers.push(marker);
}

function updateMap(station, map, markers) {
	let pos = {lat: station.latitude, lng: station.longitude};
  map.setCenter(pos);
  map.setZoom(17);
	updateMarker(markers, map, pos)
}

function fieldSelected(event, ui, map, markers) {
  let name = ui.item.value;
  let station = STATIONS.getStation(name, function(station) {
    if(!station) {
      alert('Station not found!');
    } else {
      displayStationInfo(station);
      updateMap(station, map, markers);
    }
  });
}

//Get JSON from bixi
$(document).ready(function(){

  let montreal = {lat: 45.5016889, lng: -73.5672559};
  var map = new google.maps.Map(document.getElementById('map'), {
     center: montreal,
     zoom: 12
    });

  // To keep ref to markers of our map
  var markers = [];

  // Assign autocompletion to input field
  STATIONS.getStationNames(function(names){
    $('#station-name-id').autocomplete({
      source: names,
      select: function(event, ui) {
        fieldSelected(event, ui, map, markers);
      }
    });
  });

  STATIONS.getStations(function(stations){
    $('#table').dataTable({
    'aaData': stations,
    'aoColumns' : [
      { 'mDataProp': 'id' },
      { 'mDataProp': 'name' },
      { 'mDataProp': 'bicycles_available' },
      { 'mDataProp': 'terminals_available' },
      { 'mDataProp': 'blocked',
        'render' : function(data, type, row, meta) {
            return getStringFromBoolean(data);
          }
      },
      { 'mDataProp': 'suspended',
        'render' : function(data, type, row, meta) {
            return getStringFromBoolean(data);
          }
      }
      ]
    });
  });
});
