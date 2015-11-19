$(document).ready(function(){


	// Mobile 
 	// $(".mobile-notification-list").on('click','a.toggle',function(e){
 	// 	// e.preventDefault();
 	// 	console.log('hellow');
 	// });

	$(document).on('click', function() {
		if ($(".navbar-collapse#main-nav").hasClass('in'))
			$(".navbar-collapse#main-nav").collapse('hide');
	});

	//get notification every 10 seconds
	NotificationGetter.getUsingInterval(15000,NotificationHandler.displayNotifications);
	
	
	
	/* Link notification hover handler */
	$(".notification-icon").on('click', function(e){

		// var notificationNum = parseInt($(this).find("span.notification-number").text());

		// if (notificationNum > 0) {
			//query
			NotificationHandler.fillMessages(this,MessageGetter,MediaItemFactory);
		// } else {
		// 	// console.log(notificationNum);
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// }
	});

 	/* show menu on scroll down*/
 // 	$(window).scroll(showMenuOnScroll());
	
	// function showMenuOnScroll(e){
 // 		//Keep track of last scroll
	// 	var lastScroll = 0;
 // 		return function() {
 //          //Sets the current scroll position
 //          var st = $(this).scrollTop();
 //          //Determines up-or-down scrolling
 //          if (st > lastScroll){  			//DOWN
	// 			$("#nv-menu").slideUp(100);             
 //          } else { 							//UP
 //             	$("#nv-menu").slideDown(100);   
 //          }
 //          lastScroll = st;					//Updates scroll position
 //      	}
	// }

	AdvanceSearchInterfaceHandler.init();

	// Load connections suggestions
	var suggList = new SuggestionList($('#SuggListing'));
	suggList.load('compact');
	/*var hammertime = new Hammer(document.getElementById('swipeBox'), {'threshold': 5, 'velocity': 0.85, 'preventDefault': true});

		hammertime.on('swiperight', function(ev){
			$('#swipeBox').addClass('stop-scrolling');
			if($('#swipeBox').attr('value') === 'false') {
				$('[href="#sidebar-menu"]').trigger('touchstart');
			}
			setTimeout( function(ev) {
				$('#swipeBox').attr('value', 'true');
			}, 100);
		});
		hammertime.on('swipeleft', function(ev){
			if($('#swipeBox').attr('value') === 'true') {
				$('[href="#sidebar-menu"]').trigger('touchstart');
			}
			setTimeout( function(ev) {
				$('#swipeBox').attr('value', 'false');
			}, 100);
		});*/
	var mc = new Hammer.Manager(document.getElementById('swipeBox'), {'preventDefault': true});
	// mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
	mc.add( new Hammer.Swipe({ event: 'open', pointers: 1, threshold: 20, direction: Hammer.DIRECTION_RIGHT, velocity: 0.02 }));
	mc.add( new Hammer.Swipe({ event: 'close', pointers: 1, threshold: 20, direction: Hammer.DIRECTION_LEFT, velocity: 0.02 }));
	mc.add( new Hammer.Swipe({ event: 'refresh', pointers: 2, threshold: 20, direction: Hammer.DIRECTION_DOWN , velocity: 0.02 }));
	mc.add( new Hammer.Tap({ event: 'tapclose', pointers: 1}));

	mc.on("open", function(ev) {
		if($('#swipeBox').attr('value') === 'false') {
			$('[href="#sidebar-menu"]').trigger('touchstart');
			setTimeout(function(ev) {
				$('#swipeBox').attr('value', 'true');
			}, 600);
		}
	});
	mc.on("close tapclose", function(ev) {
		if($('#swipeBox').attr('value') === 'true') {
			$('[href="#sidebar-menu"]').trigger('touchstart');
			setTimeout(function(ev) {
				$('#swipeBox').attr('value', 'false');
			}, 600);
		}
	});
	mc.on("refresh", function(ev) {
		location.reload();
	});
});