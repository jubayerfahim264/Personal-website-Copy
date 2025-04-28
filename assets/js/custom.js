/*------------------------------------------------------------------------------------
    
JS INDEX
=============

01 - Animated Headline Setup
02 - Zoom Image
03 - Jarralax
04 - Testimonial Slider



-------------------------------------------------------------------------------------*/

(function ($) {
  "use strict";

  jQuery(document).ready(function ($) {
    /* 
		=================================================================
		02 - Animated Headline Setup
		=================================================================	
		*/

    $(function () {
      $(".caption-inner").animatedHeadline({
        animationType: "clip",
      });
    });

    /* 
		=================================================================
		02 - Zoom Image
		=================================================================	
		*/

    $(".zoom-img").magnificPopup({
      delegate: "a",
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    /* 
		=================================================================
		03 - Jarralax
		=================================================================	
		*/

    $(".parallax").jarallax();

    /* 
		=================================================================
		04 - Testimonial Slider
		=================================================================	
		*/

    $(".testimonial-slider").owlCarousel({
      autoplay: true,
      loop: true,
      margin: 30,
      touchDrag: true,
      mouseDrag: true,
      items: 1,
      nav: true,
      dots: true,
      autoplayTimeout: 5000,
      autoplaySpeed: 1200,
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  });
})(jQuery);
