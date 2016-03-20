var myNumber = 1;
var riverNames = [
'East River',
'Flushing River',
'Harlem River',
'Hudson River',
];
var riverImages = [
'http://www.citylandnyc.org/wp-content/uploads/sites/14/2011/03/EastRiver-regular.jpg',
'http://c2.staticflickr.com/2/1378/5107251279_797621253a_b.jpg',
'http://www.kiewit.com/files/cache/bc2788f9c1ef41b31e3029a254871da1_f1278.JPG',
'http://media-2.web.britannica.com/eb-media/12/132112-004-F18EB014.jpg',
];

// update function that will be called within click functions 
// (foward and back)
// carefule: indexing is zero-based like in Python!
function updateEverything(currentNumber) {
  $('#riverImage').attr('src',riverImages[currentNumber-1]);
  $('#riverName').text(riverNames[currentNumber-1]);
  $('#myNumber').text(currentNumber);
}

$('#forward').click( function() {
  if (myNumber < 4) {
    myNumber = myNumber + 1;
  } else {
    myNumber = 1;
  }
  updateEverything(myNumber)
});

$('#back').click( function() {
  if (myNumber > 1) {
    myNumber = myNumber - 1;
  } else {
    myNumber = 4;
  }
  $('#myNumber').text(myNumber);
    updateEverything(myNumber)
});

  var basemapUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

var myMapData = [
    {
      name: "Bronx",
      coord: [40.8488, -73.8997]
    },
    {
      name: "Manhattan",
      coord: [40.7503,-73.9802]
    },
    {
      name: "Staten Island",
      coord: [40.5897, -74.1321]
    },
    {
      name: "Brooklyn",
      coord: [40.6462,-73.9328]
    },
    {
      name: "Queens",
      coord: [40.7269, -73.7797]
    },
   
  ]
  //initialize map1
  var map1 = L.map('map1', {
    scrollWheelZoom: false
  }).setView( [40.705107,-73.990860], 10);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map1);

  myMapData.forEach(function(element) {
    var marker = L.marker(element.coord).addTo(map1);
    marker.bindPopup("You are looking at " + element.name)
  });
  
  var panOptions = {
    animate: true,
    duration: 2
  }
 
  //initialize map2
  var map2 = L.map('map2', {
    scrollWheelZoom: false
  }).setView( [36.791691,-92.373047], 5);

//37.002553,-94.372559 (US map display)
//36.791691,-92.373047(new coordinates displays well) 
  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map2);

  //load external geojson
  $.getJSON('data/cities.geojson', function(data) {
    console.log(data);

    //displaylegend: true;

    //icon to point river location
    var riverIcon = L.icon({
      iconUrl: 'img/river.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });
    //icon to point PARK location
    var parkIcon = L.icon({
      iconUrl: 'img/ferriswheel.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });
    //icon to point Mountain location
    var mountainsIcon = L.icon({
      iconUrl: 'img/mountains.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });
    //icon to point to the places I have been to
    var visitedIcon = L.icon({
      iconUrl: 'img/sight-2.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });
    //icon to point to the places I Plan on Visiting
    var futureIcon = L.icon({
      iconUrl: 'img/palm.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });

    L.geoJson(data, 
    {
      //calling L.geoJson with pointToLayer as an option will automatically add markers to the map from our data
      pointToLayer: function (feature, latlng) {

          console.log(feature);
          //places I visited had beautiful river-front
          if(feature.properties.river == "true") {
            return L.marker(latlng, {icon: riverIcon})
              .bindPopup('I visited a beautiful river in ' + feature.properties.name);
          } //parks that visited and had fun
          else if(feature.properties.park == "true") {
            return L.marker(latlng, {icon: parkIcon})
              .bindPopup('I had lots of fun in this ' + feature.properties.name  + ' amusement park.');
          }
          //mountains that I climbed on
          else if(feature.properties.mountains == "true") {
            return L.marker(latlng, {icon: mountainsIcon})
              .bindPopup('I climbed this ' + feature.properties.name  + ' mountain.');
          } 
          //simply the places I visited for vacations
          else if(feature.properties.visited == "true") {
            return L.marker(latlng, {icon: visitedIcon})
              .bindPopup('I had good memories of visiting ' + feature.properties.name  + ' on a recent vacation.');
          } 
          //places that I plan on visiting in future: "My Future Road Trips"
          else {
            return L.marker(latlng, {icon: futureIcon})
            .bindPopup('I plan on visiting ' + feature.properties.name + ' on furture vacation.');;
          }
      }
    }
    ).addTo(map2);

})
 