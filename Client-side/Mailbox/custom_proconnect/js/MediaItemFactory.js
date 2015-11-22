/**
 * Factory method for making media items
*/
var MediaItemFactory = (function(){
	return {
		makeItem: function(specialID,options) {

			var itemClass = null;

			if(specialID === 'message-list') {
				// console.log(specialID);
				itemClass = MessageItem;
			} else if(specialID === 'notification-list'){
				itemClass = NotificationItem;
				// console.log(specialID);
			} else if (specialID === 'connection-list') {
				// console.log(specialID);
				itemClass = NewConnectionItem;
			}

			if(itemClass === null) {
				return false
			}

			return itemClass(options);
		}
	}
})();

function MediaItem(options) {
	function unHighlight(item){
		item.find('.media-heading').css('font-weight','normal'); //unbold text
	}
	var regex = new RegExp('/images/$'); //temporary solution to the default image url miss link problem

	// var baseItem = document.getElementById("MediaItem").content.cloneNode(true); //stamp out base item
	var baseItem = $($("#MediaItem").html()); 
	var imgURL = (regex.test(options["user-img-url"])) ? '/image/user_img.png' : options["user-img-url"];
	var userURL = options["user-url"] || '#';
	var date = options["date"] || ""; 
	
	baseItem.find(".time-ago").text(date);			//adding base item

	//START HERE
	if( options["read"] == 0 ) {			//adding new-item
		// console.log( options['read'] === "");
		baseItem.addClass("new-item");	//add new item class
	} else {
		unHighlight(baseItem);
	}

	// if( options['read'] === '') {					
	baseItem.attr('NOMONKEYID',options['id']);

	/* allow redirect to user page */
	baseItem.find("img.thumb").on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		window.location.href = userURL;				//send user to another user public POV
	}).attr("src",imgURL);

	this.updateServer = function(obj,doneCB) {
		// console.log(obj);
		$.ajax({
			url: "/master/custom_proconnect/php/notifications_controller.php",
			data: obj,
			method: 'POST',
			success: function(newNotification){
				try {
					var data = JSON.parse(newNotification);
					NotificationHandler.displayNotifications(data);
					unHighlight(baseItem);
					baseItem.removeClass('new-item');					  //remove new-item class
				} catch (e) {
					console.log(e);
					console.log(newNotification);
				}
			},
			error: function(qXHR, textStatus,errorThrown ) {
				console.log(textStatus + ": " + errorThrown);
			}
		}).done(doneCB);
	}
	this.template = baseItem;
}

function MessageItem(data){
	var options = {
		'optional-snippet': data['message-subject'],
		'date': data['message-time'],
		'id': data['messageID'],
		'user-url': data['sender-href'],
		'message': data['sender-message'],
		'user-name': data['sender-name'],
		'user-img-url': data['sender-picture'],
		'read':data['read']
	};

	var oItem = new MediaItem(options);

	var modTemplate = oItem.template;

	var snippet = options["optional-snippet"] || "";
	var message = options["message"] || "";

	//fill in the required fields
	modTemplate.find("a.landing-destination").attr("href","../message/");
	modTemplate.find(".media-heading").text(options["user-name"]);
	modTemplate.find("p.snippet-zone").text(snippet);
	modTemplate.find("p.snippet-zone").after(message);

	/* handle new message notification clearing */ //<----redirect to message page
	modTemplate.on("click",function(e){
		var obj = {
			data: {
				'itemName':'MessageItemID',
				'id':$(this).attr('NOMONKEYID')}
		};
		oItem.updateServer(obj,function(d){
			console.log('d');
		});
		window.location.href = "/message/"; //manually redirect user
	});

	

	return modTemplate;
}

function NotificationItem(data) {
	var heading = "";

	var options = {
		'optional-snippet': '',
		'date': data['timestamp'],
		'id': data['NotificationViewID'],
		'user-url': data['href'],
		'message': '',
		'user-name': data['message'],
		'user-img-url': data['picture'],
		'read': data['read']
	};

	var oItem = new MediaItem(options);

	var baseItem = oItem.template;

	var snippet = options["optional-snippet"] || "";
	var message = options["message"] || "";


	//fill in the required fields
	baseItem.find("a.landing-destination").attr("href","#");

	baseItem.find(".media-heading").text(options["user-name"]);
	baseItem.find("p.snippet-zone").text(snippet);
	baseItem.find("p.snippet-zone").after(message);
	
	baseItem.on("click",function(e){
		e.preventDefault();
		e.stopPropagation();

		var obj = {
				data: {
					'itemName':'NotificationItemID',
					'id':$(this).attr('NOMONKEYID')
				}
		}
		oItem.updateServer(obj);
	});
	return baseItem;
}

function NewConnectionItem(data) {
	/* data example json format:
	CompanyName: "Google Inc."
	Email: "hungtrand0929@gmail.com"
	JobTitle: "Web Application Developer"
	Location: "Mountain View"
	Name: "Hung Tran"
	ProfileImage: "/users/10/images/HourGlass.jpg"
	UserID: "10"*/
	var heading = data['Name'] + ' invited you to connect.';
	var message = data['Name'] + '<br />' + data['JobTitle'];
	if (data['CompanyName']) message += ' at ' + data['CompanyName'];
	if (data['Location']) message += '<br />' + data['Location'];
	message += '<div class="text-right">';
	message += '<a class="btn btn-success ConnectionAction" href="/connections/php/NewConnection_controller.php?accept=true&UserID=' + data['UserID'] + '">Accept</a>';
	message += '&nbsp;&nbsp;<a class="btn btn-warning ConnectionAction" href="/connections/php/declineConnection_controller.php?UserID=' + data['UserID'] + '">Decline</a>';
	message += '</div>';

	var options = {
		'optional-snippet': '',
		'date': '',
		'id': data['UserID'],
		'user-url': '/profile-public-POV/?UserID=' + data['UserID'],
		'message': message,
		'user-name': heading,
		'user-img-url': data['ProfileImage']
	};

	var temp = new MediaItem(options);
	var baseItem = temp.template;

	var snippet = options["optional-snippet"] || "";
	var message = options["message"] || "";

	//fill in the required fields
	baseItem.find("a.landing-destination").attr("href","../connections");

	baseItem.find(".media-heading").text(options["user-name"]);
	baseItem.find("p.snippet-zone").text(snippet);
	baseItem.find("p.snippet-zone").after(message);
	baseItem.find('.ConnectionAction').on('click', function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		var theLink = $(this);
		$.ajax({
			url: href,
			type: 'POST'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				var li = theLink.closest('li');
				theLink.parent().toggleClass('alert alert-success text-center', true).html('Saved');
				setTimeout(function() {
					li.fadeOut('700', function() {$(this).remove();});
				}, 3000);
				NotificationGetter.getResponse(NotificationHandler.displayNotifications);
			} catch (e) {
				console.log(json);
			}
			
		});
	});

	return baseItem;
}