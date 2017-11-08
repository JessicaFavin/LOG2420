'use strict';

// Observer classes
var ThermostatObserver = function() {};

ThermostatObserver.prototype = {

  update: function(msg, data) {
    if(msg === 'chambre_updated') {
      let chauffage = data.chauffage;
      this.updateChauffage(chauffage);
    }
  },

  updateChauffage: function(chauffage) {
    $('#heating-state').removeClass('actif inactif');
    if(chauffage) {
      $('#heating-state').addClass('actif');
      $('#heating-state').text('Actif');
    } else {
      $('#heating-state').addClass('inactif');
      $('#heating-state').text('Inactif');
    }
  }
};


var ThermometreObserver = function() {};

ThermometreObserver.prototype = {

  update: function(msg, data) {
    if(msg === 'chambre_updated') {
      let temperature = data.temperature;
      this.updateThermometre(temperature);
    }
  },

  updateThermometre: function(temperature) {
    $('#room-temp').attr('value', temperature.toFixed(1))
    $('#room-temp-value').text(temperature.toFixed(1));
  }
};
