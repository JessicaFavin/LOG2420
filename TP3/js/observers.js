'use strict';

function updateChauffage(chauffage) {
  $('#heating-state').removeClass('actif inactif');
  if(chauffage) {
    $('#heating-state').addClass('actif');
    $('#heating-state').text('Actif');
  } else {
    $('#heating-state').addClass('inactif');
    $('#heating-state').text('Inactif');
  }
}

function updateThermometre(temperature) {
  $('#room-temp').attr('value', temperature.toFixed(0))
  $('#room-temp-value').text(temperature.toFixed(0));
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
    let temperature = data.temperature;
    updateThermometre(temperature);
  }
};
