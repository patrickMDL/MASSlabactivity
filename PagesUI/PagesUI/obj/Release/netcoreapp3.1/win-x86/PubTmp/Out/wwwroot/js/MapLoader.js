function MapLoader() {

    this.Init = function (pUrl) {

        MapLoader.GetLocations(pUrl);

        $("body").removeClass("dashboard");
        $("body").addClass("no-header");
        $(".page-content-wrapper").addClass("full-height");
        $(".header").addClass("transparent");
    },

    this.InitializeMap = function (pLocations) {
        google.maps.event.addDomListener(window, 'load', GoogleMap.Init('google-map', MapLoader.LoadOptions(), pLocations));
    },

    this.InitializeHeatMap = function (pLocations) {
        google.maps.event.addDomListener(window, 'load', GoogleHeatMap.Init('google-map', MapLoader.LoadOptions(), pLocations));
    }

    this.LoadOptions = function () {
        return {
            zoom: 5,
            disableDefaultUI: true,
            center: new google.maps.LatLng(-27.593500, -48.558540), // Florianópolis
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
    }

    this.GetLocations = function (pUrl) {

        $.ajax({
            type: "POST",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (pUrl == "/Embarcado/GetHeatLocations") {
                    MapLoader.InitializeHeatMap(data.Model);
                } else {
                    MapLoader.InitializeMap(data.Model);
                }
            }
        });
    }
}
var MapLoader = new MapLoader();