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

  //initialize map1
  var map1 = L.map('map1', {
    scrollWheelZoom: false
  }).setView( [40.706913,-73.987513], 5);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map1);

 
  //initialize map2
  var map2 = L.map('map2', {
    scrollWheelZoom: false
  }).setView( [36.403600,-101.271973], 5);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map2);

  //load external geojson
  $.getJSON('data/cities.geojson', function(data) {
    console.log(data);

    var burgerIcon = L.icon({
      iconUrl: 'img/burger.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });
    var lawnMowerIcon = L.icon({
      iconUrl: 'img/lawnmower.png',
      iconSize:     [37, 37], // size of the icon
      iconAnchor:   [16, 37] // point of the icon which will correspond to marker's location
    });

    L.geoJson(data, 
    {
      //calling L.geoJson with pointToLayer as an option will automatically add markers to the map from our data
      pointToLayer: function (feature, latlng) {

          console.log(feature);

          if(feature.properties.chris_lived_here == "true") {
            return L.marker(latlng, {icon: burgerIcon})
              .bindPopup('Chris has lived in ' + feature.properties.name);
          } else {
            return L.marker(latlng, {icon: lawnMowerIcon})
            .bindPopup('Chris has not lived in ' + feature.properties.name);;
          }
      }
    }
    ).addTo(map2);



  })
 