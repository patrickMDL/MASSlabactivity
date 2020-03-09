var map;
var zoomLevel = 11;
var directionsService = new google.maps.DirectionsService();

var ponto_start = '/img/maps/bus_start.png';
var ponto_pause = '/img/maps/bus_pause.png';
var ponto_stop = '/img/maps/bus_stop.png';
var enter = '/img/maps/enter.png';
var exite = '/img/maps/exite.png';

var _iconMarker = function (url) {
    //Define the icon image of marker
    var icon = {
        url: url, // url
        scaledSize: new google.maps.Size(27, 43), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    return icon;
};

var _mapOptions = function (lat, lng) {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: zoomLevel,
        disableDefaultUI: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControl: true,
        center: new google.maps.LatLng(lat, lng),
        scrollwheel: true,
        styles: [{
            featureType: 'water',
            elementType: 'all',
            stylers: [{
                hue: '#e9ebed'
            }, {
                saturation: -78
            }, {
                lightness: 67
            }, {
                visibility: 'simplified'
            }]
        }, {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{
                hue: '#ffffff'
            }, {
                saturation: -100
            }, {
                lightness: 100
            }, {
                visibility: 'simplified'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                hue: '#bbc0c4'
            }, {
                saturation: -93
            }, {
                lightness: 31
            }, {
                visibility: 'simplified'
            }]
        }, {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{
                hue: '#ffffff'
            }, {
                saturation: -100
            }, {
                lightness: 100
            }, {
                visibility: 'off'
            }]
        }, {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{
                hue: '#e9ebed'
            }, {
                saturation: -90
            }, {
                lightness: -8
            }, {
                visibility: 'simplified'
            }]
        }, {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{
                hue: '#e9ebed'
            }, {
                saturation: 10
            }, {
                lightness: 69
            }, {
                visibility: 'on'
            }]
        }, {
            featureType: 'administrative.locality',
            elementType: 'all',
            stylers: [{
                hue: '#2c2e33'
            }, {
                saturation: 7
            }, {
                lightness: 19
            }, {
                visibility: 'on'
            }]
        }, {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{
                hue: '#bbc0c4'
            }, {
                saturation: -93
            }, {
                lightness: 31
            }, {
                visibility: 'on'
            }]
        }, {
            featureType: 'road.arterial',
            elementType: 'labels',
            stylers: [{
                hue: '#bbc0c4'
            }, {
                saturation: -93
            }, {
                lightness: -2
            }, {
                visibility: 'simplified'
            }]
        }]
    };

    return mapOptions;
};

function initMap(urlMarker, idMap, lat, lng, listMarker) {
    if (idMap == undefined)
        return false;

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the
    var mapElement = document.getElementById(idMap);

    // Create the Google Map using out element and options defined above
    map = new google.maps.Map(mapElement, _mapOptions(lat, lng));

    var markers = [];
    var _listMarkers = JSON.parse(listMarker);

    //Define the markers
    $.each(_listMarkers, function (index, ponto) {

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(ponto.latitude, ponto.longitude),
            title: ponto.nomeLocalidade,
            map: map,
            icon: _iconMarker(urlMarker)
        });

        markers.push(marker);
    });

    var markerCluster = new MarkerClusterer(map, markers);
    
}

function initMapDriverRoutes(urlMarker, idMap, lat, lng, listOriginMarker, listDestinationMarker) { 

    if (idMap === undefined)
        return false;   

    var origin = "";
    var pause = "";
    var destination = "";
    var waypointsOrigin = [];
    var waypointsDestination = [];

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the
    var mapElement = document.getElementById(idMap);

    // Create the Google Map using out element and options defined above
    map = new google.maps.Map(mapElement, _mapOptions(lat, lng));
    var iw = new google.maps.InfoWindow();

    //Used to separate nearby points
    var oms = new OverlappingMarkerSpiderfier(map, {
        markersWontMove: true,
        markersWontHide: true,
        basicFormatEvents: true
    });

    var markers = [];
    var _listOriginMarker = JSON.parse(listOriginMarker);
    var _listDestinationMarker = JSON.parse(listDestinationMarker);    

    //Define the markers Origin
    $.each(_listOriginMarker, function (index, ponto) {
        var markerData = new google.maps.LatLng(ponto.Latitude, ponto.Longitude);

        var img = '';
        switch (ponto.Step_Type) {
            case "depot_origin": 
                img = ponto_start;
                origin = markerData;
                break;
            case "rest_place":
                img = ponto_pause;
                pause = markerData;          
                break;
            case "pick_up":
                img = enter;
                break;
            case "drop_off":
                img = exite;
                break;
        }           

        // settings markers
        var marker = new google.maps.Marker({
            position: markerData,
            title: ponto.Address,
            map: map,
            icon: _iconMarker(img)
        });

        // Display passenger name
        google.maps.event.addListener(marker, 'click', function (e) { 
            iw.setContent(ponto.Passenger);
            iw.open(map, marker);
        });

        oms.addMarker(marker);
        markers.push(marker);
        waypointsOrigin.push({
            location: markerData,
            stopover: true
        });
    });

    //Define the markers Destination
    $.each(_listDestinationMarker, function (index, ponto) {
        var markerData = new google.maps.LatLng(ponto.Latitude, ponto.Longitude);

        var img = '';
        switch (ponto.Step_Type) {
            case "depot_destination":
                img = ponto_stop;
                destination = markerData;
                break;
            case "pick_up":
                img = enter;
                break;
            case "drop_off":
                img = exite;
                break;
        }

        // settings markers
        var marker = new google.maps.Marker({
            position: markerData,
            title: ponto.Address,
            map: map,
            icon: _iconMarker(img)
        });

        // Display passenger name
        google.maps.event.addListener(marker, 'click', function (e) {
            iw.setContent(ponto.Passenger);
            iw.open(map, marker);
        });

        oms.addMarker(marker);
        markers.push(marker);
        waypointsDestination.push({
            location: markerData,
            stopover: true
        });
    });

    configRoutes(origin, pause, destination, waypointsOrigin, waypointsDestination);

    window.map = map;  
    window.oms = oms;
}

/* A API do google permite apenas 25 waypoints de Directions por request,
 * por esse motivo vai ser criado uma direction a cada 25 waypoints. No metodo abaixo
 * podemos ver a capacidade de cada directions por sua nomenclarura "directionsDisplay + waypoints inicial +  _  + waypoints final"
 * 
*/
function configRoutes(origin, pause, destination, waypointsOrigin, waypointsDestination) {   
    //Directions Origim
    var directionsOrigimDisplay0_24;
    var directionsOrigimDisplay25_49;
    var directionsOrigimDisplay50_74;

    //Directions Destination
    var directionsDestinationDisplay0_24;
    var directionsDestinationDisplay25_49;
    var directionsDestinationDisplay50_74;

    //Variaveis de auxilio
    var request = {};
    var waypoints = [];
    var indice = 0;
    var iterationRequest = 1;
    var iterationService = 1;
    var ok = false;
    var iterationOrigin = '';
    var iterationDestination = '';

    //Directions Origim
    if (waypointsOrigin.length > 25 && waypointsOrigin.length < 50) {
        directionsOrigimDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });
        directionsOrigimDisplay25_49 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });

        $.each(waypointsOrigin, function (index, ponto) {            
            if (indice <= 24) {
                waypoints.push({
                    location: ponto.location,
                    stopover: true
                });

                indice++;

                if (indice > 24 || index === waypointsOrigin.length - 1) {
                    iterationDestination = ponto.location;
                    ok = true;                    
                }
            }
            else {
                waypoints = [];

                waypoints.push({
                    location: iterationDestination,
                    stopover: true
                },
                    {
                        location: ponto.location,
                        stopover: true
                    });

                indice = 0;
            }

            if (ok) {
                request = {};
                request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: iterationRequest === 1 ? origin : iterationOrigin, // origem
                    destination: iterationRequest === 1 ? iterationDestination : pause, // destino
                    waypoints: waypoints,// pontos de parada
                    travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
                };

                directionsService.route(request, function (result, status) {
                    if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        if (iterationService === 1) {
                            directionsOrigimDisplay0_24.setDirections(result);// Renderizamos no mapa o resultado
                        }
                        else
                            directionsOrigimDisplay25_49.setDirections(result);// Renderizamos no mapa o resultado 

                        iterationService++;
                    }
                });

                ok = false;                
                iterationOrigin = iterationDestination;
                iterationRequest++;
            }
        });

        directionsOrigimDisplay0_24.setMap(map);
        directionsOrigimDisplay25_49.setMap(map);
    }
    else if (waypointsOrigin.length > 51 && waypointsOrigin.length < 76) {
        directionsOrigimDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });
        directionsOrigimDisplay25_49 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });
        directionsOrigimDisplay50_74 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });

        $.each(waypointsOrigin, function (index, ponto) {
            if (indice <= 24) {
                waypoints.push({
                    location: ponto.location,
                    stopover: true
                });

                indice++;

                if (indice > 24 || index === waypointsOrigin.length - 1) {
                    iterationDestination = ponto.location;
                    ok = true;
                }
            }
            else {
                waypoints = [];

                waypoints.push({
                    location: iterationDestination,
                    stopover: true
                },
                    {
                        location: ponto.location,
                        stopover: true
                    });

                indice = 0;
            }

            if (ok) {
                request = {};
                request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: iterationRequest === 1 ? origin : iterationOrigin, // origem
                    destination: iterationRequest === 1 ? iterationDestination : iterationRequest === 2 ? iterationDestination : pause, // destino
                    waypoints: waypoints,// pontos de parada
                    travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
                };

                directionsService.route(request, function (result, status) {
                    if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        if (iterationService === 1) {
                            directionsOrigimDisplay0_24.setDirections(result);// Renderizamos no mapa o resultado
                        }
                        else if (iterationService === 2) {
                            directionsOrigimDisplay25_49.setDirections(result);// Renderizamos no mapa o resultado 
                        }
                        else {
                            directionsOrigimDisplay50_74.setDirections(result);// Renderizamos no mapa o resultado 
                        }

                        iterationService++;
                    }
                });

                ok = false;
                iterationOrigin = iterationDestination;
                iterationRequest++;
            }
        });

        directionsOrigimDisplay0_24.setMap(map);
        directionsOrigimDisplay25_49.setMap(map);
        directionsOrigimDisplay50_74.setMap(map);
    } 
    else {
        directionsOrigimDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "blue"
            }
        });

        request = { // Novo objeto google.maps.DirectionsRequest, contendo:
            origin: origin, // origem
            destination: pause, // destino
            waypoints: waypointsOrigin,// pontos de parada
            travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
        };

        directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                directionsOrigimDisplay0_24.setDirections(result); // Renderizamos no mapa o resultado
            }
        });

        directionsOrigimDisplay0_24.setMap(map);
    }

    //Directions Destination
    if (waypointsDestination.length > 25 && waypointsDestination.length < 50) {
        directionsDestinationDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });
        directionsDestinationDisplay25_49 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });

        waypoints = [];
        indice = 0;
        iterationRequest = 1;
        iterationService = 1;
        iterationOrigin = '';
        iterationDestination = '';

        $.each(waypointsDestination, function (index, ponto) {
            if (indice <= 24) {
                waypoints.push({
                    location: ponto.location,
                    stopover: true
                });

                indice++;

                if (indice > 24 || index === waypointsDestination.length - 1) {
                    iterationDestination = ponto.location;
                    ok = true;
                }
            }
            else {
                waypoints = [];

                waypoints.push({
                    location: iterationDestination,
                    stopover: true
                },
                    {
                        location: ponto.location,
                        stopover: true
                    });

                indice = 0;
            }

            if (ok) {
                request = {};
                request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: iterationRequest === 1 ? pause : iterationOrigin, // origem
                    destination: iterationRequest === 1 ? iterationDestination : destination, // destino
                    waypoints: waypoints,// pontos de parada
                    travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
                };

                directionsService.route(request, function (result, status) {
                    if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        if (iterationService === 1) {
                            directionsDestinationDisplay0_24.setDirections(result);// Renderizamos no mapa o resultado
                        }
                        else
                            directionsDestinationDisplay25_49.setDirections(result);// Renderizamos no mapa o resultado 

                        iterationService++;
                    }
                });

                ok = false;
                iterationOrigin = iterationDestination;
                iterationRequest++;
            }
        });

        directionsDestinationDisplay0_24.setMap(map);
        directionsDestinationDisplay25_49.setMap(map);
    }
    else if (waypointsDestination.length > 51 && waypointsDestination.length < 76) {
        directionsDestinationDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });
        directionsDestinationDisplay25_49 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });
        directionsDestinationDisplay50_74 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });

        $.each(waypointsDestination, function (index, ponto) {
            if (indice <= 24) {
                waypoints.push({
                    location: ponto.location,
                    stopover: true
                });

                indice++;

                if (indice > 24 || index === waypointsDestination.length - 1) {
                    iterationDestination = ponto.location;
                    ok = true;
                }
            }
            else {
                waypoints = [];

                waypoints.push({
                    location: iterationDestination,
                    stopover: true
                },
                    {
                        location: ponto.location,
                        stopover: true
                    });

                indice = 0;
            }

            if (ok) {
                request = {};
                request = { // Novo objeto google.maps.DirectionsRequest, contendo:
                    origin: iterationRequest === 1 ? pause : iterationOrigin, // origem
                    destination: iterationRequest === 1 ? iterationDestination : iterationRequest === 2 ? iterationDestination : destination, // destino
                    waypoints: waypoints,// pontos de parada
                    travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
                };

                directionsService.route(request, function (result, status) {
                    if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                        if (iterationService === 1) {
                            directionsDestinationDisplay0_24.setDirections(result);// Renderizamos no mapa o resultado
                        }
                        else if (iterationService === 2) {
                            directionsDestinationDisplay25_49.setDirections(result);// Renderizamos no mapa o resultado 
                        }
                        else {
                            directionsDestinationDisplay50_74.setDirections(result);// Renderizamos no mapa o resultado 
                        }

                        iterationService++;
                    }
                });

                ok = false;
                iterationOrigin = iterationDestination;
                iterationRequest++;
            }
        });

        directionsDestinationDisplay0_24.setMap(map);
        directionsDestinationDisplay25_49.setMap(map);
        directionsDestinationDisplay50_74.setMap(map);

    }
    else {
        directionsDestinationDisplay0_24 = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "red"
            }
        });

        request = { // Novo objeto google.maps.DirectionsRequest, contendo:
            origin: pause, // origem
            destination: destination, // destino
            waypoints: waypointsDestination,// pontos de parada
            travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
        };

        directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) { // Se deu tudo certo
                directionsDestinationDisplay0_24.setDirections(result); // Renderizamos no mapa o resultado
            }
        });

        directionsDestinationDisplay0_24.setMap(map);
    }
}

google.maps.event.addDomListener(window, 'load', initMap);