const $ = require('jquery');
const slick = require('slick-carousel');
const AOS = require('aos');
$(document).ready(function(){
  // AOS.init();
  // AOS.refresh(true)
  // ---------- BURGER KING MENU ----------
  $('#burger').click(function(event) {
    $('.menu').toggleClass('active')
  })


  if ($('.events__list').length) {
    console.log('ok')
    $('.events__list').on('init', function(event, slick){
      console.log('.events__list init');
      AOS.init();
    });
  }else{
    console.log('not ok')
    AOS.init();
  }


  $('.events__list').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		// centerMode: true,
		// variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
	    {
	      breakpoint: 824,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }],
		prevArrow: $('.prev-arr'),
		nextArrow: $('.next-arr')
	});
});
