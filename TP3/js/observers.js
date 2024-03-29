'use strict';

/**
 * Observer qui va écouter les changements d'état d'un observable.
 * Implemente une méthode update(msg, data) pour être notifié des changement de l'observable.
 * Va être responsable de mettre à jour le Thermostat.
 * @constructor
 * @return new ThermostatObserver
 */
var ThermostatObserver = function() {};

ThermostatObserver.prototype = {

  /**
   * Méthode appelée lorsque que le l'observable va notifier les observers du changement d'état
   * @param {string} msg - Message caractérisant le changement d'état
   * @param {Objet} data - Données associées au changement d'état (optionnel)
   * @return void
   */
  update: function(msg, data) {
    if(msg === 'chambre_updated') {
      let chauffage = data.chauffage;
      this.updateChauffage(chauffage);
    }
  },

  /**
   * Méthode pour mettre à jour la vue en fonction du chauffage.
   * @param {boolean} chauffage - Indique si le chauffage est actif (true) ou non (false)
   * @return void
   */
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

/**
 * Observer qui va écouter les changements d'état d'un observable.
 * Implemente une méthode update(msg, data) pour être notifié des changement de l'observable.
 * Va être responsable de mettre à jour le thermomètre.
 * @constructor
 * @return new ThermometreObserver
 */
var ThermometreObserver = function() {};

ThermometreObserver.prototype = {

  /**
   * Méthode appelée lorsque que le l'observable va notifier les observers du changement d'état
   * @param {string} msg - Message caractérisant le changement d'état
   * @param {Objet} data - Données associées au changement d'état (optionnel)
   * @return void
   */
  update: function(msg, data) {
    if(msg === 'chambre_updated') {
      let temperature = data.temperature;
      this.updateThermometre(temperature);
    }
  },

  /**
   * Méthode pour mettre à jour la vue en fonction de la temperature.
   * @param {Number} temperature - Temperature (en °C) de la chambre
   * @return void
   */
  updateThermometre: function(temperature) {
    $('#room-temp').attr('value', temperature.toFixed(1))
    $('#room-temp-value').text(temperature.toFixed(1));
  }
};
