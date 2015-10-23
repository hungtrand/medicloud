(function($){
var winScr = 0, imgHeight = 0, imgOffsetTop = 0, paraWrapImgHeig = 0, freeSpaceOfImg = 0, videoOffsetTop = 0, videoHeight=0, videoPosition = 0, winHeight = 0, videoGutter = 0;
var videoRatio = 0.5622700998;
	$(document).ready(function(){
		imgHeight = $('img.paralax-bg-effect').outerHeight();
		imgOffsetTop = $('img.paralax-bg-effect').offset().top;
		paraWrapImgHeig = $('img.paralax-bg-effect').parent().outerHeight();
		winHeight = $(window).innerHeight();
		videoGutter = $('.yt-parallax-wrap-inner').find('.player').outerHeight() - $('.yt-parallax-wrap-inner').outerHeight();
		paralaxBgImg();
		paralaxBgVideo();
	});
	$(window).load(function(){
		winHeight = $(window).innerHeight();
		imgHeight = $('img.paralax-bg-effect').outerHeight();
		imgOffsetTop = $('img.paralax-bg-effect').offset().top;
		paraWrapImgHeig = $('img.paralax-bg-effect').parent().outerHeight();
		videoOffsetTop = $(document).find('.yt-parallax-wrap-inner').offset().top;
		videoHeight = $('.yt-parallax-wrap-inner').outerHeight();
		videoGutter = $('.yt-parallax-wrap-inner').find('.player').outerHeight() - $('.yt-parallax-wrap-inner').outerHeight();
		paralaxBgImg();
		paralaxBgVideo();
	});
	$(window).on('resize orientationchange',function(){
		paralaxBgImg();
	});
	$(window).scroll(function(){
		winScr = $(window).scrollTop();
		paralaxBgImg();
		paralaxBgVideo();
	});
function paralaxBgImg(){
	if(imgOffsetTop < winScr+imgHeight-$('nav .navigation-tab').height()){
		if(imgOffsetTop + imgHeight - $('nav .navigation-tab').outerHeight() > winScr){
			var imgPosition = (winScr - imgOffsetTop)/2;
		}
	}
	$('img.paralax-bg-effect').css({top : imgPosition});
}
function paralaxBgVideo(){
	if(videoOffsetTop-winHeight < winScr){ 
		if(videoOffsetTop + videoHeight - $('nav .navigation-tab').outerHeight() > winScr){
			videoPosition =((winScr - videoOffsetTop)/2.5) - 150;
		}
	}
			$('.yt-parallax-wrap-inner .player').css({top : videoPosition});
}
})(jQuery);