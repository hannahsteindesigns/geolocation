// tb.geoparent
// Dependencies
// tb.core
// tb.parentframe
// tb.xd
(function (TB, $, undefined) {
    if (TB.isParentFrame && TB.support.postMessage) {
        (function () {
            var offset,
                scrolled = false;

            window.addEventListener('DOMMouseScroll', function () { scrolled = true; });
            window.addEventListener('wheel', function () { scrolled = true; });
            window.addEventListener('touchmove', function () { scrolled = true; });

            window.addEventListener('message', function (event) {
                // check message comes from TB frame
                if (TB.isTBLocation(event.origin)) {
                    // disable auto scroll on manual scroll
                    if (userScroll = event.data['userScroll']) { scrolled = userScroll; }
                    // adds iframe offset to element offset and scrolls to element
                    if ((offset = parseInt(event.data['offset'], 10)) && !scrolled) {
                        var frameOffset = TB.tbFrames()[0].getBoundingClientRect().top;
                        var totalOffset = offset + frameOffset - 30;
                        scrollTo(document.body, totalOffset, 1500);
                    }
                }
            });
            // vanilla js smooth scroll: http://stackoverflow.com/questions/17733076/smooth-scroll-anchor-links-without-jquery#answer-31987330
            function scrollTo(element, to, duration) {
                if (duration <= 0) { return };
                var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                var difference = to - element.scrollTop;
                var perTick = difference / duration * 10;

                setTimeout(function () {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === to) { return };
                    if (scrolled === true) { return };
                    scrollTo(element, to, duration - 10);
                }, 10);
            }
        } ());
    }
}(window.TB = window.TB || {}, window.jQuery));