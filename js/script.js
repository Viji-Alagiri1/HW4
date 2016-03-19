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

 
  //var basemapUrl = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  var basemapUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
  var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

  //initialize map1
  var map1 = L.map('map1', {
    scrollWheelZoom: false
  }).setView( [40.706913,-73.987513], 5);

  //CartoDB Basemap
  L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map1);

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

myMapData.forEach(function(element) {
    var marker = L.marker(element.coord).addTo(map1);
    marker.bindPopup("You are looking at " + element.name)
  });
  
  var panOptions = {
    animate: true,
    duration: 2
  }