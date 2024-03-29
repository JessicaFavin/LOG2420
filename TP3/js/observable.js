'use strict';

/**
 * Observable - Objet qui va être observé et notifier les observer quand son état va changer.
 * @constructor
 * @return new Observable
 */
var Observable = function() {
  this.observers = new Array();
};

Observable.prototype = {

  /**
   * Ajoute un nouvel observer à l'ensemble des observers.
   * Un observer doit posséder la méthode update(msg, data).
   * @param {Observer} observer - L'observer à ajouter
   * @return void
   */
  addObserver: function(observer) {
    this.observers.push(observer);
  },

  /**
   * Supprime un  observer de l'ensemble des observers
   * @param {Observer} observer - L'observer à supprimer
   * @return void
   */
  removeObserver: function(observer) {
    let index = this.observers.indexOf(observer);
      if (~index) {
        this.observers.splice(index, 1)
      }
  },

  /**
   * Méthode utilisée pour notifier les observers d'un changement d'état de notre observable.
   * Cette méthode doit appeler la méthode update(msg, data) de chaque observers
   * @param {string} msg - Message caractérisant le changement d'état
   * @param {Object} data - Données associées au changements d'état (optionnel)
   * @return void
   */
  notifyAll: function(msg, data) {
    this.observers.forEach(function(o){
      o.update(msg, data);
    });
  }
};
