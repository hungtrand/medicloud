(function($){
/*  Prevent Default - Default for all links  */
$(document).on('click', 'a', function(e){
	if($(this).attr('href').length < 2)
	e.preventDefault();
});	

$(document).on('click' ,'.select-icon i.cp-trigger', function(){
	if(parseInt($('.colorpicker-wrapper').css('left')) != 0){
		$(this).parent().parent().stop(true).animate({left : 0},250);
		$(this).addClass('cp-open');
	}
	else{
		$(this).parent().parent().stop(true).animate({left : '-200px'},250);
		$(this).removeClass('cp-open');
	}
});

$(document).on('click' ,'.cp-select-list li a', function(){
	var $cpColor = $(this).attr('class');
	$('.colorpicker-wrapper').parent().attr('class', $cpColor);
});

$(document).on('mouseenter' ,'.flickr_links li a', function(){
	$(this).find('img').stop(true).animate({opacity : 0.8},400);
});


$(document).on('mouseleave' ,'.flickr_links li a', function(){
	$(this).find('img').stop(true).animate({opacity : 1},150);
});	

$(document).on('click' ,'.comment_form_opening_hook', function(){
	$('#comment_form_wrapper1').stop(true,true).delay(400).slideDown(300);
});
	
$(document).on('click','.comment_form_wrapper .close_button', function(e){
	e.preventDefault();
	$(this).closest('.comment_form_wrapper').stop(true).slideUp(300);
});
	
/*  comment-form - opening on reply  */
$(document).on('click' ,'a.open-form-trigger', function(e){
	e.preventDefault();
	var $clonedForm = $('#contact-form').clone();
	var $formHeight = $('#contact-form form').height() + 72;
	
	if(!$(this).closest('.comment-wrap').hasClass('form-opened')){
		$('.form-opened').find('a.close_button').trigger('click');
		$(this).closest('.single_comment').parent().append($clonedForm).find('#contact-form').stop(true).animate({height : $formHeight}, 300, function(){
			$(this).closest('.comment-wrap').addClass('form-opened');
		});
	}
});

//			Comment Form Opening Script - top
	

$(document).on('click', 'a.close_button', function(){
	$(this).closest('#contact-form').stop(true).animate({height : 0}, 300, function(){
		$(this).remove();
	});
	$('.form-opened').removeClass('form-opened');
});

//		anchor-to-target scrolling

$(document).on('click', 'a.scroll_to_target[href^="#"]',function (e) {
	    e.preventDefault();
	    var target = this.hash,
	    $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - 140
	    }, 900, 'swing', function () {
	  });
});

$(document).on('mouseenter' ,'.social_bar ul li a', function(){
	$(this).find('img.static').stop(true).animate({top : -34}, 100);
	$(this).find('img.dynamic').stop(true).animate({top : 0}, 100);
});
$(document).on('mouseleave' ,'.social_bar ul li a', function(){
	$(this).find('img.static').stop(true).animate({top : 0}, 100);
	$(this).find('img.dynamic').stop(true).animate({top : 34}, 100);
});
	/* FORM */
$(document).ready(function(){
		
	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	if(supportsTouch != true){
		$('[data-toggle="tooltip"]').tooltip({
			'placement': 'top'
		});
		$('[data-toggle="popover"]').popover({
			trigger: 'hover',
			'placement': 'top'
		});
	}

	if($("a[rel^='prettyPhoto']").length > 0) $("a[rel^='prettyPhoto']").prettyPhoto();


	$(this).find('form').each(function(){
		$(this).find('input,textarea').focus(function(){
			if($(this).attr('data-value')==$(this).val()){
				$(this).val('');
			}	
		});
		$(this).find('input,textarea').focusout(function(){
			if($(this).val() == ''){
				$(this).val($(this).attr('data-value'));
			}	
		});
		$(this).find('button.btn').click(function(e){
			e.preventDefault();
			var $parent=$(this);
			while($parent.get(0).tagName != 'FORM'){
				$parent=$parent.parent();
			}
			var full=true;
			$parent.find('.required').each(function(){
				if($(this).val()=='' || $(this).val()==$(this).attr('data-value')){
					$(this).addClass('empty');
					full=false;
				}
				else{
					$(this).removeClass('empty');
				}
			});
			if(full){
				$parent.submit();
			}
		});
	});
	/*  Fotorama Custom Thumbs  */
	var $elementWidth = $(this).find('.nav-thumb-wrap').outerWidth();
	var $wrapperWidth = $(this).find('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 3});
	var $thumbsHeight = $(this).find('.nav-thumb-wrap').css('height');
	$(this).find('.fotorama-nav-wrap-custom').css({'height' : $thumbsHeight});
	$(this).find('.nav-thumb-wrap').each(function(index){
		$(this).click(function(e){
			if($(this).hasClass('top-element')) {e.preventDefault();}
			$('.fotorama__thumbs-shaft > i').eq(index).trigger('click');
			$(this).closest('.fotorama-nav-wrap-custom').find('.active-thumb').removeClass('active-thumb');
			$(this).addClass('active-thumb');
			var $elementWidth = $('.nav-thumb-wrap').width();
			var $wrapperWidth = $('.fotorama-nav-wrap-custom').width();
			var $elementPosition = $(this).index();
			var $totalElements = $('.nav-thumb-wrap').length;
			var $windWidth = $(window).width();
			if($windWidth > 1180){
				if($elementPosition > 0){
					if($totalElements -1 != $elementPosition ){
						$(this).parent().stop(true).animate({left : - (($elementPosition - 1) * $elementWidth)}, 400);
					}
				}
			}
			if($windWidth < 1180){
				$('.fotorama-nav-wrap-custom').show();
				$('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 2});
				$('.fotorama-nav-wrap-custom').css({'margin-left' : -$elementWidth});
				var $elementPosition = $(this).index();
					if($totalElements - 1 != $elementPosition ){
						$(this).parent().stop(true).animate({left : - ($elementPosition * $elementWidth)}, 400);
					}
			}
			if($windWidth < 800){
				$('.fotorama-nav-wrap-custom').hide();
			}
		});			
	});
	$(window).load(function(){
		$('.fotorama__wrap .fotorama__frame').each(function(){
			$(this).append('<div class="pattern-overlay"></div>');
		});
	});
	$(window).resize(function(){
		fotoramaNavReset();
	})
	
	function fotoramaNavReset() {
		var $windWidth = $(window).width();
		var $elementWidth = $(this).find('.nav-thumb-wrap:first').width();
		var $this = $(this).find('.nav-thumb-wrap.active-thumb');
		var $elementPosition = $(this).find('.nav-thumb-wrap.active-thumb').index();
		var $totalElements = $(this).find('.nav-thumb-wrap').length;
		if($windWidth > 1180){
			$(this).find('.fotorama-nav-wrap-custom').show();
			$(this).find('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 3});
			$(this).find('.fotorama-nav-wrap-custom').css({'margin-left' : -1.5*$elementWidth});
			if($elementPosition > 0){
				if($totalElements -1 != $elementPosition ){
					$this.parent().stop(true).css({left : - (($elementPosition - 1) * $elementWidth)});
				}
				else {
					$this.parent().stop(true).css({left : - (($elementPosition - 2) * $elementWidth)});
				}
			}
		}
		if($windWidth < 1180){
			$(this).find('.fotorama-nav-wrap-custom').show();
			$(this).find('.fotorama-nav-wrap-custom').css({'width' : $elementWidth * 2});
			$(this).find('.fotorama-nav-wrap-custom').css({'margin-left' : -$elementWidth});
			if($elementPosition > 0){
				if($totalElements - 1 != $elementPosition ){
					$this.parent().stop(true).css({left : - ($elementPosition * $elementWidth)}, 400);
				}
				else {
					$this.parent().stop(true).css({left : - (($elementPosition-1) * $elementWidth)}, 400);
				}
			}
		}
		if($windWidth < 800){
			$(this).find('.fotorama-nav-wrap-custom').hide();
		}
	}
	
	/*  FLICKR WIDGET  */

	$(this).find('.flickr-feed').jflickrfeed({
		limit: 8,
		qstrings: {
			id: '66556959@N03'
		},
		itemTemplate: '<li><a href="{{image_b}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	}, function(data){
		$(this).find('.flickr_links li').each(function(index){
			if((index+1)%4 == 0) {
				$(this).addClass('last_flickr_image');
			}
		});
	});
	$(this).find('.twitter-post').each(function(){
		var $this = $(this);
		$.get('twitter.php',function(ret){
			$this.html(ret);
		});
	});
});


/*  Portfolio Hex Elements  */
var itemsInRowGlobal = 0;
$(document).ready(function(){
	var wrapWidth = $(document).find('.hexagon-elements-wrap').parent().width();
	var hexagonWidth = $(this).find('.single-hexagon-element:first').width()+4;
	var itemCount = $(this).find('.single-hexagon-element').length;
	var itemsInRow = parseInt(wrapWidth / hexagonWidth);
	if(itemsInRow < 1){
		itemsInRow = 1;
	}
	itemsInRowGlobal = itemsInRow;
	portHexagonSet(itemsInRow, itemCount, wrapWidth);
});
$(window).resize(function(){
	var wrapWidth = $(document).find('.hexagon-elements-wrap').width();
	var hexagonWidth = $(document).find('.single-hexagon-element:first').width()+4;
	var itemCount = $(document).find('.single-hexagon-element').length;
	var itemsInRow = parseInt(wrapWidth / hexagonWidth);
	if(itemsInRow != itemsInRowGlobal) {
		$(document).find('.hexagon-elements-wrap').find('br').each(function(){
			$(this).remove();
		});
		if(itemsInRow < 1){
			itemsInRow = 1;
		}
		itemsInRowGlobal = itemsInRow;
		portHexagonSet(itemsInRow, itemCount, wrapWidth);
	}
});
function portHexagonSet(itemsInRow, itemCount, wrapWidth){
	$(document).find('.hexagon-elements-wrap').find('br').each(function(){
		$(this).remove();
	});
	var parS = false;
	var itemCounter = 0;
	var curentItemEven = (itemsInRow-1)+itemCounter;
	var curentItemOdd = (itemsInRow-2)+itemCounter;
	var defaultCssValue = $(document).find('.hexagon').css('height'); 
	if(wrapWidth < 500){
		$(document).find('.hexagon-elements-wrap .single-hexagon-element').each(function(){
			$(this).addClass('single-hex');
			$(this).addClass('fullwidth');
			$(this).find('.hexagon').addClass('fullwidth');
			var hexHeight = $('.hexagon.fullwidth').width() * 2;
			var hexMargin = -136*$(this).width() /244;
			$(this).find('.hexagon.fullwidth').css({height : hexHeight, marginTop: hexMargin, marginBottom: hexMargin});
			var $singleBlockHeight = ($(this).width())*35/244;
			$(this).css({paddingTop : $singleBlockHeight, paddingBottom: $singleBlockHeight});
		});
	}
	else{
		$(document).find('.hexagon-elements-wrap .single-hexagon-element').each(function(){
			$(this).find('.hexagon.fullwidth').css({height : hexHeight, marginTop: -136, marginBottom: -136});
			$(this).removeClass('single-hex');
			$(this).removeClass('fullwidth');
			$(this).find('.hexagon').removeClass('fullwidth');
			var hexHeight = $('.hexagon').width() * 2;
			$(this).find('.hexagon').css({height : hexHeight});
			$(this).css({margin : 0, padding: 0});
		});
	}
	while(itemCounter < itemCount) {
		if(parS == false){
			$('<br />').insertAfter($('.hexagon-elements-wrap').find('.single-hexagon-element').eq(curentItemEven));
			if(itemsInRow != 1) parS = true;
			itemCounter = curentItemEven
		}
		else {
			$('<br />').insertAfter($('.hexagon-elements-wrap').find('.single-hexagon-element').eq(curentItemOdd));
			parS = false;
			itemCounter = curentItemOdd
		}
		curentItemEven = itemsInRow + itemCounter;
		curentItemOdd = (itemsInRow-1) + itemCounter;
	}
	var hexWidth = $('.single-hexagon-element').outerWidth()+6;
	$('.hexagon-elements-wrap').find('br:last + .single-hexagon-element').css({marginLeft : -hexWidth});
}
/*  Testimonials Responsive Reordering  */
	$(document).ready(function(){
		testimonialsResponsive();
	});
	$(window).on('resize orientationchange', function(){
		testimonialsResponsive();
	});
	function testimonialsResponsive(){
		$('#testimonials').find('.testimonial-bottom-spacing:nth-child(odd)').each(function(){
			var $this = $(this)
			if($(window).innerWidth() <= 768){
				if(!$this.hasClass('resorted')){
					$(this).find('.description').insertAfter($this.find('a.image-round-wrap'));
					$(this).find('.position-name-wrap').insertBefore($this.find('a.image-round-wrap'));
					$this.addClass('resorted');
				}
			}
			else if($this.hasClass('resorted')){
				$(this).find('.description').insertBefore($this.find('a.image-round-wrap'));
				$(this).find('.position-name-wrap').insertAfter($this.find('a.image-round-wrap'));
				$this.removeClass('resorted');
			}
		});
	}
	$(document).ready(function(){
		if('ontouchstart' in window) $('.google-map-wrapper .touch-screen-overlay').css({'display' : 'block'});
		else $('.google-map-wrapper .touch-screen-overlay').css({'display' : 'none'});
	});

})(jQuery);