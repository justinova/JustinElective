//js and leaflet stuff

// Javascript written by Justin Chang
// Date: February 5, 2020

//initialize the map

// add base map and other map layers so you can toggle back and forth.
var map = L.map('map').setView([44.6488, -63.5000], 10);

// set gray map as the basemap and have the other maps toggle using tilelayer provider plugin.
var gray = L.tileLayer.provider('Esri.WorldGrayCanvas').addTo(map);
var osm = L.tileLayer.provider('OpenStreetMap');
var watercolor = L.tileLayer.provider('Stamen.Watercolor');
var terrain = L.tileLayer.provider('Stamen.Terrain');

var basemaps = {
	"GrayCanvas": gray,
	"OpenStreetMap": osm,
	"Watercolor": watercolor,
	"Terrain": terrain
};

// https://gist.github.com/cccruzr/2be38431f91ff2adb9ded7c0e0950382#file-index-html-L45
// Allows the map to have different basemaps when chosen from the map.
L.control.layers(basemaps).addTo(map);

//create Leaflet icon variables for Boat Dock, Boat Launch and Wharf.
var boatdock = new
	L.icon({
	iconUrl: 'images/boatdock.png',
	});

var boatlaunch = new
	L.icon({
	iconUrl: 'images/boatlaunch.png'
});

var wharf = new
	L.icon({
	iconUrl: 'images/wharf.png'
});

// add some GeoJSON
// went back to original file to code the three categories and used javascript to show different attributes
// with different markers.

var geojson = L.geoJSON(hrmboat2, {
	onEachFeature: function(feature,layer) {
		// function iconByassets(feature){
			var currIcon = boatdock;
			var assetnum = feature.properties.AssetNum;
			if (assetnum == 1) currIcon = boatdock;
			else if(assetnum == 2) currIcon = boatlaunch;
			else if (assetnum == 3) currIcon = wharf;

// edit the popup so information regarding the boat facilities can be shown on the map.

// 		layer.bindPopup("<h6 class = 'infoheader'><b>HRM Boat Facility</b></h6><p class = popupcontent'>" + "Asset ID " + feature.properties.ASSETID +" is a " + feature.properties.ASSETCODE + " located in "+ feature.properties.LOCATION + "</p>");
// 		layer.setIcon(currIcon);
// 		}
// })

// Use a if statement to not show null values.
// https://stackoverflow.com/questions/37562830/only-show-filled-attributes-in-leaflet-popups-and-not-null-attributes


      var attribute_1 = feature.properties.LOCATION;
      if (attribute_1 == null) {
          attribute_1 = "";
        } else {
            var attribute_1 = feature.properties.LOCATION
        };

      layer.bindPopup("<h6 class = 'infoheader'><b>HRM Boat Facility</b></h6><p class = popupcontent'>"
			+ "Asset ID " + feature.properties.ASSETID +" is a " + feature.properties.ASSETCODE + " located in "
			+ attribute_1 + "</p>")
			layer.setIcon(currIcon);
		}
  }).addTo(map);




// marker clusters (custmized on the css page)
var markers = L.markerClusterGroup();
		markers.addLayer(geojson);

		map.addLayer(markers);

// scale on the map
L.control.betterscale({imperial:false, metric:true}).addTo(map);

// add a control to do a box zoom (not sure if it works)
L.Control.boxzoom({ position:'topleft' }).addTo(map);

// add mouse position Control (gives coordinates of the place when mouse is placed)
L.control.mousePosition().addTo(map);

// add Legend to show the different attributes of the boat facilities. Matched the colours to the markers.
L.control.legend({
    items: [
        {color: "#ED1C25", label: 'Boat Launch'},
        {color: "#5493CE", label: 'Boat Dock'},
				{color: "#00A651", label: 'Wharf'}
    ],
    collapsed: true,
    // // insert different label for the collapsed legend button.
    buttonHtml: 'HRM Boat Facilities Guide'
}).addTo(map);



//popup can be customized with classes & ids html tags & css
