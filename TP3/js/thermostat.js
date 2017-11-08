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
    }
  });
});
/*********************Ne pas modifier***********************/

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}
