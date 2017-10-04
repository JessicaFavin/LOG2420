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
  $('#location-name').text(station.s);
  $('#station-id').text(station.id);

  $('#station-blocked')
    .removeClass("green red")
    .addClass(getCSSClass(station.b))
    .text(getStringFromBoolean(station.b));
  $('#station-suspended')
    .removeClass("green red")
    .addClass(getCSSClass(station.su))
    .text(getStringFromBoolean(station.su));
  $('#station-ooo')
    .removeClass("green red")
    .addClass(getCSSClass(station.m))
    .text(getStringFromBoolean(station.m));

  $('#station-bicycles-availaible')
    .removeClass("green red")
    .text(station.ba);

  $('#station-bicycles-availaible').addClass(getCSSClass(station.ba == 0));

  $('#station-terminals-availaible')
    .removeClass("green red")
    .text(station.da);

  $('#station-terminals-availaible').addClass(getCSSClass(station.da == 0));

  $('#station-bicycles-unavailaible').text(station.bx);
  $('#station-terminals-unavailaible').text(station.dx);
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
  }


  // Assign autocompletion to input field
  $(document).ready(function(){
    $('#station-name-id').autocomplete({
      source: stationNames,
      select: fieldSelected
    });

    map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -34.397, lng: 150.644},
		  zoom: 8
		});
  });




});
