"use strict";

const bMapAPIKey = secrets.bMapAPIKey;

let map;
function initMap() {

  const storeLocation = new Microsoft.Maps.Location(42.307946, -88.995186); 

  map = new Microsoft.Maps.Map(document.getElementById('storeMap'), {
    credentials: bMapAPIKey,
    center: storeLocation,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    zoom: 14,
    disableScrollWheelZoom: true,
  });

  
  const infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false
  });

 
  infobox.setMap(map);

  const pin = new Microsoft.Maps.Pushpin(storeLocation, {
    title: "Creative Store Name",
    subTitle: "(Actually Rock Valley College)"
  });
  pin.metadata = {
    title: "Creative Store Name",
    description: "3301 N Mulford Rd, Rockford, IL"
  };

  
  map.entities.push(pin);

  Microsoft.Maps.Events.addHandler(pin, "click", function pushpinClicked(e) {
  
    if (e.target.metadata) {
    
      infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
      });
    }
  });

}