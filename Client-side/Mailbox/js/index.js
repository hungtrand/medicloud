$(window).load(function() {
	$("#loading-main").show();

	setTimeout(function() {
		$("#loading-main").hide('800', function() {
			$(this).hide();

			var tempSmall = $("#sidebar-small-temp").html();
			var tempLarge = $("#sidebar-large-temp").html();

			if(window.innerWidth < 862) {
				$("#nav-container").append(tempSmall);
				animater(120);
			} else {
				$("#nav-container").append(tempLarge);
			}

			$(window).resize(function() {
				$("#nav-container").empty();
				if(window.innerWidth < 862) {
					$("#nav-container").append(tempSmall);
					formDelegation();
				}
				else {
					$("#nav-container").append(tempLarge);
					formDelegation();
				}
			});
			var searchTypeahead = new typeahead();

			/*Initial start up will load inbox*/
			globalPageNumber = 1;
			globalVal = "Inbox";
			$(".message-frame-name").text(globalVal);
			var iniMessages = new LoadMessages($('.message-frame-display'), globalVal, globalPageNumber);
			iniMessages.load();
			animater(272);

			/*If the client clicks on new message, this clear and update the message-div with a textbox application*/
			var newMsgForm = $("#main-new");
			newMsgForm.click(function() {
				$(".message-frame-display").empty();
				$("#message-nav-footer").remove();
				var value = $(this).attr("value");
				var textbox = $("#message-textfield").html();
				$(".message-frame-name").text(value);
				$(".message-frame-display").append(textbox);
				if(window.innerWidth < 862) {
					animater(0);
				}
		    	var userTypeahead = new typeahead();
		   		var sendMessage = new NewMessage(textbox);
			});

			formDelegation();
			
			$("#search-button").click(function() {
				var searchField = $("#search-subject");
				console.log(searchField);
			});

			$(function() {
			    $("#search-form").submit(function() {
			    	$("#loading-main").fadeIn('600', function() {
						$(this).show();
					});
					setTimeout(function() {
						$("#loading-main").hide('600', function() {
							$(this).hide();				
				    		var item = $("#search-subject").val();
				    		var trimmedString = item.substr(0, 8);
					    	$(".message-frame-name").text("Searched messages for: "+trimmedString+"...");
					    	var messages = new LoadMessages($('.message-frame-display'), item, 1);
				    		messages.load();
					    	$("#search-subject").val("");
					    	return false;
						});
					}, 500);
					animater(272);
			    });
			});

			function formDelegation() {
				/*If the client clicks on a sidebar content, then it will clear and load content to the message div accordingly*/
				var list = $("#message-form a");
				list.click(function() {
					$("#remove-trash").hide();

					var value = $(this).attr("value");
					$("#loading-main").fadeIn('600', function() {
						$(this).show();
					});
					setTimeout(function() {
						$("#loading-main").hide('600', function() {
							$(this).hide();
						if(globalVal===value) {
							globalPageNumber=1;
							globalVal=value;
						}
						$(".message-frame-name").text(value);
						var messages = new LoadMessages($('.message-frame-display'), value, 1);
						messages.load();
						});
					}, 500);
					animater(272);
				});
			};

			function animater(number) {
				$('html,body').animate({
		        	scrollTop: $("#message-div").offset().top - number
		    	}, 200);
			};
			var suggList = new SuggestionList($('#SuggListing'));
			suggList.load();
		})
	}, 500);
});