(function($){

	/*    Portfolio Square    */
	
/*  Carousell Opening  */
$(document).on('click', '.square-portfolio a', function(e){
	e.preventDefault();
	var $carouselHeight = $('.carousell-content').outerHeight();
	var $galleryHeight = $('.gallery-inner-wrap').outerHeight();
	var $headlinePortSq = $('.headline-port-sq').outerHeight();
	var $galleryPosition = $('#port-sq').offset().top;
	var $headerGutter = $('.navigation-tab').outerHeight();
	var $itemClicked = parseInt($(this).parent().attr('id').substr(5));
	var viewportHeight = $(window).innerHeight() - $('.main-nav-wrap').height();
	/* Carousel opening */
	var headerVariable = 0;
	if($('.responsive_nav').is(':visible')) headerVariable = $('.responsive_nav').closest('nav').outerHeight();
	else headerVariable = 0;
	$('#carousel').carousel($itemClicked-1);
	$(this).parent().parent().parent().parent().stop(true).animate({opacity : 0}, 400,
		function(){
			$('html, body').stop(true).animate({'scrollTop' : $galleryPosition + $headlinePortSq - $headerGutter}, 400);
			if($carouselHeight > viewportHeight){
				$(this).parent().stop(true).animate({height : $carouselHeight}, 400,
				function(){
					$(this).find('.gallery-main-wrap').css({'height' : 0});
					if($carouselHeight > viewportHeight) $(this).parent().find('.carousel-placing').addClass('dark-gray-bg').css({'height' : $carouselHeight}).animate({opacity : 1}, 400);
					else $(this).parent().find('.carousel-placing').addClass('dark-gray-bg').css({'height' : viewportHeight}).animate({opacity : 1}, 400);
				});
			}
			else{
				$(this).parent().stop(true).animate({height : viewportHeight}, 400,
				function(){
					$(this).find('.gallery-main-wrap').css({'height' : 0});
					if($carouselHeight > viewportHeight) $(this).parent().find('.carousel-placing').addClass('dark-gray-bg').css({'height' : $carouselHeight}).animate({opacity : 1}, 400);
					else $(this).parent().find('.carousel-placing').addClass('dark-gray-bg').css({'height' : viewportHeight}).animate({opacity : 1}, 400);
				});
			}
		});
});

	/* Carousel Closing */
$(document).on('click', '.closing.carousel-control', function(){
	var $carouselHeight = $('.carousell-content').outerHeight();
	var $galleryHeight = $('.gallery-inner-wrap').outerHeight();
	$(this).parent().parent().parent().stop(true).animate({opacity : 0}, 400,
		function(){
			$(this).parent().stop(true).animate({height : $galleryHeight}, 400,
			function(){
				$(this).find('.carousel-placing').css({'height' : 0}).removeClass('dark-gray-bg');
				$(this).find('.gallery-main-wrap').css({'height' : $galleryHeight}).stop(true).animate({opacity : 1}, 400);
			});
		});
});
/*  hover on squares  */
$(document).on('mouseenter', '.square-portfolio a', function(){
	var imgHeight = $(this).find('img:first').outerHeight();
	$(this).find('.gal-port-imgs').stop(true).animate({top : -imgHeight}, 250);
	$(this).find('.image-text').stop(true).animate({bottom : 0}, 250);
});
$(document).on('mouseleave', '.square-portfolio a', function(){
	var txtHeight = $(this).find('.image-text').outerHeight();
	$(this).find('.gal-port-imgs').stop(true).animate({top : 0}, 250);
	$(this).find('.image-text').stop(true).animate({bottom : -txtHeight}, 250);
});


/*    Portfolio Hex    */

$(document).on('click', '.hexagon a.hover-effect', function(e){
	e.preventDefault();
	var itemClicked = $(this).attr('data-element');
	$('#carousel-hex').carousel(itemClicked-1);
	$(this).closest('.hexagon-elements-wrap').stop(true).animate({opacity : 0}, 400,function(){
		var ofsetFromTop = $(this).closest('.hexagon-elements-wrap').parent().offset().top - $('.navigation-tab').outerHeight();
		$('body, html').stop(true).animate({'scrollTop' : ofsetFromTop},400);
		$(this).stop(true).animate({height : 0},400);
		var heightToAnimateTo = $(this).parent().find('.item-details-wrapper-inner').outerHeight();
		if(heightToAnimateTo < $(window).innerHeight()) heightToAnimateTo = $(window).innerHeight();
		$(this).parent().find('.item-details-wrapper').stop(true).animate({height : heightToAnimateTo},400, function(){
			$(this).stop(true).animate({opacity : 1}, 400);
		});

	});
});
	/* Carousel Closing */
$(document).on('click', '.closing.carousel-control', function(){
	var portHexHeight = $(this).closest('.container').find('.hexagon-elements-wrap-inner').outerHeight();
	$(this).closest('.item-details-wrapper').stop(true).animate({opacity : 0}, 400,function(){
		var ofsetFromTop = $(this).closest('.container').parent().offset().top - $('.navigation-tab').outerHeight();
		$('body, html').stop(true).animate({'scrollTop' : ofsetFromTop}, 400);
		$(this).closest('.container').find('.hexagon-elements-wrap').stop(true).animate({height : portHexHeight},400);
		$(this).stop(true).animate({height : 0}, 400,function(){
			$(this).closest('.container').find('.hexagon-elements-wrap').stop(true).animate({opacity : 1}, 400);
		});
	});
});







})(jQuery);