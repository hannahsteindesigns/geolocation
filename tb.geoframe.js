// tb.geoframe
// Dependencies
// jQuery
// tb.core
(function (TB, $, undefined) {
    TB.initGeoFrame = function() {
        if (TB.support.postMessage && navigator.geolocation) {
            // anchor links in iframes adapted from http://shorts.jeffkreeftmeijer.com/2014/scroll-to-anchors-in-iframes/
            // reverse geocoding adapted from http://stackoverflow.com/questions/6797569/get-city-name-using-geolocation#answer-36929404
            navigator.geolocation.getCurrentPosition(success, error);
            function success(position) {
                var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
                $.getJSON(GEOCODING).done(function (location) {
                    var resultsArray = location.results[0],
                        state,
                        i;
                    // gets state name
                    for (i = 0; i < resultsArray.address_components.length; i++) {
                        if (resultsArray.address_components[i].types[0] === 'administrative_area_level_1') {
                            state = resultsArray.address_components[i].long_name;
                            break;
                        }
                    }

                    // finds distance between element and top of frame
                    var element = $("[name='" + state + "']");
                    if (element.length) {
                        window.parent.postMessage({ "offset": element.offset().top }, "*");
                    }
                });
            };
            function error(err) {
                // do nothing
            }
            // disable auto scroll on manual scroll
            window.addEventListener('DOMMouseScroll', function () { window.parent.postMessage({ 'userScroll': true }, '*'); });
            window.addEventListener('wheel', function () { window.parent.postMessage({ 'userScroll': true }, '*'); });
            window.addEventListener('touchmove', function () { window.parent.postMessage({ 'userScroll': true }, '*'); });
        }
    }
} (window.TB = window.TB || {}, window.jQuery));
