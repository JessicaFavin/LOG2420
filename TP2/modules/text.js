'use strict';

var TEXT = (function(){
  var self = {};
  var lang;
  var text;

  $.getJSON('text-min.json', function(json){
    text = json;
  });

  function getLang() {
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
      return text[key][getLang()];
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

  return self;
})();
