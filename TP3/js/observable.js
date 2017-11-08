'use strict';

var Observable = function() {
  this.observers = new Array();
};

Observable.prototype = {

  addObserver: function(observer) {
    this.observers.push(observer);
  },

  removeObserver: function(observer) {
    let index = this.observers.indexOf(observer);
      if (~index) {
        this.observers.splice(index, 1)
      }
  },

  notifyAll: function(msg, data) {
    this.observers.forEach(function(o){
      o.update(msg, data);
    });
  }
};
