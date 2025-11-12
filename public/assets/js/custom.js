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

$('.carousel-testimonial').owlCarousel({
		    loop:true,
		    margin:0,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:3,
		            nav:false
		        },
		        1000:{
		            items:3,
		            nav:true,
		            loop:false
		        }
		    }
		})

  });
})(jQuery);