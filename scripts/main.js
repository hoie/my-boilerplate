'use strict'

window.$ = window.jQuery = require('jquery')
var easing = require('jquery.easing')
var bootstrap = require('bootstrap-sass')

//jQuery for page scrolling feature - requires jQuery Easing plugin

$('document').ready (function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeOutExpo');
        event.preventDefault();
    });

    if ($(window).width() > '1024') {
        $(window).stellar();
    }; 
});
