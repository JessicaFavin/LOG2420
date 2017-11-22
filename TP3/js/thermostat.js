/* Extrait les valeurs produites dans la page Web et par le simulateur
 * et d�clanche l'affichage des valeurs dans la page
*/


/*Code jquery qui affiche un glisseur dans le conteneur ayant
 *l'identifiant #thermostat, qui initalise sa position et ses valeurs
 *par d�faut et qui affiche la valeur s�lectionn�e dans un conteneur
 *ayant l'identifiant #valeurThermostat
 *
 *Pour d�marrer le chauffage, il faut cliquer le curseur de d�filement
 */
/*********************Ne pas modifier***********************/
 $(document).ready(function() {
  $("#thermostat").slider(
  {
    orientation: 'vertical',
    max: 40 ,
    value: temperatureThermostat,
    min: -10 ,
    step: 1
  });
  $("#thermostat").slider({
    change: function(event, ui) {
      $("#tdValeurThermostat").text( ui.value );
    }
  });
  $("#thermostat").slider("pips",{step: 10, rest: "label", suffix: "°C"});
});
/*********************Ne pas modifier***********************/


/**
 * Code qui va créer les observers et l'observable,
 * paramétrer l'observable avec chrono(),
 * et ajouter les observers à l'observable.
 */
$(document).ready(function(){

  // Init Observers
  let thermometre = new ThermometreObserver();
  let thermostat = new ThermostatObserver();

  // Init Observable
  let chambreObservable = new Observable();

  // Setup chrono() pour chambreObservable
  chambreObservable.chrono = function() {
    let self = this;
    setTimeout(() => {
      ticTac()
      let data = {
        chauffage: chauffage,
        temperature: temperatureInterieure
      }
      self.notifyAll('chambre_updated', data);
      self.chrono();
    }, 500);
  }
  chambreObservable.chrono();

  // Ajoute les observers à l'observable
  chambreObservable.addObserver(thermometre);
  chambreObservable.addObserver(thermostat);
});
