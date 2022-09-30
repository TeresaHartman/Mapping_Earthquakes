# Mapping_Earthquakes

Used GeoJSON along with the Leaflet library and mapbox API to create an interative world map showing earthquakes that happened within the past 7 days. This is all done while building upon my JavaScript skills, along with the d3 libraby.  <br/><br/>


There are three different base layers of the map:
* Streets
* Satellite Streets
* Dark
<br/>

There are three different overlayers including
* All earthquakes within the past 7 days
* Techtonic Plates
* Major earthquakes within the past 7 days (measuring of a magniture of 4.5 or greater)
<br/>

Other things that were utilized included  
* circleMarker
* bindPopup
  * Shows the magnitude and location of the earthquake when the marker is clicked 
* Styling information
  * including different color and radius of markers dependent on magniture of earthquakes
* Legend that explains the different colors of each magniture 
