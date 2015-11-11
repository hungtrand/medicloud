function Inbox(data) {
	this.container;
	this.btnSend;
	this.btnRemove;
	this.ConnTemplate;
	this.data;
	this.init(data);
}

Inbox.prototype = {
	constructor: this,

	init: function(data) {
		var that = this;
		that.data = data;
		that.ConnTemplate = $('#sender-message-content').html();

		var conn = $(that.ConnTemplate);

		this.data = data;
		conn.find('.sender-name').text(data['sender-name']);
		conn.find('.sender-name').attr("href", data['sender-href']);
		conn.find('.message-subject').text(data['message-subject']);
		conn.find('.message-time').text(data['message-time']);
		conn.find('.sender-message').text(data['sender-message']);

		that.container = conn;

		$('article').readmore({
			speed: 600
		});

		that.btnSend = that.container.find('.message-friend');
		that.btnSend.on('click', function(ev) {
			ev.preventDefault();
			console.log("load-msg-form");
		});
		that.btnRemove = that.container.find('.remove-mail');
		that.btnRemove.on('click', function(ev) {
			ev.preventDefault();
			// that.remove( function(returnedData) {
			// 	that.confirmRemove(returnedData);
			// });
			that.confirmRemove();
		});
	},

	remove: function(returnedData) {
		var that = this;
		var data = {'MsgID': this.data['MsgID']}

		$.ajax({
			url: 'php/dummy.php',
			data: data,
			type: 'POST'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				returnedData(json);
			} catch (ev) {
				that.failRemove(json);
			}
		}).fail(function(ev) {
			that.failRemove();
		});
	},

	confirmRemove: function(json) {
		var that = this;

		setTimeout(function() {
			that.container.fadeOut('800', function() {
				$(this).remove();
			})
		}, 200);
	},

	getView: function() {
		return this.container;
	}
}