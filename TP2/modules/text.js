'use strict';

var TEXT = (function(){
  var self = {};
  var lang;
  var text;

  $.getJSON('text-min.json', function(json){
    text = json;
  });

  self.getLang = function() {
    let l = localStorage.getItem('lang');
    if(!l) {
      localStorage.setItem("lang", "fr")
      return 'fr';
    }
    return l;
  }

  self.setLang = function(l) {
    if(l !== "fr" && l !== "en") {
      throw new Error("Wrong language!");
    } else {
      localStorage.setItem('lang', l);
      lang = l;
    }
  }

  self.getText = function(key) {
    if(!text[key]) {
      throw new Error("Wrong key!");
    } else {
      return text[key][self.getLang()];
    }
  }

  self.getTextLocalize = function(key, l) {
    if(!text[key]) {
      throw new Error("Wrong key!");
    }  else if (!text[key][l]) {
      throw new Error("Wrong language!");
    } else {
      return text[key][l];
    }
  }

  self.getTextFromBoolean = function(bool) {
    if(bool) {
      return text.yes[self.getLang()];
    } else {
      return text.no[self.getLang()];
    }
  }

  return self;
})();
