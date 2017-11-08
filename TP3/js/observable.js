'use strict';

var Observable = function(data) {
  this.data = data;
  this.observers = new Array();
  this.run();
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

  notifyAll: function(msg) {
    this.observers.forEach(function(o){
      o.update(msg, this.data);
    });
  },

  run: function() {
    setTimeout(() => {
      data.callback();
      this.notifyAll('chambre_updated');
      this.run();
    }, 1000);
  }

};
