var map = L.map("map", { zoomControl: false }).setView([0.2521, 37.8219], 6.48);
// [0.2521, 37.8219], 6
google.charts.load("current", { packages: ["corechart"] });
google.charts.load("current", { packages: ["bar"] });

// google.charts.setOnLoadCallback(drawBarChart);
google.charts.setOnLoadCallback(drawPieChart);
// google.charts.setOnLoadCallback(drawDoughnutChart);

var geojson;

// adding zoom home functionality
var zoomHome = L.Control.zoomHome({ position: "topleft" });
zoomHome.addTo(map);

// implementing full screen
map.addControl(
  new L.Control.Fullscreen({
    title: {
      false: "View Fullscreen",
      true: "Exit Fullscreen",
    },
  })
);
// Adding a scalebar to our leaflet map
L.control
  .scale({
    metric: true,
    imperial: true,
    maxWidth: 100,
    position: "bottomleft",
  })
  .addTo(map);

//adding our basemaps
var tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
var cartoDB = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
    minZoom: 0,
  }
);
// adding basemaps
var baseMaps = {
  OSM: tiles,
  "Google Streets": googleStreets,
  "Google Hybrid": googleHybrid,
  "Google Terrain": googleTerrain,
  CartoDB: cartoDB,
};
// Adding measure options
L.control.polylineMeasure(options).addTo(map);
// Adding auto locate me functionality
L.control.locate().addTo(map);
var control = L.control.layers(baseMaps, {}, { collapsed: false });
control.addTo(map);
// setting up leaflet coordinates viewer
let coordP = L.control.coordProjection({}).addTo(map);
// Adding a geocoder
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest(),
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);

//   adding zoom functionality
L.Control.boxzoom({
  position: "topleft",
  title: "Click to start zooming map!",
}).addTo(map);

// function to parse integers
function toInteger(val) {
  return parseInt(val);
}
// Initialize info control
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

//TODO: visualize function
function visualizeMap(disabilityValue, type) {
  if (type == "visual") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Visual),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Visual) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 1
  else if (type == "hearing") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Hearing),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Hearing) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 2
  else if (type == "mobility") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Mobility),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });

    //Download
    /*
    document.getElementById('download').addEventListener('submit',(e)=>{
      e.preventDefault();

      const downloadOption=document.getElementById('download').value;
      if(downloadOption==='subcounty'){

      }
    })
    */
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Mobility) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 3
  else if (type == "cognition") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Cognition),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Cognition) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 4
  else if (type == "self_care") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Self_Care),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Self_Care) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  // end of visualization 5
  else if (type == "communication") {
    if (geojson) {
      map.removeLayer(geojson);
    }
    function myStyle(feature) {
      return {
        fillColor: getColor(feature.properties?.Speech),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
    geojson = L.geoJson(disabilities, {
      style: myStyle,
      onEachFeature: onEachFeature,
    });
    // document.getElementById("disability_ke").innerHTML = `${disabilityValue} Cases`;
    info.update = function (props) {
      this._div.innerHTML =
        `<h6 id="disability_ke">${disabilityValue} Cases</h6>` +
        (props
          ? "<b>" +
            "Subcounty: " +
            props.subcounty +
            "</b><br />" +
            toInteger(props.Speech) +
            " Cases"
          : "Hover over a subcounty!");
    };
    info.addTo(map);
    map.addLayer(geojson);
  }
  
}
// end of visualize function

// Functionality to change map on different disability selection
let form = document.getElementById("selectForm");
form.onsubmit = function (e) {
  e.preventDefault();
  var selected = document.getElementById("selection_form");
  var value = selected.options[selected.selectedIndex].value;
  switch (value) {
    case "visual":
      visualizeMap("Visual", value);
      break;
    case "hearing":
      visualizeMap("Hearing", value);
      break;
    case "mobility":
      visualizeMap("Mobility", value);
      break;
    case "cognition":
      visualizeMap("Cognition", value);
      break;
    case "self_care":
      visualizeMap("Self Care", value);
      break;
    case "communication":
      visualizeMap("Communication", value);
      break;
    default:
      visualizeMap("Visual", "visual");
      break;
  }
};

// The start of the main code to be executed!
// START OF FUNCTION TO STYLE MAP LAYOUT
function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

// <!-- logic goes here -->

// var info = L.control();

// info.onAdd = function (map) {
//   this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
//   this.update();
//   return this._div;
// };
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    `<h6 id="disability_ke">Visual Cases</h6>` +
    (props
      ? "<b>" +
        "Subounty: " +
        props.subcounty +
        "</b><br />" +
        toInteger(props?.Visual) +
        " Cases"
      : "Hover over a subcounty!");
};

info.addTo(map);

function style(feature) {
  return {
    fillColor: getColor(feature.properties?.Visual),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  info.update(layer.feature.properties);
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
// open sidebar when one county is clicked
function openChartsForSingleCounty(e) {
  map.fitBounds(e.target.getBounds());
  // get map properties
  var countyName = e.target.feature.properties.subcounty;
  // Preparing data for visualization
  var visual = toInteger(e.target.feature.properties.Visual);
  var hearing = toInteger(e.target.feature.properties.Hearing);
  var mobility = toInteger(e.target.feature.properties.Mobility);
  var cognition = toInteger(e.target.feature.properties.Cognition);
  var self_care = toInteger(e.target.feature.properties.Self_Care);
  var communication = toInteger(e.target.feature.properties.Speech);
  
  // creating a data table
  var dataTable = [
    ["Type of Disability", "Recorded Cases"],
    ["Visual", visual],
    ["Hearing", hearing],
    ["Mobility", mobility],
    ["Cognition", cognition],
    ["Self Care", self_care],
    ["Communication", communication],
  ];
  // Start of data rendering
  document.getElementById(
    "county"
  ).innerHTML = `Data Visualization For: ${countyName} subcounty Yr 2019.`;
  // Plotting charts before opening sidebar
  // drawBarChart(dataTable);
  drawPieChart(dataTable);
  // drawDoughnutChart(dataTable);
  document.querySelector(".sidebar").style.width = "520px";
  document.querySelector(".sidebar").style.transition =
    "width 200ms ease-in-out";
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: openChartsForSingleCounty,
  });
}
var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [];
  div.innerHTML += '<h6 style="text-align:center;margin:0;">Disability Cases</h6>';

  // loop through our unemployment intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+" + "<br>");
  }
  div.innerHTML += "<p><i style=background:#ae017e></i>No Data</p>";
  return div;
};

legend.addTo(map);

geojson = L.geoJson(disabilities, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);
// END OF FUNCTION TO STYLE MAP LAYOUT

// close sidebar
function closeSidebar() {
  document.querySelector(".sidebar").style.width = "0";
  document.querySelector(".sidebar").style.transition =
    "width 200ms ease-in-out";
}

// function drawBarChart(dataTable) {
//   var data = new google.visualization.arrayToDataTable(dataTable);
//   var options = {
//     title: "disability Mapping",
//     width: 500,
//     height: 500,
//     legend: { position: "none" },
//     animation: {
//       duration: 1000,
//       easing: "inAndOut",
//     },
//     chart: {
//       title: "Disabibity Mapping BarChart",
//       subtitle: "Distribution of Disability in Kenya",
//     },
//     bars: "horizontal", // Required for Material Bar Charts.
//     colors: ["red", "#004411"],
//     axes: {
//       x: {
//         0: { side: "top", label: "Cases" }, // Top x-axis.
//       },
//     },
//     bar: { groupWidth: "90%" },
//   };
//
//   var chart = new google.charts.Bar(document.getElementById("top_x_div"));
//   chart.draw(data, options);
// }
function drawPieChart(dataTable) {
  var data = google.visualization.arrayToDataTable(dataTable);
  var options = {
    title: "Pie Chart",
    width: 500,
    height: 500,
    animation: {
      duration: 1000,
      easing: "inAndOut",
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}
// function drawDoughnutChart(dataTable) {
//   var data = google.visualization.arrayToDataTable(dataTable);
//   var options = {
//     title: "Doughnut Chart",
//     pieHole: 0.4,
//     width: 500,
//     height: 500,
//     animation: {
//       duration: 1000,
//       easing: "inAndOut",
//     },
//   };
//
//   var chart = new google.visualization.PieChart(
//     document.getElementById("donutchart")
//   );
//   chart.draw(data, options);
// }
function reload() {
  return window.location.reload();
}
