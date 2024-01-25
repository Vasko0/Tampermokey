// ==UserScript==
// @name         Regexp ForCallrail
// @namespace    ARGO
// @version      2024-01-20
// @description  try to take over the world!
// @author       Vasko
// @match        https://app.callrail.com/lead-center/*
// @icon         https://vaskotech.com/wp-content/uploads/2023/06/VaskoLogoRound-150x150.png
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js
// ==/UserScript==



(function() {
    'use strict';

waitForKeyElements('[queryparamshandling="merge"]', actionFunction, false);
function actionFunction (jNode){
  var value = document.querySelectorAll('[queryparamshandling="merge"]')[0].innerHTML;
  var regex = /(-)+/gi;
  console.log(value.replace(regex, ''));
  console.log(value);
  var regPhoneNum = value.replace(regex, '')
  var newPhoneNum = `<a href='https://pro.housecallpro.com/pro/customers/list?search_term=${regPhoneNum}&page_size=50&page=1'>${regPhoneNum}</a>`
  document.querySelectorAll('[queryparamshandling="merge"]')[0].innerHTML = newPhoneNum;
  //window.open('https://vaskotech.com', 'HousecallWindow');
};

})();