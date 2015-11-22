$(document).ready(function() {
	var btnFlag = 'false';
	var triggerElementID = null; // this variable is used to identity the triggering element
	var fingerCount = 0;
	var startX = 0;
	var startY = 0;
	var curX = 0;
	var curY = 0;
	var deltaX = 0;
	var deltaY = 0;
	var horzDiff = 0;
	var vertDiff = 0;
	var minLength = 72; // the shortest distance the user may swipe
	var swipeLength = 0;
	var swipeAngle = null;
	var swipeDirection = null;

	$('#swipeBox').on('touchstart mousedown', function(ev) {
		ev.preventDefault();
		console.log(ev.originalEvent.changedTouches[0].pageX);
	});
	$('#swipeBox').on('touchmove', function(ev) {
		ev.preventDefault();
		
		$('#swipeBox').on('touchend', function(ev) {
			ev.preventDefault();
			console.log(ev.originalEvent.changedTouches[0].pageX);
		});
	});
})