 // ---------- BURGER KING MENU ----------
    $('#burger').click(function(event) {
        $('.menu').toggleClass('active')
    })

    $('.carousel').slick({
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
