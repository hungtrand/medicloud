(function($){

var currentPos =  new Array();
var clearFlag = new Array();
var countdownSelect = 0;
$(document).ready(function(){
	if($('.frb_countdown').length > 0){
		$('#frb_countdown2').frbCountdownInit('#e4e4e4','#35bff0');
	}
});	
//				Main Function
$.fn.frbCountdownInit=function(canvasBgColor, canvasMainColor){
	frbCountdownServe(this);
	var cdInput = parseInt(this.attr('data-initial-time'));
	var cdControl = frbCountdownInspect(this);
	frbCountdownSplit(this, cdInput, cdControl);
	if(this.hasClass('frb_countdown_circle-style')) {
		countdownSelect++;
		frbCountdownAnimationProc(this, canvasMainColor, cdControl, countdownSelect);

	}
	frbCountdownPaste(this, canvasBgColor, canvasMainColor, cdControl);
	frbCountdownUpdate(this, canvasBgColor, canvasMainColor, cdControl);
}
//			Initial parameter formatting
function frbCountdownServe($initThis) {
	var frbTargetTime = new Date($initThis.attr('data-end-date'));
	var frbStartTime = new Date($initThis.attr('data-initial-date'));
	frbStartTime = frbStartTime.getTime() / 1000;
	frbTargetTime = frbTargetTime.getTime() / 1000;
	var frbToday = new Date().getTime() / 1000;
	$initThis.attr({'data-initial-time' : frbTargetTime - frbToday});
	if ($initThis.find('.frb_countdown_day').length > 0) {
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/86400);
	} else if ($initThis.find('.frb_countdown_hour').length > 0) {
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/3600);
	} else if ($initThis.find('.frb_countdown_min').length > 0){
		var frbTimeLimit = Math.floor((frbTargetTime-frbStartTime)/60);
	} else {
		var frbTimeLimit = Math.floor(frbTargetTime-frbStartTime);
	}
	$initThis.attr({'data-limit' : frbTimeLimit});
}
function frbCountdownSplit($initThis, cdInput, cdControl) {	
	if (cdControl == 4){
	var cdDay = Math.floor(cdInput/86400);
	} else {cdDay=0;}
	if (cdControl >= 3){
	var cdHour = Math.floor((cdInput - cdDay*86400)/3600);
	} else {cdHour=0;}
	if (cdControl >= 2){
	var cdMin = Math.floor((cdInput - cdDay*86400 - cdHour*3600)/60);
	} else {cdMin=0;}
	var cdSec = Math.floor(cdInput - cdDay*86400 - cdHour*3600 - cdMin*60);
	$initThis.attr({'data-sec' : cdSec, 'data-min' : cdMin, 'data-hour' : cdHour, 'data-day' : cdDay,});
}
//			Digit update
function frbCountdownPaste($initThis, BgColor, MainColor, cdControl) {
	frbCountdownPasteSec($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteMin($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteHour($initThis, BgColor, MainColor, cdControl);
	frbCountdownPasteDay($initThis, BgColor, MainColor, cdControl);
}
function frbCountdownPasteSec($initThis, BgColor, MainColor, cdControl, prevSec) {
	if ($initThis.attr('data-sec').length == 1) {
		$initThis.attr({'data-sec' : '0' + $initThis.attr('data-sec')});
		}	
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_sec').html($initThis.attr('data-sec'));
	}	
	if ($initThis.hasClass('frb_countdown_circle-style')) {
		if (!$initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		if ($initThis.find('.frb_countdown_sec').length > 0) {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main'), MainColor, 1/60*parseInt($initThis.attr('data-sec')));
		 } else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}
	}	
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_sec'), $initThis.attr('data-sec'), prevSec);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_sec').html($initThis.attr('data-sec'));
		}, 370);		
	}	
}
function frbCountdownPasteMin($initThis, BgColor, MainColor, cdControl, prevMin) {
	if ($initThis.attr('data-min').length == 1) {
		$initThis.attr({'data-min' : '0' + $initThis.attr('data-min')});
		}		
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_min').html($initThis.attr('data-min'));
	}	
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 2) {
		if (!$initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}		
		if ($initThis.find('.frb_countdown_hour').length > 0) {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main'), MainColor, 1/60*parseInt($initThis.attr('data-min')));
		} else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}
	}	
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_min'), $initThis.attr('data-min'), prevMin);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_min').html($initThis.attr('data-min'));
		}, 370);		
	}
}
function frbCountdownPasteHour($initThis, BgColor, MainColor, cdControl, prevHour) {
	if ($initThis.attr('data-hour').length == 1) {
		$initThis.attr({'data-hour' : '0' + $initThis.attr('data-hour')});
		}
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_hour').html($initThis.attr('data-hour'));
	}
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 3) {
		if (!$initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		if ($initThis.find('.frb_countdown_day').length > 0) {		
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main'), MainColor, 1/24*parseInt($initThis.attr('data-hour')));
		} else {
			frbCountdownCanvasProgress($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit')));
		}	
	}
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_hour'), $initThis.attr('data-hour'), prevHour);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_hour').html($initThis.attr('data-hour'));
		}, 370);
	}
}
function frbCountdownPasteDay($initThis, BgColor, MainColor, cdControl, prevDay) {
	if ($initThis.attr('data-day').length == 1) {
		$initThis.attr({'data-day' : '0' + $initThis.attr('data-day')});
		}
	if(!$initThis.hasClass('frb_countdown_flip-style')) {
		$initThis.find('.frb_countdown_day').html($initThis.attr('data-day'));
	}
	if ($initThis.hasClass('frb_countdown_circle-style') && cdControl >= 4) {
		if (!$initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg').hasClass('frb_countdown_drawn')){
			frbCountdownCanvasBg($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg'), BgColor);
			$initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_bg').addClass('frb_countdown_drawn');
		}
		frbCountdownCanvasProgress($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_main'), MainColor, 1/parseInt($initThis.attr('data-limit'))*parseInt($initThis.attr('data-day')));
	}
	if ($initThis.hasClass('frb_countdown_flip-style')) {
		frbCountdownFlipAnimation($initThis.find('.frb_countdown_day'), $initThis.attr('data-day'), prevDay);
		var timer = setTimeout(function(){
			$initThis.find('.frb_countdown_day').html($initThis.attr('data-day'));
		}, 370);		
	}
}
//			Number of digit positions selector
function frbCountdownInspect($initThis) {
	var cdControl = 1;
	if ($initThis.find('.frb_countdown_min').length > 0) {cdControl++;}
	if ($initThis.find('.frb_countdown_hour').length > 0) {cdControl++;}
	if ($initThis.find('.frb_countdown_day').length > 0) {cdControl++;}
	return cdControl;
}
//			Countdown autoadvance
function frbCountdownUpdate($initThis, canvasBgColor, canvasMainColor, cdControl) {
	var timer =  setInterval(function(){
		$initThis.each(function(){
			var prevSec = $initThis.attr('data-sec');
			var prevMin = $initThis.attr('data-min');
			var prevHour = $initThis.attr('data-hour');
			var prevDay = $initThis.attr('data-day');
		if (parseInt($initThis.attr('data-sec')) > 0){	
			$initThis.attr({'data-sec' : parseInt($initThis.attr('data-sec')) - 1});
			frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
		} else {
			if (parseInt($initThis.attr('data-min')) > 0){	
				$initThis.attr({'data-min' : parseInt($initThis.attr('data-min')) - 1});
				frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
				$initThis.attr('data-sec', 59);
				frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
			} else {
				if (parseInt($initThis.attr('data-hour')) > 0){	
					$initThis.attr({'data-hour' : parseInt($initThis.attr('data-hour')) - 1});
					frbCountdownPasteHour($initThis, canvasBgColor, canvasMainColor, cdControl, prevHour);
					$initThis.attr('data-min', 59);
					frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
					$initThis.attr('data-sec', 59);
					frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
				} else {
					if (parseInt($initThis.attr('data-day')) > 0){	
						$initThis.attr({'data-day' : parseInt($initThis.attr('data-day')) - 1});
						frbCountdownPasteDay($initThis, canvasBgColor, canvasMainColor, cdControl, prevDay);
						$initThis.attr('data-hour', 23);
						frbCountdownPasteHour($initThis, canvasBgColor, canvasMainColor, cdControl, prevHour);
						$initThis.attr('data-min', 59);
						frbCountdownPasteMin($initThis, canvasBgColor, canvasMainColor, cdControl, prevMin);
						$initThis.attr('data-sec', 59);
						frbCountdownPasteSec($initThis, canvasBgColor, canvasMainColor, cdControl, prevSec);
					} else {
									//	********* AJAX CALLBACK *********
							}
				}
			}
		}
		});
	}, 1000);
}
function frbCountdownCanvasBg($canvasThis, bgColor) {
	var c=$canvasThis;
	var ctx=c[0].getContext('2d');
	ctx.arc(100, 100, 90, 0, 2*Math.PI);
	ctx.strokeStyle = bgColor+'';
	ctx.lineWidth = 10;
	ctx.stroke();
}
function frbCountdownCanvasProgress($canvasThis, mainColor, cFactor) {
	var c=$canvasThis;
	var ctx=c[0].getContext('2d');
	ctx.clearRect(0,0,c.width(),c.height());
	ctx.beginPath();
	ctx.arc(100, 100, 90, -Math.PI/2,-Math.PI/2+2*Math.PI*cFactor);
	ctx.strokeStyle = mainColor+'';
	ctx.lineWidth = 10;
	ctx.stroke();
}
function frbCountdownAnimate($digitThis, step, MainColor, endVal, ind) {
		if (currentPos[ind] == undefined) {
			currentPos[ind] = 0;
		}
		var c=$digitThis;
		if (currentPos[ind]+step > endVal*2*Math.PI) {
			 currentPos[ind] = endVal*2*Math.PI;
			 step= 0;
			 clearFlag[ind]= 1;
			}
		var ctx=c[0].getContext('2d');
		ctx.clearRect(0,0,c.width(),c.height());
		ctx.beginPath();
		ctx.arc(100, 100, 90, -Math.PI/2,currentPos[ind]+step*2*Math.PI-Math.PI/2);
		currentPos[ind] = currentPos[ind]+step*2*Math.PI;
		ctx.strokeStyle = MainColor+'';
		ctx.lineWidth = 10;
		ctx.stroke();	
}
function frbCountdownAnimationProc($initThis, MainColor, cdControl, countdownSelect) {
		
	window.frbCountdownIntervalBreak = setInterval(function(){
		var tcdSec = parseInt($initThis.attr('data-sec'));
		var step = 2*Math.PI/600;
		var tcdMin = parseInt($initThis.attr('data-min'));
		var tcdHour = parseInt($initThis.attr('data-hour'));
		var tcdDay = parseInt($initThis.attr('data-day'));
		if (cdControl == 1) {
			frbCountdownAnimate($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdSec, 0+4*countdownSelect);
		} else {
			frbCountdownAnimate($initThis.find('.frb_countdown_sec').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/60*tcdSec, 0+4*countdownSelect);	
		}
		if(cdControl >1){ 
			if(cdControl == 2){
				frbCountdownAnimate($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdMin, 1+4*countdownSelect);
			} else {
				frbCountdownAnimate($initThis.find('.frb_countdown_min').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/60*tcdMin, 1+4*countdownSelect);
			}
		}
		if(cdControl >2){
			if (cdControl == 3){
				frbCountdownAnimate($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdHour, 2+4*countdownSelect);
			}else {
				frbCountdownAnimate($initThis.find('.frb_countdown_hour').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/24*tcdHour, 2+4*countdownSelect);
			}
		}
		if(cdControl >3){frbCountdownAnimate($initThis.find('.frb_countdown_day').parent().find('.frb_countdown_canvas_main').eq(0), step, MainColor, 1/parseInt($initThis.attr('data-limit'))*tcdDay, 3+4*countdownSelect);}
		
	}, 10);	
}
function frbCountdownFlipAnimation($initThis, countPar, countParPrev) {
	
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder').children('span:not(.frb_countdown_flip_split)').html(countPar);
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_back').children('span:not(.frb_countdown_flip_split)').html(countPar);

	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_front').children('span:not(.frb_countdown_flip_split)').html(countParPrev);
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_card').css({'transition': 'transform 740ms', 'transform': 'rotateX(-179deg)', '-moz-transform': 'rotateX(-179deg)', '-o-transform': 'rotateX(-179deg)', '-webkit-transform': 'rotateX(-179deg)', '-ms-transform': 'rotateX(-179deg)'});
	$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder');
	
	var flipTimepout = setTimeout(function(){
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_card').css({'transition': 'transform 10ms', 'transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-webkit-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_holder');
		$initThis.closest('.frb_countdown_flip_bg').find('.frb_countdown_flip_front').children('span:not(.frb_countdown_flip_split)').html(countPar);
	}, 740);	
}

	
})(jQuery);