
// Script written by Justin Chang
// Date: February 28, 2020.

// Access token from Map box studio.
mapboxgl.accessToken = "pk.eyJ1IjoianVzdGluY29ncyIsImEiOiJjazZtYjNxOGgwbzAyM25wYjdrMmF2dWw3In0.t3Mqouc0S74OiDOnSeWJFw";

// Set original coordinates
var coordinates = [-74.009,40.731]

// Bring in layers from Mapbox Studio.
var map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/justincogs/ck715yit6042v1iqja1hrpvtz",
  center: [-73.937,40.733],
  zoom: 11.91
});

// add popup for bike shelter points
map.on('click', function(e) {
  var bikeshelters = map.queryRenderedFeatures(e.point, {
    layers: ['bikeshelters'] // replace this with the name of the layer
  });

  if (!bikeshelters.length) {
    return;
  }

  var feature = bikeshelters[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h6>' +'<b>Bike Shelter ' + feature.properties.shelter_id+'</b>' + '</h6>'+'This shelter is located at <b>' + feature.properties.location +'</b> in <b>'+ feature.properties.boro_name+ ' </b> Borough, NYC.</p>')
    .addTo(map);
});

// Adds pop ups for bike prioriy area polygons.
map.on('click', 'BikePriorityAreas', function(e) {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML(e.features[0].properties.boro_cd_co )
.addTo(map);
});

// Adds pop ups for bike routes lines.
map.on('click', 'BikeRoutes', function(e) {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML('Bike route on ' + e.features[0].properties.street +'street.' )
.addTo(map);
});

// Adds geocoder control to Mapbox GL Js as a plugin
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// Add Map direction plug in.
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),'bottom-right'
);
