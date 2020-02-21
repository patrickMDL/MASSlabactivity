var GoogleMap = new function() {
    this.Init = function (idElement, mapOptions, pLocations) {
        var mapElement = document.getElementById(idElement);
        var map = new google.maps.Map(mapElement, mapOptions);
        var infowindow = new google.maps.InfoWindow();
        var markers = [];
        if (pLocations) {
            for (var i = 0; i < pLocations.length; i++) {
                var locationToPlot = { latitude: 0, longitude: 0, name: '' };
                if (pLocations[i].VelocidadeTempoLocalizacaoCache !== null) {
                    if (pLocations[i].VelocidadeTempoLocalizacaoCache.Latitude !== 0 && pLocations[i].VelocidadeTempoLocalizacaoCache.Longitude !== 0) {
                        locationToPlot.latitude = pLocations[i].VelocidadeTempoLocalizacaoCache.Latitude;
                        locationToPlot.longitude = pLocations[i].VelocidadeTempoLocalizacaoCache.Longitude;
                        locationToPlot.name = pLocations[i].Plate;
                    }
                } else if (pLocations[i].Latitude !== null && pLocations[i].Longitude !== null) {
                    locationToPlot.latitude = pLocations[i].Latitude;
                    locationToPlot.longitude = pLocations[i].Longitude;
                    var date = new Date(pLocations[i].DateTrip);
                    locationToPlot.name = "Data: " + date.toLocaleString() + "<br>" +
                        "Valor: R$ " + pLocations[i].Total + "<br>" +
                        "Linha: " + pLocations[i].LineNumber + "<br>" +
                        "Poltrona: " + pLocations[i].Seat;
                }
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locationToPlot.latitude, locationToPlot.longitude),
                    icon: "/images/icon/bus.png",
                    map: map,
                    name: locationToPlot.name
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent('<div>' + marker.name + '</div>');
                        infowindow.open(map, marker);
                    };
                })(marker, i));
                markers.push(marker);
            }
            var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        }

        $('#map-zoom-in').click(function () {
            map.setZoom(++mapOptions.zoom);
        });
        $('#map-zoom-out').click(function () {
            map.setZoom(--mapOptions.zoom);
        });
    };
};