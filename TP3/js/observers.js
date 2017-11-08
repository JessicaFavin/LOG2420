'use strict';

function updateChauffage(chauffage) {
  $('#heating-state').removeClass('actif inactif');
  if(chauffage) {
    $('#heating-state').addClass('actif');
  } else {
    $('#heating-state').addClass('inactif');
  }
}

function updateThermometre(temperature) {
  $('#room-temp').attr('value', temperature)
  $('#room-temp-value').text(temperature);
}


// Observer classes
var ThermostatObserver = function() {};

ThermostatObserver.prototype.update = function(msg, data) {
  if(msg === 'chambre_updated') {
    let chauffage = data.chauffage;
    updateChauffage(chauffage);
  }
};


var ThermometreObserver = function() {};

ThermometreObserver.prototype.update = function(msg, data) {
  if(msg === 'chambre_updated') {
    let temperature = data.temperatureInterieure;
    updateThermometre(temperature);
  }
};
