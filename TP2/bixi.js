function getStringFromBoolean(bool) {
  if(bool) {
    return 'Oui';
  } else {
    return 'Non';
  }
}

// Display Info into table
function displayStationInfo(station) {
  $('#location-name').text(station.s);
  $('#station-id').text(station.id);

  $('#station-blocked')
    .removeClass("true false")
    .addClass(station.b)
    .text(getStringFromBoolean(station.b));
  $('#station-suspended')
    .removeClass("true false")
    .addClass(station.su)
    .text(getStringFromBoolean(station.su));
  $('#station-ooo')
    .removeClass("true false")
    .addClass(station.m)
    .text(getStringFromBoolean(station.m));

  $('#station-bicycles-availaible')
    .removeClass("zero")
    .text(station.ba);

  if(station.ba == 0) {
    $('#station-bicycles-availaible').addClass("zero");
  }

  $('#station-terminals-availaible')
    .removeClass("zero")
    .text(station.da);

  if(station.da == 0) {
    $('#station-terminals-availaible').addClass("zero");
  }

  $('#station-bicycles-unavailaible').text(station.bx);
  $('#station-terminals-unavailaible').text(station.dx);
}

function updateMap(station) {
	pos = {lat: station.la, lng: station.lo};
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
    displayStationInfo(stationInfo[0]);
    updateMap(stationInfo[0]);
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
