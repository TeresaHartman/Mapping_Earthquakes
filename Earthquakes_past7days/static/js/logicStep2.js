// Add console.log to check to see if our code is working.
console.log("working");


// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

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

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id:'mapbox/satellite-streets-v11',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.5, -98.5], //Center of US
    zoom: 3,
    layers: [streets]
  });

// // Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
};

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}

// Creating a GeoJSON layer with the retrieved data.
d3.json(earthquakeData).then(function(data) {
    L.geoJSON(data, {

        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
                   console.log(data);
                    return L.circleMarker(latlng);
        },

    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo
    }).addTo(map);
    
});


// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//     console.log(data);

//     L.geoJson(data,{
//         "color": "#FAF884", 
//         "weight": 2,
//         onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3><hr><h3> Destination: " +
//                      feature.properties.dst + "</h3>");
//         }
//     }).addTo(map);
// });