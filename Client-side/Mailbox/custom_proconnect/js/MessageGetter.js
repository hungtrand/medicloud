var MessageGetter = (function() {
	return {
		get: function(categoryID, beforeSendCB ,displayCallback) {
			var data = {"categoryID":categoryID};
			var	contentURL;
			if (categoryID == 'notification-list') {
				contentURL = "/notification/php/notificationInbox_controller.php";
			} else if (categoryID == 'message-list') {
				contentURL = "/message/php/inbox_controller.php";
			} else if (categoryID == 'connection-list') {
				contentURL = "/connections/php/Connections_controller.php";
				data['filter'] = 'pending';
			}

			// console.log(categoryID);
			$.ajax({
				url: contentURL,			//<------ must be hard link
				data: data,			//<------ may not be necessary
				method: "POST",
				beforeSend: function(jqXHR,obj){
					beforeSendCB(jqXHR,obj);
				},
				error: function(qXHR, textStatus,errorThrown ) {
					console.log(textStatus + ": " + errorThrown);
				}
			}).done(function(data){
					try {
						var messages = JSON.parse(data);
						// console.log(messages);
						if(displayCallback !== undefined){
							displayCallback(messages);
						}
					} catch (e) {
						console.log(e);
						console.log(data);
						displayCallback(data);
					}
			});
		}
	}
})();