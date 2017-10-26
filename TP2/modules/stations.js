'use strict';

// Module for stations
// Load the Json and then keep a reference to it
var STATIONS = (function(){
  var self = {};
  var stations;

  // Private method to map the loaded JSON
  // Into our Model
  function mapJSONintoModel(stations) {
    return stations.map(function(station){
      return {
        id: station.id,
        name: station.s,
        blocked: station.b,
        bicycles_available: station.ba,
        bicycles_unavailable: station.bx,
        terminals_available: station.da,
        terminals_unavailable: station.dx,
        suspended: station.su,
        out_of_order: station.m,
        latitude: station.la,
        longitude: station.lo
      }
    });
  }

  // Always call this method to access stations
  self.getStations = function(callback) {
    if(!stations) {
      $.getJSON('https://secure.bixi.com/data/stations.json', function(json) {
        stations = mapJSONintoModel(json.stations);
        callback(stations)
      });
    } else {
      callback(stations);
    }
  }

  // Get all the station names
  // Paramater callback = function(names)
  self.getStationNames = function(callback) {
    self.getStations(function(stations){
      let names = stations.map(function(s){
        return s.name;
      });
      callback(names);
    });
  }

  // Get a specific station from a name
  // Paramater callback = function(station)
  self.getStation = function(name, callback) {
    self.getStations(function(stations) {
      let station = stations.filter(function(s){
        if(s.name === name) return s;
      });
      callback(station[0]);
    });
  }

  return self;
})();
