'use strict'

function switchLanguage(lang) {
  TEXT.setLang(lang);
  updateText();
}

function updateText() {
  $('#title').text(TEXT.getText('title'));
  $('#home').text(TEXT.getText('home'));
  $('#stations_map').text(TEXT.getText('stations_map'));

  $('#station_list_text_tab').text(TEXT.getText('stations_list'));
  $('#location_text').text(TEXT.getText('location'));
  // WARNING
  let location = $('#location_name').text();
  if(location === TEXT.getTextLocalize('no_location', 'fr') || location === TEXT.getTextLocalize('no_location', 'en')) {
    $('#location_name').text(TEXT.getText('no_location'));
  }

  $('#state > h3').text(TEXT.getText('station_state'));
  $('#table_state_id').text(TEXT.getText('id_station'));
  $('#table_state_ba').text(TEXT.getText('bicycles_available'));
  $('#table_state_blocked').text(TEXT.getText('blocked'));
  $('#table_state_ta').text(TEXT.getText('terminals_available'));
  $('#table_state_suspended').text(TEXT.getText('suspended'));
  $('#table_state_bu').text(TEXT.getText('bicycles_unavailable'));
  $('#table_state_ooo').text(TEXT.getText('ooo'));
  $('#table_state_tu').text(TEXT.getText('terminals_unavailable'));

  $('#liste > h3').text(TEXT.getText('stations_list'));
  $('#table_list_name').text(TEXT.getText('station_name'));
  $('#table_list_b').text(TEXT.getText('bicycles_available'));
  $('#table_list_t').text(TEXT.getText('terminals_available'));
  $('#table_list_blocked').text(TEXT.getText('blocked_state'));
  $('#table_list_suspended').text(TEXT.getText('suspended_state'));

}

$(document).ready(function() {
  updateText();

  let lang = TEXT.getLang();
  if(lang === 'fr') {
    $($('.dropdown-menu li')[1]).addClass('language-selected');
  } else if (lang === 'en') {
    $($('.dropdown-menu li')[0]).addClass('language-selected');
  }

  $('.dropdown-menu li').click(function(event){
    $('.dropdown-menu li').removeClass('language-selected');
    $(this).addClass('language-selected');
    let language = $(this).text();
    if(language === 'English') {
      switchLanguage('en');
    } else if(language === 'Français') {
      switchLanguage('fr');
    }
  })
});
