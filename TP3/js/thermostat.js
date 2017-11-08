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
    value:temperatureThermostat,
    min: -10 ,
    step: 1
  });
  $("#thermostat").slider({
    change: function(event, ui) {
      $("#tdValeurThermostat").text( ui.value );
      temperatureThermostat = ui.value;
    }
  });
});
/*********************Ne pas modifier***********************/

$(document).ready(function(){

  // Set the Observers
  let thermometre = new ThermometreObserver();
  let thermostat = new ThermostatObserver();

  let chambreObservable = new Observable();
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
    }, 1000);
  }
  chambreObservable.chrono();
  chambreObservable.addObserver(thermometre);
  chambreObservable.addObserver(thermostat);
});
