/* ============================================================
 * Notifications
 * Triggers notifications using Pages Notification plugin.
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function($) {

    'use strict';

    $(document).ready(function() {

        $('.show-notification').click(function(e) {
            var button = $(this);
            var style = $('.btn-notification-style.active').text(); // Type of notification
            var message = $('.notification-message').val(); // Message to display inside the notification
            var type = $('select.notification-type').val(); // Info, Success, Error etc
            var position = $('.tab-pane.active .position.active').attr('data-placement'); // Placement of the notification

            if (style == 'Bar') {
                // Show an bar notification attached to top and bottom of the screen
                $('.page-content-wrapper').pgNotification({
                    style: 'bar',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else if (style == 'Bouncy Flip') {
                // Show a flipping notification animated
                // using CSS3 transforms and animations
                $('.page-content-wrapper').pgNotification({
                    style: 'flip',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else if (style == 'Circle Notification') {
                // Slide-in a circle notification from sides
                // You have to provide the HTML for thumbnail
                $('.page-content-wrapper').pgNotification({
                    style: 'circle',
                    title: 'John Doe',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type,
                    thumbnail: '<img width="40" height="40" style="display: inline-block;" src="../img/profiles/avatar2x.jpg" data-src="../img/profiles/avatar.jpg" data-src-retina="../img/profiles/avatar2x.jpg" alt="">'
                }).show();
            } else if (style == 'Simple Alert') {
                // Simple notification having bootstrap's .alert class
                $('.page-content-wrapper').pgNotification({
                    style: 'simple',
                    message: message,
                    position: position,
                    timeout: 0,
                    type: type
                }).show();
            } else {
                return;
            }

            e.preventDefault();
        });

        $('.position').click(function() {
            $(this).closest('.notification-positions').find('.position').removeClass('active');
            $(this).addClass('active');
        });

        $('.btn-notification-style').click(function() {
            var target = $(this).attr('data-type');
            $('a[href=#' + target + ']').tab('show');
        });

        // remove previously added notifications from the screen
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var position = $(this).data('type');
            $('a[href="'+position+'"]').tab('show')
            $('.pgn').remove();
        });

    });

})(window.jQuery);

var Notifications = function () {
    this.Bar = function (e, pMessage, pDanger) { // e it큦 from where the click comes from (button, radio, etc)
        var type = "info";
        if (e) type = e.attr("data-placement-type");
        if (pDanger) type = "danger";

        // Show an bar notification attached to top and bottom of the screen
        $("body").pgNotification({
            style: "bar",
            message: pMessage,
            //position: e ? e.attr("data-placement") : "top", // Placement of the notification: top, bottom, top-left, top-right, bottom-left, bottom-right
            position: "top", // Placement of the notification: top, bottom, top-left, top-right, bottom-left, bottom-right
            timeout: 10000,
            type: type // info, warning, success, danger, default
        }).show();
    },
        this.Flip = function (e, pMessage) { // e it큦 from where the click comes from (button, radio, etc)
            var type = e.attr("data-placement-type");
            if (pDanger) type = "danger";

            // Show a flipping notification animated
            // using CSS3 transforms and animations
            $("body").pgNotification({
                style: "flip",
                message: pMessage,
                position: e.attr("data-placement"), // Placement of the notification: top, bottom, top-left, top-right, bottom-left, bottom-right
                timeout: 10000,
                type: type // info, warning, success, danger, default
            }).show();
        },
        this.Circle = function (e, pTitle, pMessage, pThumbnail) { // e it큦 from where the click comes from (button, radio, etc)
            var type = e.attr("data-placement-type");
            if (pDanger) type = "danger";

            // Slide-in a circle notification from sides
            // You have to provide the HTML for thumbnail 
            $("body").pgNotification({
                style: "circle",
                title: pTitle,
                message: pMessage,
                position: e.attr("data-placement"), // Placement of the notification: top, bottom, top-left, top-right, bottom-left, bottom-right
                timeout: 10000,
                type: type, // info, warning, success, danger, default
                //thumbnail: '<img width="40" height="40" style="display: inline-block;" src="../img/profiles/avatar2x.jpg" data-src="../img/profiles/avatar.jpg" data-src-retina="../img/profiles/avatar2x.jpg" alt="">'
                thumbnail: pThumbnail
            }).show();
        },
        this.Simples = function (e, pMessage) { // e it큦 from where the click comes from (button, radio, etc)
            var type = e.attr("data-placement-type");
            if (pDanger) type = "danger";

            // Simple notification having bootstrap's .alert class
            $("body").pgNotification({
                style: "simple",
                message: pMessage,
                position: e.attr("data-placement"), // Placement of the notification: top, bottom, top-left, top-right, bottom-left, bottom-right
                timeout: 10000,
                type: type // info, warning, success, danger, default
            }).show();
        }
}

var Notifications = new Notifications();
