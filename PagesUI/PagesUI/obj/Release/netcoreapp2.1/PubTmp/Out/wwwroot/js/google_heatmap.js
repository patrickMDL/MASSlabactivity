function GoogleHeatMap() {
    var map;
    this.Init = function (idElement, mapOptions, pLocations) {

        var mapElement = document.getElementById(idElement);

        var map = new google.maps.Map(mapElement, mapOptions);

        var infowindow = new google.maps.InfoWindow();

        var markers = [];

        if (pLocations != null) {
            for (var i = 0; i < pLocations.length; i++) {
                
                var locationToPlot = { latitude: 0, longitude: 0 };
                if (pLocations[i].Latitude != null && pLocations[i].Longitude != null)
                {
                    locationToPlot.latitude = pLocations[i].Latitude;
                    locationToPlot.longitude = pLocations[i].Longitude;
                }

                var marker = new google.maps.LatLng(locationToPlot.latitude, locationToPlot.longitude);
                markers.push(marker);
            }
        }

        $('#map-zoom-in').click(function () {
            map.setZoom(++mapOptions.zoom);
        });
        $('#map-zoom-out').click(function () {
            map.setZoom(--mapOptions.zoom);
        });

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: markers,
            dissipating: true,
            map: map,
            radius: 90,
            opacity:0.4
        });
    }
}
var GoogleHeatMap = new GoogleHeatMap();