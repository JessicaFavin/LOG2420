'use strict';

// Main script
// Handle the main logic of the app

// Simply facade to TEXT module
function getStringFromBoolean(bool) {
  return TEXT.getTextFromBoolean(bool);
}

// Return the correct CSS class according to the bool
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
  $('#location_name').text(station.name);
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

// Update marker of our Map
// Will unset the previous marker, create a new one and push it to the markers array
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

// Update position and zoom map, and the marker
function updateMap(station, map, markers) {
	let pos = {lat: station.latitude, lng: station.longitude};
  map.setCenter(pos);
  map.setZoom(17);
	updateMarker(markers, map, pos)
}

// To call when the user click on a field from the autocomplete component
// Will get the station according to the station name
// Update the view (fields and map)
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

// Load the table, according to the current language
// To call when the language change
function loadTable() {
  
  STATIONS.getStations(function(stations){

    var lang;
    if(TEXT.getLang() === 'fr') {
      lang = "French";
    } else {
      lang = "English"
    }

    $('#table').dataTable({
      'destroy': true,
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
      ],
      'language': {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/'+ lang +'.json'
      }
      });

  });
}

$(document).ready(function(){

  // Map settings
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

  // Load Table
  loadTable();
});
