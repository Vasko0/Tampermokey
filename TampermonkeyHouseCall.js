// ==UserScript==
// @name         MapsRouteHouseCall
// @namespace    ARGO
// @version      2024-01-20
// @description  try to take over the world!
// @author       Vasko
// @match        https://pro.housecallpro.com/*
// @match        https://API.housecallpro.com/*
// @match        https://pro.housecallpro.com/pro/calendar*
// @match        https://api.housecallpro.com/pro/calendar*
// @require      https://code.jquery.com/jquery-3.7.1.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
  'use strict';
//********************maps control*********************************************
//waitForKeyElements('[alt="logo"]', waitForKeyElements('[title="Settings"]', actionFunction, true), true)
if (window.location.href.match('calendar')){
  console.log("if waitfor");
  //waitForKeyElements('[alt="logo"]', actionFunction, true)
  waitForKeyElements('[data-testid="calendar-settings-button"]', actionFunction, true)
}else{
  //waitForKeyElements('[data-testid="schedule-calendar-header"]', actionFunction, true)
  console.log("else waitfor");
  waitForKeyElements('[data-testid="calendar-settings-button"]', actionFunction, true)
}
var perPageCounter = 0

function actionFunction (jNode){
   console.log("actionFunction start");
 if (perPageCounter > 0){return}
 perPageCounter++
 console.log("FOUND_Map");
 const mapSearchBar = document.createElement("span");
 mapSearchBar.innerHTML = `
 <input id="autocomplete" placeholder="Start typing address here" type="text" size="50">
 <button onclick="calculateDrivingTime()">Calculate</button>
 <button type="button" onclick="showMap()">Show Map</button>
 <button type="button" onclick="clearMapItems()">Clear</button>
 <div id="output"></div>
 <div id="map" style="z-index:20;position:relative;></div>
 <div id="fullAddress"></div>
 `;
 document.querySelectorAll('[aria-label="Settings"]')[1].closest("div").appendChild(mapSearchBar);

 runScripVas();
};

function runScripVas(){


 var head = document.head || document.documentElement;

 // prepend Google API scrip + key (not used if already on page)
 // var script = document.createElement('script');
 // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDeBhOue1TCxplxf1_2xnXteTfgykTY-fI&callback=initAutocomplete&libraries=places&v=weekly';
 // head.appendChild(script);


 // Append custom script
 var script2 = document.createElement('script');
 script2.textContent = `
 //************************ add info about techs ************
 function addStyleTech(value) {
   const el = document.createElement("div");
   el.innerHTML = value;
   return el;
 }
 function setTechBackG (el, value) {
   document.querySelectorAll('div.fc-resource-custom-name')[el].parentNode.parentNode.parentNode.style.backgroundColor = value;
 }
 console.log("tech color start")
 var techNames = document.querySelectorAll('div.fc-resource-custom-name')
 var techId = [];
 for (var i = 0; i < techNames.length; i++) {
   techId[i] = document.querySelectorAll('div.fc-resource-custom-name')[i].parentNode.parentNode.parentNode.parentElement.parentNode.getAttribute("data-resource-id");



   if (techId[i] == "pro_31bcb8b8e8cd4bb5873ed2088a01b911") { //Stan Biesov (.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_a9491bde4374426aad7d34ce9aadd5c7") { //Dima (.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_ee02bc657e964cfdab365d8ef7802acf") { // Thomas P.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_440038adf2b34f239ad5d9a4d97915ba") { // VINCE S.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_698ab00ea4cd4f838d12cfc92c6b6234") { //Vladys Z.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_e83760c8909f48fcbb9858d55e35c0dd") { //Pavel B.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech("RU"));
   } else if (techId[i] == "pro_b53b1579047244a786e6871212abb5e3") { // Mike L.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_9d89838da3f5402cb9e04c75c001e4ae") { //Paul G.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech("RU"));
   } else if (techId[i] == "pro_6e70ba4903ec43b68630b9cead41dc2d") { //Fred Austin
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_e214d09a11a74916bc36576139faa984") { //Jacob H.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech("RU"));
   } else if (techId[i] == "pro_c7708d804b0e4aaa8542c62bee3f86b5") { //Erik V.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech("Eng no W"));
   } else if (techId[i] == "pro_c631993418fa4565bef08ade2d2c1134") { //Leo.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_b47254f10dd24f31a2f7efdd8f43fd09") { //Ihor B.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech("UA"));
   } else if (techId[i] == "pro_52b8a9a625ff44e2993802703591d40b") { //Alex T.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_3ca52e53c54d488c8c5fc876baa1c23f") { //Serhii I.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_fa71d9ffddd14baf9898361904c871be") { //Viktor A.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech("RU"));
   } else if (techId[i] == "pro_e44e4300eaa747bdb42c8df15169dd13") { //Yury S.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech("RU+Tech"));
   } else if (techId[i] == "pro_633f7075f0154d998648696585646cb5") { //Andrew S.
     setTechBackG(i, "lightgreen")
     techNames[i].appendChild(addStyleTech(""));
   } else if (techId[i] == "pro_9c94cc3dcf6149d89b59f4742f4524a0") { //Evgen M.
     setTechBackG(i, "lightyellow")
     techNames[i].appendChild(addStyleTech("RU"));
   }
 }

 var pavelInfo = document.createElement('div');

 pavelInfo.innerHTML = "Igor helper<br>no rollers"

 //************************** MAP ***************************
let autocompleteMaps;
let state = "";

function initAutocomplete() {
 autocompleteMaps = new google.maps.places.Autocomplete(
   document.getElementById('autocomplete'),
   {

     componentRestrictions: {'country':['US']},
     fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_components']
   }
 );
 autocompleteMaps.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
 var place = autocompleteMaps.getPlace();
 if (!place.geometry) {
   document.getElementById('autocomplete').placeholder = 'enter place';
 } else {
   document.getElementById('autocomplete').value = place.formatted_address;

   for (var i = 0; i < place.address_components.length; i++) {
     var component = place.address_components[i];
     for (var j = 0; j < component.types.length; j++) {
       if (component.types[j] === 'administrative_area_level_1') {
         // 'administrative_area_level_1' corresponds to the state
         state = component.short_name;
         //document.getElementById('fullAddress').innerHTML = state;
       }
     }
   }
 }
}
initAutocomplete();

// *********************************************************
function calculateDrivingTime() {
 var arrayOfAddrAndDOMs = [];
 var from = document.getElementById('autocomplete').value;
//  var streeetAddrAll = document.querySelectorAll('[data-testid="calendarItem__street"]');
 var zipAddrAll = document.querySelectorAll('[data-testid="calendarItem__zip"]');
 if(zipAddrAll.length > 0){
   let regexState = ""
   if (state == "WI"){
     regexState = /, WI/g;
   }
   if (state == "IL"){
     regexState = /, IL/g;
   }
   if (state == "NC" || state == "SC"){
     regexState = /, NC|, SC/g;
   }
   console.log("regexState ",regexState);
   arrayOfAddrAndDOMs = [];
   arrayOfAddrіSkipped = [];
   var destinations = [];
   for (let i = 0; i < zipAddrAll.length; i++) {
     if(zipAddrAll[i].textContent.match(regexState)){
       arrayOfAddrAndDOMs.push([zipAddrAll[i].previousElementSibling,zipAddrAll[i].previousElementSibling.textContent.concat(', ', zipAddrAll[i].textContent)])
       destinations.push(zipAddrAll[i].previousElementSibling.textContent.concat(', ', zipAddrAll[i].textContent))
     } else {
       //let customRegular = /, IL/g;
       //if(zipAddrAll[i].textContent.match(customRegular)) {
       //  arrayOfAddrіSkipped.push([zipAddrAll[i].previousElementSibling,zipAddrAll[i].previousElementSibling.textContent.concat(', ', zipAddrAll[i].textContent),i])
       //}
     };
   }
 };
 console.log("arrayOfAddrAndDOMs ",arrayOfAddrAndDOMs);
 //console.log("arrayOfAddrіSkipped ",arrayOfAddrіSkipped);
 getDistanceMatrixForLargeSet(arrayOfAddrAndDOMs);

}


// ************************************************************
// simple func to get distance matrix for multiple origins and destinations up to 25
function getDistanceMatrix(origins, destinations) {
 const service = new google.maps.DistanceMatrixService();

 const promise = new Promise((resolve, reject) => {
   service.getDistanceMatrix(
     {
       origins: origins,
       destinations: destinations,
       travelMode: 'DRIVING',
       unitSystem: google.maps.UnitSystem.METRIC,
       avoidHighways: false,
       avoidTolls: false,
     },
     (response, status) => {
       if (status === 'OK') {
         resolve(response);
       } else {
         reject(status);
       }
     }
   );
 });

 return promise;
}
var tempMatrix
// function to get distance matrix for more than 25 directions
async function getDistanceMatrixForLargeSet(destinations) {
 const origin = [document.getElementById('autocomplete').value];

 const batchSize = 25;
 let resultMatrix = [];

 for (let i = 0; i < destinations.length; i += batchSize) {
   const batchDestinationsAndDoms = destinations.slice(i, i + batchSize);
   const batchDestinations = batchDestinationsAndDoms.map(subArray => subArray[1]);
   const result = await getDistanceMatrix(origin, batchDestinations);
   resultMatrix.push(result);
 }
 console.log(resultMatrix);
 let currentDomeEl = 0;
 tempMatrix = resultMatrix;
 clearMapItems();
 for (let i = 0; i < resultMatrix.length; i ++) {
   for (let j = 0; j < resultMatrix[i].rows[0].elements.length; j ++) {
     let curDur = tempMatrix[i].rows[0].elements[j].duration.text
     let style = "";
     if (tempMatrix[i].rows[0].elements[j].duration.value < 600){
       style = "background-color:darkgreen;color:white";
     } else if (tempMatrix[i].rows[0].elements[j].duration.value < 1800) {
       style = "background-color:darkorange;color:white";
     } else {
       style = "background-color:black;color:white";
     }

     destinations[currentDomeEl][0].innerHTML = "<span id='distancetime' style=" + style + ">" + curDur + " </span>" + destinations[currentDomeEl][0].innerHTML
     currentDomeEl++;
   }
 }

 console.log("resultMatrix ", resultMatrix);
}
function clearMapItems(){
document.querySelectorAll("#distancetime").forEach(e => e.remove());
}


let mapVisible = false;
function showMap() {
 const from = document.getElementById("autocomplete").value;
 if (mapVisible) {
   document.getElementById("map").innerHTML = '';
   mapVisible = false;
 } else {
   let zoom = 10
   const embedUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDeBhOue1TCxplxf1_2xnXteTfgykTY-fI&q=" + encodeURIComponent(from)+"&zoom=" + zoom;
   document.getElementById("map").innerHTML = '<iframe ' +
     'width="600" ' +
     'height="450" ' +
     'frameborder="0" ' +
     'style="border:0" ' +
     'src="' + embedUrl + '" ' +
     'allowfullscreen>' +
     '</iframe>';
   mapVisible = true;
   }
}







`;


head.appendChild(script2);

// Clean-up:
// prepend Google API scrip + key (not used if already on page)
// script.parentNode.removeChild(script);
script2.parentNode.removeChild(script2);
}


})();