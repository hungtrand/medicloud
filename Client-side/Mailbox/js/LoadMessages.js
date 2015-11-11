function LoadMessages(container, form, page) {
	
	URLs={Inbox: 'php/inbox_controller.php', Outbox: 'php/outbox_controller.php', Archive: 'php/archive_controller.php', Trash: 'php/trash_controller.php'};
	this.data = [];
	this.form = form;
	this.btnRemoveAll;
	this.container = container;
	this.page = page;
	this.Alert;
	this.waitingGif = $('<div class="text-center hidden waitingGif"><img src="/image/FlatPreloaders/32x32/Preloader_1/Preloader_1.gif" alt="Loading..."/></div>');
	this.init(form);
}

LoadMessages.prototype = {

	constructor: LoadMessages,

	init: function(form) {
		this.Alert = $('#MessageListEndAlert');
	},

	fetch: function(callback) {
		var that = this;
		var pageForm = {};
		pageForm['page'] = that.page;
		// console.log(pageForm);

		$.ajax({
			url: URLs[that.form],
			type: 'POST',
			data: pageForm,
			contentType: 'text/plain'
		}).done(function(json) {
			try {
				that.Alert.toggleClass('hidden', true);
				json = $.parseJSON(json.trim());
				that.data = json;
				callback(json);
			} catch(ev) {
				$(".message-frame-display").empty();
				that.Alert.html(json);
				// console.log(ev);
				that.Alert.toggleClass('hidden', false);
			}
		}).fail(function() {
			//should do something
		});
	},

	load: function() {
		var that = this;
		that.fetch(function(jsonData) {
			that.appendView(jsonData);
		});
	},

	next: function() {
		var that = this;
		that.page++;
		that.fetch(function(jsonData) {
			that.appendView(jsonData);
		});
	},

	prev: function() {
		var that = this;
		that.page--;
		that.fetch(function(jsonData) {
			that.appendView(jsonData);
		});
	},

	jump: function(position) {
		var that = this;
		that.page = position;
		that.fetch(function(jsonData) {
			that.appendView(jsonData);
		});
	},

	removeAll: function(callback) {
		var that = this;
		var messageIDs = '';
		for (var index in that.data) {
			messageIDs += ', ' + that.data[index]['messageID'];
		}

		messageIDs = messageIDs.replace(', ', '');
		var data = {
			'action': 'burn',
			'messageID': messageIDs
		};

		$.ajax({
			url: 'php/MailActions_controller.php',
			data: data,
			type: 'POST',
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				callback(json)
			} catch (ev) {
				that.Alert.html(json).toggleClass('hidden', false);
				setTimeout(function() {
					that.Alert.html('').toggleClass('hidden', true);
				},3000);
			}
		}).fail(function(ev) {
			that.failRemove();
		});
	},

	confirmRemoveAll: function(json) {
		var that = this;

		setTimeout( function() {
			that.container.fadeOut('800', function() {
				$("#message-nav-footer").remove();
				$(".message-frame-display").empty();
				that.Alert.html("Trash has been emptied");
				that.Alert.toggleClass('hidden', false);
			})
		}, 200);
	},

	appendView: function(data) {

		var that = this;
		that.container.show();
		that.btnRemoveAll = $('#empty-trash');
		that.btnRemoveAll.off('click').on('click', function(ev) {
			ev.preventDefault();
			that.removeAll( function(json) {
				that.confirmRemoveAll(json);
			});
		});
		$('html,body').animate({
        	scrollTop: $("#message-div").offset().top - 200
		}, 600);
		$(".message-frame-display").empty();
		$("#message-nav-footer").remove();
		var messageIndex = "message";
		var key
		var counter = 0;
		for(key in data)
		{
			if(data.hasOwnProperty(key))
			{
				counter++;
			}
		};

		for(key in data)
		{
			var box = new Messages(data[key], that.form);
			this.container.append(box.getView());
		}

		if(totalMessages > 8) {
			var divider = Math.ceil(totalMessages/8);
			var footer = $("#message-nav-temp").html();
			var loadPageNumber;
			$("#message-div").append(footer);
			$("#page-jumper").attr("placeholder", this.page+" out of "+divider);
			if(this.page === 1) {
				$("#prev-page").remove();
			}
			if(this.page === divider) {
				$("#next-page").remove();
			}

			$("#next-page").on('click', function(ev) {
				ev.preventDefault();
				that.next();
			});
			
			$("#prev-page").on('click', function(ev) {
				ev.preventDefault();
				that.prev();
			});

			$("#page-jumper-form").on('submit', function(ev) {
				ev.preventDefault();
				that.jump($("#page-jumper").val());
			});
		}
	}
}