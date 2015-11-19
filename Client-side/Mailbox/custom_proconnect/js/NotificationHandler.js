var NotificationHandler = (function() {
	return {
		displayNotifications: function(data){
			// console.log(data);
			//display data
			$.each(data,function(i,v){
				if(v >= 0) {
					if(i === "messages") {
						var num1 = (data["messages"] == 0) ? '' : data['messages'];
						$(".pc-nav-message-list").find("span.notification-number").text(num1);
					} else if (i === "notification") {
						var num2 = (data["notification"] == 0) ? '' : data['notification'];
						$(".pc-nav-notification-list").find("span.notification-number").text(num2);
					} else if (i === "new-connection") {
						var num3 = (data["new-connection"] == 0) ? '' : data['new-connection'];
						$(".pc-nav-connection-list").find("span.notification-number").text(num3);
					}
				}
			});
		}, 
		fillMessages: function(parent,MessageGetter,MediaItemFactory) { //get notification messages and display them
			var specialID = $(parent).prop("id");
			
			MessageGetter.get(specialID,

				function(jqXHR,obj){
					$(parent).find(".custom-media-item").remove(); //clear existing items 
					$(parent).find("div.iam-loading").show();      //show loading div
				},function(data){
					//display data
					if (typeof data == 'string') {
						$(parent).find(".custom-media-item").remove(); //clear existing items 
						$(parent).children("ul.dropdown-menu").append('<li class="media custom-media-item">No new messages.</li>');
						$(parent).children("ul.mobile-noti-list").append('<li class="media custom-media-item">No new messages.</li>'); // mobile view
						//START HERE display no result in mobil
					} else {
						$.each(data,function(key,value){
							// make items
							var newItem = MediaItemFactory.makeItem(specialID,value);

							//fill the items
							if(value['read'] == 1) {
								$(parent).find("ul.dropdown-menu").children().last().after(newItem);
							} else {
								if ($(parent).find("li.new-item")[0] === undefined) { //handle reverse order
									$(parent).find("div.iam-loading").after(newItem);
								} else {
									$(parent).find("li.new-item").last().after(newItem);
								}
							}
						});
					}

					$(parent).find("div.iam-loading").hide();
			});
		}

	}
})();