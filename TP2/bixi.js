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

function mapJsonToDisplayedData(stations) {
  return stations.map(function(station){
    return {
      id: station.id,
      name: station.s,
      blocked: station.b,
      bicycles_available: station.ba,
      bicycles_unavailable: station.bx,
      terminals_available: station.da,
      terminals_unavailable: station.dx,
      suspended: station.su,
      out_of_order: station.m,
      latitude: station.la,
      longitude: station.lo
    }
  });
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

function updateMap(station) {
	pos = {lat: station.latitude, lng: station.longitude};
	map = new google.maps.Map(document.getElementById('map'), {
	  center: pos,
	  zoom: 17
	});
	var marker = new google.maps.Marker({
	  position: pos,
	  map: map
	});

}

//Get JSON from bixi
$.getJSON('https://secure.bixi.com/data/stations.json', function(json) {
  var stationNames = json.stations.map(function(station){
    return station.s;
  });

  // Used to handle event when user select a field from autocompletion
  function fieldSelected(event, ui) {
    var value = ui.item.value;
    var stationInfo = json.stations.filter(function(station){
      if(station.s === value) {
        return station
      }
    });
    station = mapJsonToDisplayedData(stationInfo)[0]
    displayStationInfo(station);
    updateMap(station);
  }


  // Assign autocompletion to input field
  $(document).ready(function(){
    $('#station-name-id').autocomplete({
      source: stationNames,
      select: fieldSelected
    });

	var montreal = {lat: 45.5016889, lng: -73.5672559};
    var map = new google.maps.Map(document.getElementById('map'), {
		  center: montreal,
		  zoom: 12
		});
  });




});
