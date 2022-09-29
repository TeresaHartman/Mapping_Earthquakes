// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // To change the map's style, change the map id using the list of Mapbox ids below:
        // mapbox/streets-v11
        // mapbox/outdoors-v11
        // mapbox/light-v10
        // mapbox/dark-v10
        // mapbox/satellite-v9
        // mapbox/satellite-streets-v11
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/TeresaHartman/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    
    
    // trying to add data to markers. Doesn't like something 
    L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
        console.log(feature.properties.id);
        return L.marker(latlng)
        .bindPopup("<h3> Airport code: " + feature.properties.faa + "<hr>" +
                    "Airport hame: " + feature.properties.name + "</h3>").addTo(map);
      }
    });

});

    

