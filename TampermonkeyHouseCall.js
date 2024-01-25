 //********************maps control*********************************************

 waitForKeyElements('[alt="logo"]', actionFunction, true)
 function actionFunction (jNode){
   console.log("FOUND");
   const mapSearchBar = document.createElement("span");
   mapSearchBar.innerHTML = `
   <input id="autocomplete" placeholder="Test placeholeder" type="text" size="50">
   <button onclick="calculateDrivingTime()">Calculate</button>
   <button type="button" onclick="showMap()">Show Map</button>
   <div id="output"></div>
   <div id="map" style="z-index:20;position:relative;></div>
   <div id="fullAddress"></div>
   `;
   document.querySelectorAll('[title="Settings"]')[1].closest("div").appendChild(mapSearchBar);

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
   // TODO create ifs: state = WI IL (NC SC)
   var streeetAddrAll = document.querySelectorAll('[data-testid="calendarItem__street"]');
   var zipAddrAll = document.querySelectorAll('[data-testid="calendarItem__zip"]');
   if(streeetAddrAll.length > 0 && zipAddrAll.length > 0){
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
     arrayOfAddrAndDOMs = [];
     var destinations = [];
     for (let i = 0; i < zipAddrAll.length; i++) {
       if(zipAddrAll[i].textContent.match(regexState)){
         arrayOfAddrAndDOMs.push([streeetAddrAll[i],streeetAddrAll[i].textContent.concat(', ', zipAddrAll[i].textContent)])
         destinations.push(streeetAddrAll[i].textContent.concat(', ', zipAddrAll[i].textContent))

       };
     }
   };
   getDistanceMatrixForLargeSet(arrayOfAddrAndDOMs);

   // var service = new google.maps.DistanceMatrixService();
   // service.getDistanceMatrix({
   //   origins: [from],
   //   destinations: destinations,
   //   travelMode: 'DRIVING',
   //   unitSystem: google.maps.UnitSystem.METRIC,
   // }, callback);
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
   for (let i = 0; i < resultMatrix.length; i ++) {
     for (let j = 0; j < resultMatrix[i].rows[0].elements.length; j ++) {
       let curDur = tempMatrix[i].rows[0].elements[j].duration.text
       let style = "";
       if (tempMatrix[i].rows[0].elements[j].duration.value < 1200){
         style = "background-color:darkgreen;color:white";
       } else if (tempMatrix[i].rows[0].elements[j].duration.value < 2400) {
         style = "background-color:darkorange;color:white";
       } else {
         style = "background-color:black;color:white";
       }

       destinations[currentDomeEl][0].innerHTML = "<span style=" + style + ">" + curDur + " </span>" + destinations[currentDomeEl][0].innerHTML
       currentDomeEl++;
     }
   }


   // var output = document.getElementById('output');
   // output.innerHTML = '';

   // for (var i = 0; i < response.rows[0].elements.length; i++) {
   //   var destination = response.destinationAddresses[i];
   //   var duration = response.rows[0].elements[i].duration.text;
   //   output.innerHTML += '<p>Driving time to ' + destination + ': ' + duration + '</p>';

   console.log(resultMatrix);
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