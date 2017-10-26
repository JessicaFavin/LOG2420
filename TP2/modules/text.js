'use strict';

// Module for Localized Text
// Keep all the Texts, we can access them with a key
var TEXT = (function(){
  var self = {};
  var lang;
  var text;

  // Load JSON as soon as the module is created
  $.getJSON('text-min.json', function(json){
    text = json;
  });

  // Always call this function to access the lang parameter
  // Default is Ffrench
  self.getLang = function() {
    let l = localStorage.getItem('lang');
    if(!l) {
      localStorage.setItem("lang", "fr")
      return 'fr';
    }
    return l;
  }

  // Set the language, and save it to localStorage
  // Authorized values 'fr' and 'en' only
  self.setLang = function(l) {
    if(l !== "fr" && l !== "en") {
      throw new Error("Wrong language!");
    } else {
      localStorage.setItem('lang', l);
      lang = l;
    }
  }

  // Get the Text from the key passed as parameter
  // Use the language previously set
  self.getText = function(key) {
    if(!text[key]) {
      throw new Error("Wrong key!");
    } else {
      return text[key][self.getLang()];
    }
  }

  // Get the Localized text from key, and l (language) parameter
  // Language Authorized values 'fr' and 'en' only
  self.getTextLocalize = function(key, l) {
    if(!text[key]) {
      throw new Error("Wrong key!");
    }  else if (!text[key][l]) {
      throw new Error("Wrong language!");
    } else {
      return text[key][l];
    }
  }

  // Get text from boolean i.e:
  // true is for 'yes' key
  // false is for 'no' key
  self.getTextFromBoolean = function(bool) {
    if(bool) {
      return text.yes[self.getLang()];
    } else {
      return text.no[self.getLang()];
    }
  }

  return self;
})();
