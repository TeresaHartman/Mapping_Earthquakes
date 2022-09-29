// Add console.log to check to see if our code is working.
console.log("working");


// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let dayN = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-preview-day-v4',
    // To change the map's style, change the map id using the list of Mapbox ids below:
        // mapbox/streets-v11
        // mapbox/outdoors-v11
        // mapbox/light-v10
        // mapbox/dark-v10
        // mapbox/satellite-v9
        // mapbox/satellite-streets-v11
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let nightN = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Day Navigation": dayN,
    "Night Navigation": nightN
};

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [nightN]
  });

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/TeresaHartman/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/TeresaHartman/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);

    L.geoJson(data,{
        "color": "#FAF884", 
        "weight": 2,
        onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3><hr><h3> Destination: " +
                     feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});